import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Smartphone, Tablet, Laptop, Watch } from 'lucide-react';

const screenPrices = [
  {
    device: 'iPhone',
    icon: Smartphone,
    models: [
      { name: 'iPhone 15 Pro Max / 15 Pro', price: 'от 18 900 ₽' },
      { name: 'iPhone 15 Plus / 15', price: 'от 14 900 ₽' },
      { name: 'iPhone 14 Pro Max / 14 Pro', price: 'от 16 900 ₽' },
      { name: 'iPhone 14 Plus / 14', price: 'от 12 900 ₽' },
      { name: 'iPhone 13 Pro Max / 13 Pro', price: 'от 14 900 ₽' },
      { name: 'iPhone 13 / 13 mini', price: 'от 10 900 ₽' },
      { name: 'iPhone 12 Pro Max / 12 Pro', price: 'от 12 900 ₽' },
      { name: 'iPhone 12 / 12 mini / SE 3', price: 'от 8 900 ₽' },
      { name: 'iPhone 11 Pro Max / 11 Pro', price: 'от 10 900 ₽' },
      { name: 'iPhone 11 / XR / SE 2', price: 'от 7 900 ₽' },
    ],
  },
  {
    device: 'iPad',
    icon: Tablet,
    models: [
      { name: 'iPad Pro 12.9" (M2/M1)', price: 'от 24 900 ₽' },
      { name: 'iPad Pro 11" (M2/M1)', price: 'от 19 900 ₽' },
      { name: 'iPad Air 5 / Air 4', price: 'от 14 900 ₽' },
      { name: 'iPad mini 6', price: 'от 12 900 ₽' },
      { name: 'iPad 10 / 9 / 8', price: 'от 9 900 ₽' },
    ],
  },
  {
    device: 'MacBook',
    icon: Laptop,
    models: [
      { name: 'MacBook Pro 16" (M3/M2/M1)', price: 'от 34 900 ₽' },
      { name: 'MacBook Pro 14" (M3/M2/M1)', price: 'от 29 900 ₽' },
      { name: 'MacBook Air 15" / 13" (M3/M2)', price: 'от 22 900 ₽' },
      { name: 'MacBook Pro 13" (Intel)', price: 'от 18 900 ₽' },
      { name: 'MacBook Air 13" (Intel)', price: 'от 14 900 ₽' },
    ],
  },
  {
    device: 'Apple Watch',
    icon: Watch,
    models: [
      { name: 'Apple Watch Ultra 2 / Ultra', price: 'от 16 900 ₽' },
      { name: 'Apple Watch Series 9 / 8 / 7', price: 'от 9 900 ₽' },
      { name: 'Apple Watch Series 6 / SE 2', price: 'от 7 900 ₽' },
      { name: 'Apple Watch Series 5 / 4 / SE', price: 'от 6 900 ₽' },
    ],
  },
];

const otherServices = [
  { name: 'Замена батареи iPhone', price: 'от 3 900 ₽' },
  { name: 'Замена батареи iPad', price: 'от 5 900 ₽' },
  { name: 'Замена батареи MacBook', price: 'от 7 900 ₽' },
  { name: 'Замена батареи Apple Watch', price: 'от 3 900 ₽' },
  { name: 'Ремонт после воды', price: 'от 4 900 ₽' },
  { name: 'Замена камеры', price: 'от 3 500 ₽' },
  { name: 'Замена разъёма зарядки', price: 'от 2 900 ₽' },
  { name: 'Ремонт кнопок', price: 'от 2 500 ₽' },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-warm">
      <div className="max-w-7xl mx-auto section-padding">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4 shadow-sm">
            <Check className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Цены</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">Стоимость замены стекла</h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Актуальные цены на замену стекла дисплея. 
            <Link to="/pricing" className="text-accent hover:underline ml-1">Посмотреть все цены →</Link>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {screenPrices.map((category, catIndex) => (
            <motion.div key={category.device} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: catIndex * 0.1 }} className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent-light rounded-xl flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-primary">{category.device}</h3>
              </div>
              <div className="space-y-3">
                {category.models.map((model) => (
                  <div key={model.name} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-600">{model.name}</span>
                    <span className="text-sm font-semibold text-primary">{model.price}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-primary mb-6">Другие услуги</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {otherServices.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-4 bg-warm rounded-2xl">
                <span className="text-sm text-gray-600">{service.name}</span>
                <span className="text-sm font-semibold text-primary">{service.price}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-8 text-center">
          <p className="text-sm text-gray-400">* Цены указаны ориентировочно. Точная стоимость определяется после диагностики.</p>
        </motion.div>
      </div>
    </section>
  );
}
