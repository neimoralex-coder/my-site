import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Save, RotateCcw, Download, Upload, CheckCircle, Globe, Phone, Mail, MapPin,
  Clock, Image, MessageSquare, Star, Wrench, DollarSign, FileText, Shield, Sparkles,
  Search, FileCheck, Hammer, Check, Smartphone, Tablet, Laptop, Watch, Monitor,
  Plus, Trash2, Award, ThumbsUp, Headphones,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import MediaAsset from '../components/MediaAsset';
import { saveMediaFile } from '../utils/mediaStore';

const iconMap: Record<string, React.ElementType> = {
  Shield, Clock, Award, ThumbsUp, Sparkles, Headphones: Phone,
  Search, FileText, Wrench, CheckCircle, Check, Smartphone, Tablet, Laptop, Watch, Monitor,
  Hammer, FileCheck, Plus, Trash2,
};

const tabs = [
  { id: 'general', label: 'Основное', icon: Globe },
  { id: 'contacts', label: 'Контакты и график', icon: Clock },
  { id: 'hero', label: 'Главная', icon: FileText },
  { id: 'gallery', label: 'Галерея', icon: Image },
  { id: 'screen', label: 'Замена стекла', icon: Sparkles },
  { id: 'services', label: 'Услуги', icon: Wrench },
  { id: 'whyus', label: 'Почему мы', icon: Shield },
  { id: 'process', label: 'Процесс', icon: Search },
  { id: 'prices', label: 'Цены', icon: DollarSign },
  { id: 'reviews', label: 'Отзывы', icon: Star },
  { id: 'messengers', label: 'Мессенджеры', icon: MessageSquare },
];

export default function AdminPage() {
  const admin = useAdmin();
  const { config } = admin;
  const [activeTab, setActiveTab] = useState('general');
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveError, setSaveError] = useState('');
  const isFirstConfigRender = useRef(true);

  useEffect(() => {
    if (isFirstConfigRender.current) {
      isFirstConfigRender.current = false;
      return;
    }

    setSaveError('');
    setSaveStatus((currentStatus) => (currentStatus === 'saving' ? currentStatus : 'idle'));
  }, [config]);

  const handleSave = async () => {
    try {
      setSaveStatus('saving');
      setSaveError('');

      await admin.saveConfig();

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      setSaveError(error instanceof Error ? error.message : 'Не удалось сохранить изменения.');
      setSaveStatus('error');
    }
  };

  const handleImport = () => {
    const ok = admin.importConfig(importText);
    if (ok) {
      setImportText('');
      setImportError('');
      handleSave();
    } else {
      setImportError('Ошибка парсинга JSON');
    }
  };

  const inputClass = 'w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all text-sm';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';
  const textareaClass = 'w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all text-sm resize-none';
  const mediaAccept = 'image/*,video/*,.gif,.webp,.avif,.mp4,.webm,.mov,.m4v';

  const handleMediaUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const ref = await saveMediaFile(file);
      onChange(ref);
      event.target.value = '';
    } catch {
      alert('Не удалось загрузить файл. Попробуйте файл поменьше или другой формат.');
    }
  };

  const mediaField = (value: string, onChange: (value: string) => void, placeholder: string) => (
    <div className="space-y-2">
      <input
        className={inputClass}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <label className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:border-accent hover:text-accent transition-colors cursor-pointer">
        <Upload className="w-4 h-4" />
        Загрузить файл
        <input
          type="file"
          accept={mediaAccept}
          className="hidden"
          onChange={(e) => void handleMediaUpload(e, onChange)}
        />
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              На сайт
            </Link>
            <h1 className="text-2xl font-bold text-primary">Админ-панель</h1>
          </div>
          <div className="flex items-center gap-3">
            {saveStatus === 'error' && saveError && (
              <span className="hidden sm:inline text-xs font-medium text-red-500 max-w-xs text-right">
                {saveError}
              </span>
            )}
            <button
              onClick={() => void handleSave()}
              disabled={saveStatus === 'saving'}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
                saveStatus === 'success'
                  ? 'bg-green-600 text-white hover:bg-green-600'
                  : saveStatus === 'error'
                    ? 'bg-red-600 text-white hover:bg-red-600'
                    : 'bg-accent text-white hover:bg-blue-600'
              }`}
            >
              {saveStatus === 'success' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saveStatus === 'idle' && 'Сохранить'}
              {saveStatus === 'saving' && 'Сохраняем...'}
              {saveStatus === 'success' && 'Сохранено'}
              {saveStatus === 'error' && 'Ошибка сохранения'}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors text-left ${
                    activeTab === tab.id
                      ? 'bg-accent-light text-accent'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-sm text-primary mb-4">Экспорт / Импорт</h3>
              <button
                onClick={() => {
                  const blob = new Blob([admin.exportConfig()], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'ifix-config.json';
                  a.click();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-warm rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors mb-3"
              >
                <Download className="w-4 h-4" />
                Экспорт JSON
              </button>
              <textarea
                value={importText}
                onChange={(e) => {
                  setImportText(e.target.value);
                  setImportError('');
                }}
                placeholder="Вставьте JSON для импорта..."
                className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs resize-none h-20 mb-2"
              />
              {importError && <p className="text-xs text-red-500 mb-2">{importError}</p>}
              <button
                onClick={handleImport}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-warm rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors mb-3"
              >
                <Upload className="w-4 h-4" />
                Импорт JSON
              </button>
              <button
                onClick={() => {
                  if (confirm('Вы уверены? Все изменения будут сброшены.'))
                    admin.resetToDefault();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 rounded-xl text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Сбросить по умолчанию
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
              {/* ====== GENERAL ====== */}
              {activeTab === 'general' && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-primary mb-6">Основные настройки</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Название сайта</label>
                      <input
                        className={inputClass}
                        value={config.siteName}
                        onChange={(e) => admin.updateConfig({ siteName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Телефон</label>
                      <input
                        className={inputClass}
                        value={config.phone}
                        onChange={(e) => admin.updateConfig({ phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email</label>
                      <input
                        className={inputClass}
                        value={config.email}
                        onChange={(e) => admin.updateConfig({ email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Количество клиентов</label>
                      <input
                        className={inputClass}
                        value={config.clientsCount}
                        onChange={(e) => admin.updateConfig({ clientsCount: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Текст гарантии</label>
                      <input
                        className={inputClass}
                        value={config.guaranteeText}
                        onChange={(e) => admin.updateConfig({ guaranteeText: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ====== CONTACTS & SCHEDULE ====== */}
              {activeTab === 'contacts' && (
                <div className="space-y-8">
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold text-primary mb-6">Контактная информация</h2>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>
                          <MapPin className="w-3.5 h-3.5 inline mr-1" />
                          Адрес
                        </label>
                        <input
                          className={inputClass}
                          value={config.address}
                          onChange={(e) => admin.updateConfig({ address: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          <MapPin className="w-3.5 h-3.5 inline mr-1" />
                          Метро
                        </label>
                        <input
                          className={inputClass}
                          value={config.metro}
                          onChange={(e) => admin.updateConfig({ metro: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <h3 className="text-lg font-bold text-primary">График работы (для индикатора на сайте)</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {config.workSchedule.map((day, i) => (
                        <div key={day.day} className="p-4 bg-gray-50 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-primary">{day.day}</span>
                            <label className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={day.isOpen}
                                onChange={(e) =>
                                  admin.updateWorkSchedule(i, { ...day, isOpen: e.target.checked })
                                }
                                className="w-4 h-4 rounded accent-accent"
                              />
                              Работаем
                            </label>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs text-gray-500">С</label>
                              <input
                                className={inputClass}
                                value={day.open}
                                onChange={(e) =>
                                  admin.updateWorkSchedule(i, { ...day, open: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500">До</label>
                              <input
                                className={inputClass}
                                value={day.close}
                                onChange={(e) =>
                                  admin.updateWorkSchedule(i, { ...day, close: e.target.value })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">
                      * Зелёная точка горит в рабочее время, красная — когда закрыто.
                    </p>
                  </div>
                </div>
              )}

              {/* ====== HERO ====== */}
              {activeTab === 'hero' && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-primary mb-6">Главный экран</h2>
                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Заголовок (первая часть)</label>
                      <input
                        className={inputClass}
                        value={config.heroTitle}
                        onChange={(e) => admin.updateConfig({ heroTitle: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Заголовок (вторая часть)</label>
                      <input
                        className={inputClass}
                        value={config.heroSubtitle}
                        onChange={(e) => admin.updateConfig({ heroSubtitle: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Описание</label>
                      <textarea
                        className={textareaClass + ' h-24'}
                        value={config.heroDescription}
                        onChange={(e) => admin.updateConfig({ heroDescription: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ====== GALLERY ====== */}
              {activeTab === 'gallery' && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-primary mb-6">Галерея на главной</h2>
                  <div className="space-y-4">
                    {config.galleryImages.map((img, i) => (
                      <div key={i} className="flex gap-3 items-start p-4 bg-gray-50 rounded-xl">
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-200">
                          {img.src && <MediaAsset src={img.src} alt={img.alt} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 space-y-2">
                          {mediaField(
                            img.src,
                            (src) => admin.updateGalleryImage(i, { ...img, src }),
                            'URL медиа'
                          )}
                          <input
                            className={inputClass}
                            placeholder="Alt текст"
                            value={img.alt}
                            onChange={(e) => admin.updateGalleryImage(i, { ...img, alt: e.target.value })}
                          />
                          <input
                            className={inputClass}
                            placeholder="Подпись"
                            value={img.caption}
                            onChange={(e) => admin.updateGalleryImage(i, { ...img, caption: e.target.value })}
                          />
                        </div>
                        <button
                          onClick={() => admin.removeGalleryImage(i)}
                          className="px-3 py-2 bg-red-50 text-red-500 rounded-xl text-sm hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => admin.addGalleryImage({ src: '', alt: '', caption: '' })}
                      className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Добавить изображение
                    </button>
                  </div>
                </div>
              )}

              {/* ====== SCREEN REPLACEMENT ====== */}
              {activeTab === 'screen' && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-primary mb-6">Секция «Замена стекла дисплея»</h2>
                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Заголовок</label>
                      <input
                        className={inputClass}
                        value={config.screenReplacement.title}
                        onChange={(e) => admin.updateScreenReplacement({ title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Подзаголовок</label>
                      <input
                        className={inputClass}
                        value={config.screenReplacement.subtitle}
                        onChange={(e) => admin.updateScreenReplacement({ subtitle: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Описание</label>
                      <textarea
                        className={textareaClass + ' h-24'}
                        value={config.screenReplacement.description}
                        onChange={(e) => admin.updateScreenReplacement({ description: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>URL изображения</label>
                      {mediaField(
                        config.screenReplacement.image,
                        (image) => admin.updateScreenReplacement({ image }),
                        'URL медиа'
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>Преимущества (через запятую)</label>
                      <input
                        className={inputClass}
                        value={config.screenReplacement.benefits.join(', ')}
                        onChange={(e) =>
                          admin.updateScreenReplacement({
                            benefits: e.target.value.split(',').map((s) => s.trim()),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Список особенностей</label>
                      {config.screenReplacement.featureList.map((feature, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                          <input
                            className={inputClass}
                            value={feature}
                            onChange={(e) => {
                              const list = [...config.screenReplacement.featureList];
                              list[i] = e.target.value;
                              admin.updateScreenReplacement({ featureList: list });
                            }}
                          />
                          <button
                            onClick={() => {
                              const list = config.screenReplacement.featureList.filter((_, idx) => idx !== i);
                              admin.updateScreenReplacement({ featureList: list });
                            }}
                            className="px-3 py-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() =>
                          admin.updateScreenReplacement({
                            featureList: [...config.screenReplacement.featureList, ''],
                          })
                        }
                        className="flex items-center gap-2 px-4 py-2 bg-warm rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Добавить пункт
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ====== SERVICES ====== */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-primary mb-6">Страницы услуг</h2>
                  {config.servicePages.map((page) => (
                    <div key={page.id} className="border border-gray-100 rounded-xl p-5 space-y-4">
                      <h3 className="font-semibold text-primary text-lg">{page.title}</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Заголовок</label>
                          <input
                            className={inputClass}
                            value={page.title}
                            onChange={(e) => admin.updateServicePage(page.id, { title: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Подзаголовок</label>
                          <input
                            className={inputClass}
                            value={page.subtitle}
                            onChange={(e) => admin.updateServicePage(page.id, { subtitle: e.target.value })}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className={labelClass}>Описание</label>
                          <textarea
                            className={textareaClass + ' h-20'}
                            value={page.description}
                            onChange={(e) => admin.updateServicePage(page.id, { description: e.target.value })}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className={labelClass}>URL главного изображения</label>
                          {mediaField(
                            page.heroImage,
                            (heroImage) => admin.updateServicePage(page.id, { heroImage }),
                            'URL медиа'
                          )}
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium text-primary mb-3">Виды ремонта с картинками</h4>
                        <div className="space-y-3">
                          {page.repairs.map((repair, idx) => (
                            <div key={idx} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                                {repair.image && <MediaAsset src={repair.image} alt="" className="w-full h-full object-cover" />}
                              </div>
                              <div className="flex-1 grid sm:grid-cols-3 gap-2">
                                <input
                                  className={inputClass}
                                  placeholder="Название"
                                  value={repair.name}
                                  onChange={(e) =>
                                    admin.updateServiceRepair(page.id, idx, { ...repair, name: e.target.value })
                                  }
                                />
                                <input
                                  className={inputClass}
                                  placeholder="Цена"
                                  value={repair.priceFrom}
                                  onChange={(e) =>
                                    admin.updateServiceRepair(page.id, idx, { ...repair, priceFrom: e.target.value })
                                  }
                                />
                                {mediaField(repair.image, (image) =>
                                  admin.updateServiceRepair(page.id, idx, { ...repair, image }), 'URL медиа'
                                )}
                                <input
                                  className={inputClass + ' sm:col-span-3'}
                                  placeholder="Описание"
                                  value={repair.description}
                                  onChange={(e) =>
                                    admin.updateServiceRepair(page.id, idx, { ...repair, description: e.target.value })
                                  }
                                />
                              </div>
                              <button
                                onClick={() => admin.removeServiceRepair(page.id, idx)}
                                className="px-2 py-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 self-start"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() =>
                              admin.addServiceRepair(page.id, { name: '', description: '', priceFrom: '', image: '' })
                            }
                            className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Добавить вид ремонта
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="border border-gray-100 rounded-xl p-5 space-y-4">
                    <h3 className="font-semibold text-primary">Другие устройства (на главной)</h3>
                    {config.otherServices.map((service, i) => (
                      <div key={i} className="flex gap-3 items-center p-3 bg-gray-50 rounded-xl">
                        <input
                          className={inputClass + ' flex-1'}
                          placeholder="Иконка (Smartphone, Tablet, Laptop, Monitor)"
                          value={service.icon}
                          onChange={(e) => admin.updateOtherService(i, { ...service, icon: e.target.value })}
                        />
                        <input
                          className={inputClass + ' flex-1'}
                          placeholder="Название"
                          value={service.title}
                          onChange={(e) => admin.updateOtherService(i, { ...service, title: e.target.value })}
                        />
                        <input
                          className={inputClass + ' flex-1'}
                          placeholder="Описание"
                          value={service.description}
                          onChange={(e) => admin.updateOtherService(i, { ...service, description: e.target.value })}
                        />
                        <button
                          onClick={() => admin.removeOtherService(i)}
                          className="px-2 py-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => admin.addOtherService({ icon: 'Smartphone', title: '', description: '' })}
                      className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Добавить устройство
                    </button>
                  </div>
                </div>
              )}

              {/* ====== WHY US ====== */}
              {activeTab === 'whyus' && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-primary mb-6">Почему выбирают нас</h2>
                  {config.whyUsFeatures.map((feature, i) => {
                    const Icon = iconMap[feature.icon] || Shield;
                    return (
                      <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-xl items-start">
                        <div className="w-10 h-10 bg-accent-light rounded-xl flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1 grid sm:grid-cols-2 gap-3">
                          <input
                            className={inputClass}
                            placeholder="Иконка (Shield, Clock, Award...)"
                            value={feature.icon}
                            onChange={(e) => admin.updateWhyUsFeature(i, { ...feature, icon: e.target.value })}
                          />
                          <input
                            className={inputClass}
                            placeholder="Заголовок"
                            value={feature.title}
                            onChange={(e) => admin.updateWhyUsFeature(i, { ...feature, title: e.target.value })}
                          />
                          <textarea
                            className={textareaClass + ' sm:col-span-2 h-16'}
                            placeholder="Описание"
                            value={feature.description}
                            onChange={(e) => admin.updateWhyUsFeature(i, { ...feature, description: e.target.value })}
                          />
                        </div>
                        <button
                          onClick={() => admin.removeWhyUsFeature(i)}
                          className="px-2 py-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 self-start"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                  <button
                    onClick={() => admin.addWhyUsFeature({ icon: 'Shield', title: '', description: '' })}
                    className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Добавить преимущество
                  </button>
                </div>
              )}

              {/* ====== PROCESS ====== */}
              {activeTab === 'process' && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-primary mb-6">Простой и понятный процесс</h2>
                  {config.processSteps.map((step, i) => {
                    const Icon = iconMap[step.icon] || Search;
                    return (
                      <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-xl items-start">
                        <div className="w-10 h-10 bg-accent-light rounded-xl flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1 grid sm:grid-cols-3 gap-3">
                          <input
                            className={inputClass}
                            placeholder="Номер (01, 02...)"
                            value={step.number}
                            onChange={(e) => admin.updateProcessStep(i, { ...step, number: e.target.value })}
                          />
                          <input
                            className={inputClass}
                            placeholder="Иконка (Search, FileText, Wrench...)"
                            value={step.icon}
                            onChange={(e) => admin.updateProcessStep(i, { ...step, icon: e.target.value })}
                          />
                          <input
                            className={inputClass}
                            placeholder="Заголовок"
                            value={step.title}
                            onChange={(e) => admin.updateProcessStep(i, { ...step, title: e.target.value })}
                          />
                          <textarea
                            className={textareaClass + ' sm:col-span-3 h-16'}
                            placeholder="Описание"
                            value={step.description}
                            onChange={(e) => admin.updateProcessStep(i, { ...step, description: e.target.value })}
                          />
                        </div>
                        <button
                          onClick={() => admin.removeProcessStep(i)}
                          className="px-2 py-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 self-start"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                  <button
                    onClick={() => admin.addProcessStep({ number: '', icon: 'Search', title: '', description: '' })}
                    className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Добавить шаг
                  </button>
                </div>
              )}

              {/* ====== PRICES ====== */}
              {activeTab === 'prices' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-primary mb-6">Ценовые категории</h2>
                  {config.priceCategories.map((cat) => (
                    <div key={cat.id} className="border border-gray-100 rounded-xl p-5 space-y-4">
                      <h3 className="font-semibold text-primary">{cat.name}</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Название</label>
                          <input
                            className={inputClass}
                            value={cat.name}
                            onChange={(e) => admin.updatePriceCategory(cat.id, { name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>ID</label>
                          <input className={inputClass} value={cat.id} disabled />
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-100">
                              <th className="text-left py-2 px-2">Модель</th>
                              <th className="text-left py-2 px-2">Экран</th>
                              <th className="text-left py-2 px-2">Батарея</th>
                              <th className="text-left py-2 px-2">Разъём</th>
                              <th className="text-left py-2 px-2">Камера</th>
                              <th className="text-left py-2 px-2">Вода</th>
                              <th className="text-left py-2 px-2">Другое</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cat.items.map((item, idx) => (
                              <tr key={idx} className="border-b border-gray-50">
                                {(['model', 'screen', 'battery', 'charging', 'camera', 'water', 'other'] as const).map(
                                  (field) => (
                                    <td key={field} className="py-1.5 px-2">
                                      <input
                                        className="w-full px-2 py-1 bg-gray-50 rounded text-xs border border-transparent focus:border-accent focus:outline-none"
                                        value={item[field]}
                                        onChange={(e) => {
                                          const newItems = [...cat.items];
                                          newItems[idx] = { ...item, [field]: e.target.value };
                                          admin.updatePriceCategory(cat.id, { items: newItems });
                                        }}
                                      />
                                    </td>
                                  )
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ====== REVIEWS ====== */}
              {activeTab === 'reviews' && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-primary mb-6">Отзывы</h2>
                  {config.reviews.map((review, i) => (
                    <div key={i} className="border border-gray-100 rounded-xl p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-primary">Отзыв {i + 1}</h3>
                        <button onClick={() => admin.removeReview(i)} className="text-xs text-red-500 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <input
                          className={inputClass}
                          placeholder="Имя"
                          value={review.name}
                          onChange={(e) => admin.updateReview(i, { ...review, name: e.target.value })}
                        />
                        <input
                          className={inputClass}
                          placeholder="Устройство"
                          value={review.device}
                          onChange={(e) => admin.updateReview(i, { ...review, device: e.target.value })}
                        />
                        <input
                          className={inputClass}
                          placeholder="Услуга"
                          value={review.service}
                          onChange={(e) => admin.updateReview(i, { ...review, service: e.target.value })}
                        />
                        <select
                          className={inputClass}
                          value={review.rating}
                          onChange={(e) => admin.updateReview(i, { ...review, rating: Number(e.target.value) })}
                        >
                          <option value={5}>5 звёзд</option>
                          <option value={4}>4 звезды</option>
                          <option value={3}>3 звезды</option>
                        </select>
                      </div>
                      <textarea
                        className={textareaClass + ' h-20'}
                        placeholder="Текст отзыва"
                        value={review.text}
                        onChange={(e) => admin.updateReview(i, { ...review, text: e.target.value })}
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => admin.addReview({ name: '', device: '', service: '', rating: 5, text: '' })}
                    className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Добавить отзыв
                  </button>
                </div>
              )}

              {/* ====== MESSENGERS ====== */}
              {activeTab === 'messengers' && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-primary mb-6">Мессенджеры</h2>
                  {config.messengers.map((m, i) => (
                    <div key={m.id} className="grid sm:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-xl">
                      <input className={inputClass} placeholder="ID" value={m.id} disabled />
                      <input
                        className={inputClass}
                        placeholder="Название"
                        value={m.name}
                        onChange={(e) => {
                          const newMs = [...config.messengers];
                          newMs[i] = { ...m, name: e.target.value };
                          admin.updateConfig({ messengers: newMs });
                        }}
                      />
                      <input
                        className={inputClass}
                        placeholder="URL"
                        value={m.url}
                        onChange={(e) => {
                          const newMs = [...config.messengers];
                          newMs[i] = { ...m, url: e.target.value };
                          admin.updateConfig({ messengers: newMs });
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
