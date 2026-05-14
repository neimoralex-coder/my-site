import { motion } from 'framer-motion';
import { Search, FileText, Wrench, CheckCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const iconMap: Record<string, React.ElementType> = {
  Search, FileText, Wrench, CheckCircle,
};

export default function Process() {
  const { config } = useAdmin();

  return (
    <section id="process" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-light rounded-full mb-4">
            <CheckCircle className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Как мы работаем</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">
            Простой и понятный процесс
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            От диагностики до готового устройства — всего {config.processSteps.length} шага.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.processSteps.map((step, index) => {
            const Icon = iconMap[step.icon] || Search;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {index < config.processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-px bg-gray-200" />
                )}
                <div className="bg-warm rounded-3xl p-7 relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <span className="text-3xl font-bold text-gray-200">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
