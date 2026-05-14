import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Smartphone, Watch, Tablet, Laptop, Cpu } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const iconMap: Record<string, React.ElementType> = {
  Smartphone, Watch, Tablet, Laptop, Cpu,
};

const appleServices = [
  { id: 'iphone', icon: 'Smartphone', title: 'iPhone' },
  { id: 'ipad', icon: 'Tablet', title: 'iPad' },
  { id: 'macbook', icon: 'Laptop', title: 'MacBook' },
  { id: 'applewatch', icon: 'Watch', title: 'Apple Watch' },
];

export default function ServicesPage() {
  const { config } = useAdmin();

  return (
    <>
      <section className="pt-24 pb-16 bg-warm">
        <div className="max-w-7xl mx-auto section-padding">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад на главную
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-light rounded-full mb-4">
              <Cpu className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">Услуги</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-primary tracking-tight">
              Выберите устройство
            </h1>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Мы ремонтируем всю технику Apple и другие бренды. 
              Выберите категорию, чтобы узнать подробнее о ремонте.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {appleServices.map((service, index) => {
              const page = config.servicePages.find((p) => p.id === service.id);
              const Icon = iconMap[service.icon] || Smartphone;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/services/${service.id}`}
                    className="group block bg-warm rounded-3xl p-8 hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 border border-transparent hover:border-gray-100 h-full"
                  >
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">
                      {page?.description}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-medium text-accent">
                      Подробнее
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
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
    </>
  );
}
