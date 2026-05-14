import { motion } from 'framer-motion';
import { Shield, Clock, Award, ThumbsUp, Sparkles, Headphones } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const iconMap: Record<string, React.ElementType> = {
  Shield, Clock, Award, ThumbsUp, Sparkles, Headphones,
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const itemAnim = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function WhyUs() {
  const { config } = useAdmin();

  return (
    <section id="why-us" className="py-24 lg:py-32 bg-warm">
      <div className="max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4 shadow-sm">
            <Award className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Преимущества</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">Почему выбирают нас</h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Мы ценим ваше время и технику. Каждый ремонт — это ответственность,
            которую мы берём на себя с полной самоотдачей.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {config.whyUsFeatures.map((feature) => {
            const Icon = iconMap[feature.icon] || Shield;
            return (
              <motion.div
                key={feature.title}
                variants={itemAnim}
                className="bg-white rounded-3xl p-7 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div className="w-12 h-12 bg-accent-light rounded-2xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
