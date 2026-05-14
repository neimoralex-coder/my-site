import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, Wrench } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-warm -z-10" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto section-padding w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-gray-600">Работаем сегодня с 10:00 до 21:00</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight tracking-tight">
              Ремонт техники{' '}
              <span className="text-accent">Apple</span>
              <br />
              с гарантией 1 год
            </h1>

            <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-lg">
              Профессиональная замена стекла дисплея, ремонт iPhone, iPad, MacBook и Apple Watch. 
              Оригинальные запчасти и бережное отношение к вашей технике.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contacts"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-medium rounded-2xl hover:bg-gray-800 transition-all shadow-lg shadow-primary/10"
              >
                Записаться на ремонт
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary font-medium rounded-2xl border border-gray-200 hover:border-gray-300 transition-all"
              >
                Узнать цены
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-6">
              {[
                { icon: Shield, text: 'Гарантия 1 год' },
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
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50">
              <img
                src="/images/hero-repair.jpg"
                alt="Ремонт iPhone"
                className="w-full h-[400px] lg:h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 lg:-left-10 bg-white rounded-2xl shadow-xl p-5 border border-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">Гарантия 365 дней</p>
                  <p className="text-xs text-gray-500 mt-0.5">На все виды работ</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -top-4 -right-4 lg:-right-8 bg-white rounded-2xl shadow-xl p-4 border border-gray-50"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">2 400+</p>
                  <p className="text-xs text-gray-500">довольных клиентов</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
