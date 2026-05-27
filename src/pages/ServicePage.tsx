import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Wrench, Clock, Shield, CheckCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useState } from 'react';
import MessengerModal from '../components/MessengerModal';
import MediaAsset from '../components/MediaAsset';

export default function ServicePage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { config } = useAdmin();
  const [messengerOpen, setMessengerOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const page = config.servicePages.find((p) => p.id === serviceId);

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Услуга не найдена</h1>
          <Link to="/" className="text-accent hover:underline">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="pt-24 pb-16 bg-warm">
        <div className="max-w-7xl mx-auto section-padding">
          <Link
            to="/#services"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к услугам
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl lg:text-5xl font-bold text-primary tracking-tight">{page.title}</h1>
              <p className="mt-4 text-xl text-accent font-medium">{page.subtitle}</p>
              <p className="mt-4 text-gray-500 leading-relaxed">{page.description}</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => setMessengerOpen(true)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-medium rounded-2xl hover:bg-gray-800 transition-all shadow-lg shadow-primary/10 cursor-pointer"
                >
                  Записаться на ремонт
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/#pricing"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary font-medium rounded-2xl border border-gray-200 hover:border-gray-300 transition-all"
                >
                  Узнать цены
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <MediaAsset src={page.heroImage} alt={page.title} className="w-full h-[350px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-light rounded-full mb-4">
              <Wrench className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">Процесс ремонта</span>
            </div>
            <h2 className="text-3xl font-bold text-primary tracking-tight">Как проходит ремонт</h2>
            <p className="mt-4 text-gray-500">
              Каждый этап проходит с максимальной аккуратностью и вниманием к деталям.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-xl h-[400px]"
            >
              <MediaAsset
                src={page.processImages[activeImage] || page.processImages[0]}
                alt="Процесс ремонта"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {page.processImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === activeImage ? 'bg-white w-6' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </motion.div>

            <div className="space-y-4">
              {page.processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-5 bg-warm rounded-2xl"
                >
                  <div className="w-10 h-10 bg-accent-light rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-accent">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{step.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-primary tracking-tight">Виды ремонта</h2>
            <p className="mt-4 text-gray-500">
              Полный спектр услуг для {page.title.toLowerCase()}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {page.repairs.map((repair, index) => (
              <motion.div
                key={repair.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-warm rounded-3xl overflow-hidden hover:shadow-lg transition-all"
              >
                {repair.image && (
                  <div className="h-40 overflow-hidden">
                    <MediaAsset src={repair.image} alt={repair.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-primary">{repair.name}</h3>
                    <span className="text-sm font-bold text-accent">{repair.priceFrom}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{repair.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>От 30 минут</span>
                    <span className="mx-1">·</span>
                    <Shield className="w-3.5 h-3.5" />
                    <span>Гарантия 1 год</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-primary rounded-3xl p-8 lg:p-12 text-white text-center"
          >
            <div className="max-w-2xl mx-auto">
              <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Готовы отдать устройство в ремонт?</h3>
              <p className="text-gray-300 mb-6">
                Запишитесь прямо сейчас и получите бесплатную диагностику при первом обращении.
              </p>
              <button
                onClick={() => setMessengerOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-medium rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Записаться на ремонт
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <MessengerModal open={messengerOpen} onClose={() => setMessengerOpen(false)} />
    </>
  );
}
