import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone, Watch, Tablet, Laptop, Cpu, Monitor, ArrowRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const iconMap: Record<string, React.ElementType> = {
  Smartphone, Watch, Tablet, Laptop, Cpu, Monitor,
};

const appleServices = [
  { id: 'iphone', icon: 'Smartphone', title: 'iPhone' },
  { id: 'ipad', icon: 'Tablet', title: 'iPad' },
  { id: 'macbook', icon: 'Laptop', title: 'MacBook' },
  { id: 'applewatch', icon: 'Watch', title: 'Apple Watch' },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Services() {
  const { config } = useAdmin();

  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-light rounded-full mb-4">
            <Cpu className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Наши услуги</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">
            Ремонтируем всю технику Apple
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Полный цикл ремонта от диагностики до финальной проверки.
            Специализируемся на технике Apple, но также работаем с другими брендами.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {appleServices.map((service) => {
            const page = config.servicePages.find((p) => p.id === service.id);
            const Icon = iconMap[service.icon] || Smartphone;
            return (
              <motion.div key={service.id} variants={item}>
                <Link
                  to={`/services/${service.id}`}
                  className="group block bg-warm rounded-3xl p-6 hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 border border-transparent hover:border-gray-100 h-full"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {page?.description.slice(0, 100)}...
                  </p>
                  <div className="flex items-center gap-1 text-sm font-medium text-accent">
                    Подробнее
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="text-center mb-10">
            <h3 className="text-xl font-semibold text-primary">Также ремонтируем</h3>
            <p className="mt-2 text-sm text-gray-500">Другие смартфоны, планшеты и ноутбуки</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {config.otherServices.map((service) => {
              const Icon = iconMap[service.icon] || Smartphone;
              return (
                <div
                  key={service.title}
                  className="flex items-start gap-4 p-5 bg-warm rounded-2xl border border-transparent hover:border-gray-100 transition-all"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-primary text-sm">{service.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
