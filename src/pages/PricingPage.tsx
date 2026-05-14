import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Smartphone, Tablet, Laptop, Watch, ChevronRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const iconMap: Record<string, React.ElementType> = {
  Smartphone, Tablet, Laptop, Watch,
};

export default function PricingPage() {
  const { config } = useAdmin();
  const [activeCategory, setActiveCategory] = useState(config.priceCategories[0]?.id || '');

  const category = config.priceCategories.find((c) => c.id === activeCategory);

  return (
    <>
      <section className="pt-24 pb-16 bg-warm">
        <div className="max-w-7xl mx-auto section-padding">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Назад на главную
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary tracking-tight">Цены на ремонт</h1>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Выберите категорию устройства и узнайте стоимость каждой работы. 
              Точная цена определяется после бесплатной диагностики.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {config.priceCategories.map((cat) => {
              const Icon = iconMap[cat.icon] || Smartphone;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/10'
                      : 'bg-warm text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {category && (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-warm rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="bg-primary text-white">
                        <th className="text-left px-6 py-4 font-semibold text-sm">Модель</th>
                        <th className="text-left px-6 py-4 font-semibold text-sm">Экран / Стекло</th>
                        <th className="text-left px-6 py-4 font-semibold text-sm">Батарея</th>
                        <th className="text-left px-6 py-4 font-semibold text-sm">Разъём</th>
                        <th className="text-left px-6 py-4 font-semibold text-sm">Камера</th>
                        <th className="text-left px-6 py-4 font-semibold text-sm">После воды</th>
                        <th className="text-left px-6 py-4 font-semibold text-sm">Другое</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item, index) => (
                        <tr
                          key={item.model}
                          className={`border-b border-gray-100 hover:bg-white transition-colors ${
                            index % 2 === 0 ? 'bg-transparent' : 'bg-white/50'
                          }`}
                        >
                          <td className="px-6 py-4 font-medium text-primary text-sm">{item.model}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.screen}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.battery}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.charging}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.camera}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.water}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.other}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  * Цены указаны ориентировочно. Точная стоимость определяется после диагностики.
                </p>
                <Link
                  to={`/services/${category.id}`}
                  className="flex items-center gap-2 text-sm font-medium text-accent hover:text-primary transition-colors shrink-0 ml-4"
                >
                  Подробнее о ремонте
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
