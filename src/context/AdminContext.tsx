import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { defaultConfig, type SiteConfig } from '../data/defaultConfig';
import { supabase } from '../lib/supabase';

const STORAGE_KEY = 'ifix_site_config';
const STORAGE_VERSION_KEY = 'ifix_site_config_version';
const CURRENT_VERSION = '2';

const SUPABASE_TABLE = 'site_config';
const SUPABASE_CONFIG_ID = 'main';

function mergeWithDefault(stored: unknown): SiteConfig {
  if (!stored || typeof stored !== 'object') return defaultConfig;
  const s = stored as Record<string, unknown>;

  const merged: SiteConfig = {
    ...defaultConfig,
    ...s,
    siteName: (s.siteName as string) || defaultConfig.siteName,
    phone: (s.phone as string) || defaultConfig.phone,
    email: (s.email as string) || defaultConfig.email,
    address: (s.address as string) || defaultConfig.address,
    metro: (s.metro as string) || defaultConfig.metro,
    heroTitle: (s.heroTitle as string) || defaultConfig.heroTitle,
    heroSubtitle: (s.heroSubtitle as string) || defaultConfig.heroSubtitle,
    heroDescription: (s.heroDescription as string) || defaultConfig.heroDescription,
    guaranteeText: (s.guaranteeText as string) || defaultConfig.guaranteeText,
    clientsCount: (s.clientsCount as string) || defaultConfig.clientsCount,
    galleryImages: Array.isArray(s.galleryImages) ? s.galleryImages : defaultConfig.galleryImages,
    reviews: Array.isArray(s.reviews) ? s.reviews : defaultConfig.reviews,
    servicePages: Array.isArray(s.servicePages)
      ? s.servicePages.map((sp: unknown, i: number) => {
          const defaultPage = defaultConfig.servicePages[i] || defaultConfig.servicePages[0];
          const p = sp as Record<string, unknown>;
          return {
            ...defaultPage,
            ...p,
            repairs: Array.isArray(p.repairs)
              ? p.repairs.map((r: unknown, ri: number) => {
                  const defaultRepair = defaultPage?.repairs[ri] || {
                    name: '',
                    description: '',
                    priceFrom: '',
                    image: '',
                  };
                  return { ...defaultRepair, ...(r as object) };
                })
              : defaultPage?.repairs || [],
            processSteps: Array.isArray(p.processSteps) ? p.processSteps : defaultPage?.processSteps || [],
            processImages: Array.isArray(p.processImages) ? p.processImages : defaultPage?.processImages || [],
          };
        })
      : defaultConfig.servicePages,
    priceCategories: Array.isArray(s.priceCategories) ? s.priceCategories : defaultConfig.priceCategories,
    messengers: Array.isArray(s.messengers) ? s.messengers : defaultConfig.messengers,
    socialLinks: Array.isArray(s.socialLinks) ? s.socialLinks : defaultConfig.socialLinks,
    workSchedule: Array.isArray(s.workSchedule) ? s.workSchedule : defaultConfig.workSchedule,
    screenReplacement:
      s.screenReplacement && typeof s.screenReplacement === 'object'
        ? { ...defaultConfig.screenReplacement, ...(s.screenReplacement as object) }
        : defaultConfig.screenReplacement,
    whyUsFeatures: Array.isArray(s.whyUsFeatures) ? s.whyUsFeatures : defaultConfig.whyUsFeatures,
    processSteps: Array.isArray(s.processSteps) ? s.processSteps : defaultConfig.processSteps,
    otherServices: Array.isArray(s.otherServices) ? s.otherServices : defaultConfig.otherServices,
  };

  return merged;
}

async function saveConfigToSupabase(config: SiteConfig) {
  const { error } = await supabase.from(SUPABASE_TABLE).upsert({
    id: SUPABASE_CONFIG_ID,
    data: config,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error('Ошибка сохранения конфига в Supabase:', error);
    throw error;
  }
}

interface AdminContextType {
  config: SiteConfig;
  updateConfig: (updates: Partial<SiteConfig>) => void;
  updateServicePage: (id: string, updates: Partial<SiteConfig['servicePages'][0]>) => void;
  updatePriceCategory: (id: string, updates: Partial<SiteConfig['priceCategories'][0]>) => void;
  updateReview: (index: number, review: SiteConfig['reviews'][0]) => void;
  addReview: (review: SiteConfig['reviews'][0]) => void;
  removeReview: (index: number) => void;
  updateGalleryImage: (index: number, image: SiteConfig['galleryImages'][0]) => void;
  addGalleryImage: (image: SiteConfig['galleryImages'][0]) => void;
  removeGalleryImage: (index: number) => void;
  updateWhyUsFeature: (index: number, feature: SiteConfig['whyUsFeatures'][0]) => void;
  addWhyUsFeature: (feature: SiteConfig['whyUsFeatures'][0]) => void;
  removeWhyUsFeature: (index: number) => void;
  updateProcessStep: (index: number, step: SiteConfig['processSteps'][0]) => void;
  addProcessStep: (step: SiteConfig['processSteps'][0]) => void;
  removeProcessStep: (index: number) => void;
  updateOtherService: (index: number, service: SiteConfig['otherServices'][0]) => void;
  addOtherService: (service: SiteConfig['otherServices'][0]) => void;
  removeOtherService: (index: number) => void;
  updateScreenReplacement: (updates: Partial<SiteConfig['screenReplacement']>) => void;
  updateWorkSchedule: (index: number, day: SiteConfig['workSchedule'][0]) => void;
  updateServiceRepair: (serviceId: string, repairIndex: number, repair: SiteConfig['servicePages'][0]['repairs'][0]) => void;
  addServiceRepair: (serviceId: string, repair: SiteConfig['servicePages'][0]['repairs'][0]) => void;
  removeServiceRepair: (serviceId: string, repairIndex: number) => void;
  resetToDefault: () => void;
  exportConfig: () => string;
  importConfig: (json: string) => boolean;
  saveConfig: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      const { data, error } = await supabase
        .from(SUPABASE_TABLE)
        .select('data')
        .eq('id', SUPABASE_CONFIG_ID)
        .single();

      if (error) {
        console.error('Ошибка загрузки конфига из Supabase:', error);
      }

      const cloudConfig = data?.data;

      if (cloudConfig && typeof cloudConfig === 'object' && Object.keys(cloudConfig).length > 0) {
        setConfig(mergeWithDefault(cloudConfig));
        setIsLoaded(true);
        return;
      }

      try {
        const localConfig = localStorage.getItem(STORAGE_KEY);
        const localVersion = localStorage.getItem(STORAGE_VERSION_KEY);

        if (localConfig) {
          const parsed = JSON.parse(localConfig);
          const merged = mergeWithDefault(parsed);

          setConfig(merged);
          setIsLoaded(true);

          if (localVersion !== CURRENT_VERSION) {
            localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
          }

          return;
        }
      } catch {
        console.warn('Не удалось перенести старый localStorage конфиг');
      }

      setConfig(defaultConfig);
      setIsLoaded(true); 
    }

    loadConfig();
  }, []);


  const saveConfig = async () => {
    if (!isLoaded) return;
    await saveConfigToSupabase(config);
  };

  const updateConfig = (updates: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const updateServicePage = (id: string, updates: Partial<SiteConfig['servicePages'][0]>) => {
    setConfig((prev) => ({
      ...prev,
      servicePages: prev.servicePages.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  };

  const updatePriceCategory = (id: string, updates: Partial<SiteConfig['priceCategories'][0]>) => {
    setConfig((prev) => ({
      ...prev,
      priceCategories: prev.priceCategories.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    }));
  };

  const updateReview = (index: number, review: SiteConfig['reviews'][0]) => {
    setConfig((prev) => ({
      ...prev,
      reviews: prev.reviews.map((r, i) => (i === index ? review : r)),
    }));
  };

  const addReview = (review: SiteConfig['reviews'][0]) => {
    setConfig((prev) => ({ ...prev, reviews: [...prev.reviews, review] }));
  };

  const removeReview = (index: number) => {
    setConfig((prev) => ({ ...prev, reviews: prev.reviews.filter((_, i) => i !== index) }));
  };

  const updateGalleryImage = (index: number, image: SiteConfig['galleryImages'][0]) => {
    setConfig((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.map((img, i) => (i === index ? image : img)),
    }));
  };

  const addGalleryImage = (image: SiteConfig['galleryImages'][0]) => {
    setConfig((prev) => ({ ...prev, galleryImages: [...prev.galleryImages, image] }));
  };

  const removeGalleryImage = (index: number) => {
    setConfig((prev) => ({ ...prev, galleryImages: prev.galleryImages.filter((_, i) => i !== index) }));
  };

  const updateWhyUsFeature = (index: number, feature: SiteConfig['whyUsFeatures'][0]) => {
    setConfig((prev) => ({
      ...prev,
      whyUsFeatures: prev.whyUsFeatures.map((f, i) => (i === index ? feature : f)),
    }));
  };

  const addWhyUsFeature = (feature: SiteConfig['whyUsFeatures'][0]) => {
    setConfig((prev) => ({ ...prev, whyUsFeatures: [...prev.whyUsFeatures, feature] }));
  };

  const removeWhyUsFeature = (index: number) => {
    setConfig((prev) => ({ ...prev, whyUsFeatures: prev.whyUsFeatures.filter((_, i) => i !== index) }));
  };

  const updateProcessStep = (index: number, step: SiteConfig['processSteps'][0]) => {
    setConfig((prev) => ({
      ...prev,
      processSteps: prev.processSteps.map((s, i) => (i === index ? step : s)),
    }));
  };

  const addProcessStep = (step: SiteConfig['processSteps'][0]) => {
    setConfig((prev) => ({ ...prev, processSteps: [...prev.processSteps, step] }));
  };

  const removeProcessStep = (index: number) => {
    setConfig((prev) => ({ ...prev, processSteps: prev.processSteps.filter((_, i) => i !== index) }));
  };

  const updateOtherService = (index: number, service: SiteConfig['otherServices'][0]) => {
    setConfig((prev) => ({
      ...prev,
      otherServices: prev.otherServices.map((s, i) => (i === index ? service : s)),
    }));
  };

  const addOtherService = (service: SiteConfig['otherServices'][0]) => {
    setConfig((prev) => ({ ...prev, otherServices: [...prev.otherServices, service] }));
  };

  const removeOtherService = (index: number) => {
    setConfig((prev) => ({ ...prev, otherServices: prev.otherServices.filter((_, i) => i !== index) }));
  };

  const updateScreenReplacement = (updates: Partial<SiteConfig['screenReplacement']>) => {
    setConfig((prev) => ({
      ...prev,
      screenReplacement: { ...prev.screenReplacement, ...updates },
    }));
  };

  const updateWorkSchedule = (index: number, day: SiteConfig['workSchedule'][0]) => {
    setConfig((prev) => ({
      ...prev,
      workSchedule: prev.workSchedule.map((d, i) => (i === index ? day : d)),
    }));
  };

  const updateServiceRepair = (
    serviceId: string,
    repairIndex: number,
    repair: SiteConfig['servicePages'][0]['repairs'][0]
  ) => {
    setConfig((prev) => ({
      ...prev,
      servicePages: prev.servicePages.map((p) =>
        p.id === serviceId
          ? { ...p, repairs: p.repairs.map((r, i) => (i === repairIndex ? repair : r)) }
          : p
      ),
    }));
  };

  const addServiceRepair = (serviceId: string, repair: SiteConfig['servicePages'][0]['repairs'][0]) => {
    setConfig((prev) => ({
      ...prev,
      servicePages: prev.servicePages.map((p) =>
        p.id === serviceId ? { ...p, repairs: [...p.repairs, repair] } : p
      ),
    }));
  };

  const removeServiceRepair = (serviceId: string, repairIndex: number) => {
    setConfig((prev) => ({
      ...prev,
      servicePages: prev.servicePages.map((p) =>
        p.id === serviceId ? { ...p, repairs: p.repairs.filter((_, i) => i !== repairIndex) } : p
      ),
    }));
  };

  const resetToDefault = () => {
    setConfig(defaultConfig);
  };

  const exportConfig = () => JSON.stringify(config, null, 2);

  const importConfig = (json: string) => {
    try {
      const parsed = JSON.parse(json);
      setConfig(mergeWithDefault(parsed));
      return true;
    } catch {
      return false;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        config,
        updateConfig,
        updateServicePage,
        updatePriceCategory,
        updateReview,
        addReview,
        removeReview,
        updateGalleryImage,
        addGalleryImage,
        removeGalleryImage,
        updateWhyUsFeature,
        addWhyUsFeature,
        removeWhyUsFeature,
        updateProcessStep,
        addProcessStep,
        removeProcessStep,
        updateOtherService,
        addOtherService,
        removeOtherService,
        updateScreenReplacement,
        updateWorkSchedule,
        updateServiceRepair,
        addServiceRepair,
        removeServiceRepair,
        resetToDefault,
        exportConfig,
        importConfig,
        saveConfig,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}