import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, Wrench } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import ImageGallery from '../components/ImageGallery';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import Process from '../components/Process';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import ScreenReplacement from '../components/ScreenReplacement';
import MessengerModal from '../components/MessengerModal';

export default function HomePage() {
  const { config } = useAdmin();
  const [messengerOpen, setMessengerOpen] = useState(false);

  const status = useMemo(() => {
    const now = new Date();
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const dayName = days[now.getDay()];
    const schedule = config.workSchedule.find((d) => d.day === dayName);
    if (!schedule || !schedule.isOpen) return { open: false, text: 'Сегодня закрыто' };
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;
    const [openH, openM] = schedule.open.split(':').map(Number);
    const [closeH, closeM] = schedule.close.split(':').map(Number);
    const openTime = openH * 60 + openM;
    const closeTime = closeH * 60 + closeM;
    const isOpenNow = currentTime >= openTime && currentTime < closeTime;
    return {
      open: isOpenNow,
      text: isOpenNow
        ? `Работаем сегодня с ${schedule.open} до ${schedule.close}`
        : `Сегодня закрыто — откроемся ${schedule.open}`,
    };
  }, [config.workSchedule]);

  return (
    <>
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-warm -z-10" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto section-padding w-full py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-6">
                <span className={`w-2 h-2 rounded-full animate-pulse ${status.open ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-xs font-medium text-gray-600">{status.text}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight tracking-tight">
                {config.heroTitle}
                <br />
                <span className="text-accent">{config.heroSubtitle}</span>
              </h1>

              <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-lg">{config.heroDescription}</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => setMessengerOpen(true)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-medium rounded-2xl hover:bg-gray-800 transition-all shadow-lg shadow-primary/10 cursor-pointer"
                >
                  Записаться на ремонт
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="/#pricing"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary font-medium rounded-2xl border border-gray-200 hover:border-gray-300 transition-all"
                >
                  Узнать цены
                </a>
              </div>

              <div className="mt-12 flex flex-wrap gap-6">
                {[
                  { icon: Shield, text: config.guaranteeText },
                  { icon: Clock, text: 'Ремонт от 30 мин' },
                  { icon: Wrench, text: 'Оригинальные детали' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <ImageGallery />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 lg:-left-10 bg-white rounded-2xl shadow-xl p-5 border border-gray-50 z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">{config.guaranteeText}</p>
                    <p className="text-xs text-gray-500 mt-0.5">На все виды работ</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-4 -right-4 lg:-right-8 bg-white rounded-2xl shadow-xl p-4 border border-gray-50 z-10"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">{config.clientsCount}</p>
                    <p className="text-xs text-gray-500">довольных клиентов</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <ScreenReplacement />
      <Services />
      <WhyUs />
      <Process />
      <Reviews />
      <Contact />

      <MessengerModal open={messengerOpen} onClose={() => setMessengerOpen(false)} />
    </>
  );
}
