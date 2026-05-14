import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function Reviews() {
  const { config } = useAdmin();
  const [current, setCurrent] = useState(0);

  const reviews = config.reviews;
  if (reviews.length === 0) return null;

  const next = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto section-padding">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-light rounded-full mb-4">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Отзывы</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">Что говорят наши клиенты</h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Более {config.clientsCount} довольных клиентов за 5 лет работы.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-warm rounded-3xl p-8 lg:p-10 relative"
            >
              <Quote className="w-10 h-10 text-accent/20 absolute top-6 right-6" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(reviews[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">“{reviews[current].text}”</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-lg font-semibold text-accent">{reviews[current].name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-primary">{reviews[current].name}</p>
                  <p className="text-sm text-gray-500">{reviews[current].device} — {reviews[current].service}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button onClick={prev} className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100 hover:border-gray-200 transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-accent w-8' : 'bg-gray-300'}`} />
              ))}
            </div>
            <button onClick={next} className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100 hover:border-gray-200 transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
