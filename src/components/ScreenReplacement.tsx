import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import MediaAsset from './MediaAsset';

export default function ScreenReplacement() {
  const { config } = useAdmin();
  const sr = config.screenReplacement;

  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50">
              <MediaAsset
                src={sr.image}
                alt={sr.title}
                className="w-full h-[350px] lg:h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-5 -right-5 lg:-right-8 bg-white rounded-2xl shadow-xl p-5 border border-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">Ремонт от 30 мин</p>
                  <p className="text-xs text-gray-500 mt-0.5">Пока вы пьёте кофе</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-light rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                {sr.subtitle}
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-primary leading-tight tracking-tight">
              {sr.title}
            </h2>

            <p className="mt-5 text-gray-500 leading-relaxed">{sr.description}</p>

            <div className="mt-6 space-y-4">
              {sr.featureList.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-accent-light rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                  </div>
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {sr.benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 px-4 py-2.5 bg-warm rounded-xl">
                  <Shield className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-medium rounded-2xl hover:bg-gray-800 transition-all shadow-lg shadow-primary/10"
              >
                Узнать стоимость
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
