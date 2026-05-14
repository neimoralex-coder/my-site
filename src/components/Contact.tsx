import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, Send, CheckCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function Contact() {
  const { config } = useAdmin();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', device: '', issue: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Заявка на ремонт — ${formData.device}`);
    const body = encodeURIComponent(
      `Имя: ${formData.name}\nТелефон: ${formData.phone}\nУстройство: ${formData.device}\n\nОписание проблемы:\n${formData.issue}`
    );
    window.open(`mailto:${config.email}?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const weekdays = config.workSchedule.slice(0, 5);
  const saturday = config.workSchedule[5];
  const sunday = config.workSchedule[6];

  const formatRange = (day?: { isOpen: boolean; open: string; close: string }) => {
    if (!day || !day.isOpen) return 'Выходной';
    return `${day.open} - ${day.close}`;
  };

  const weekdaysText =
    weekdays.length > 0 && weekdays.every((day) => day.isOpen && day.open === weekdays[0].open && day.close === weekdays[0].close)
      ? formatRange(weekdays[0])
      : weekdays.every((day) => !day.isOpen)
        ? 'Выходной'
        : weekdays.map((day) => formatRange(day)).join(', ');

  const weekendText =
    saturday && sunday && saturday.isOpen === sunday.isOpen && saturday.open === sunday.open && saturday.close === sunday.close
      ? formatRange(saturday)
      : `Сб: ${formatRange(saturday)} / Вс: ${formatRange(sunday)}`;

  return (
    <section id="contacts" className="py-24 lg:py-32 bg-warm">
      <div className="max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4 shadow-sm">
            <Phone className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Контакты</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">Запишитесь на ремонт</h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Оставьте заявку и мы свяжемся с вами в течение 15 минут.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-primary mb-5">Как нас найти</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-light rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Адрес</p>
                    <p className="text-sm text-gray-500 mt-0.5">{config.address}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{config.metro}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-light rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Телефон</p>
                    <a
                      href={`tel:${config.phone.replace(/\s/g, '').replace(/[()-]/g, '')}`}
                      className="text-sm text-gray-500 hover:text-accent transition-colors mt-0.5 block"
                    >
                      {config.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-light rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Email</p>
                    <a
                      href={`mailto:${config.email}`}
                      className="text-sm text-gray-500 hover:text-accent transition-colors mt-0.5 block"
                    >
                      {config.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-light rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Режим работы</p>
                    <p className="text-sm text-gray-500">ПН - ПТ</p>
                    <p className="text-sm text-gray-500">{weekdaysText}</p>
                    <p className="text-sm text-gray-500 mt-1">Сб - Вс</p>
                    <p className="text-sm text-gray-500">{weekendText}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary rounded-3xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Срочный ремонт?</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Звоните по телефону и мы примем вас в первую очередь.
              </p>
              <a
                href={`tel:${config.phone.replace(/\s/g, '').replace(/[()-]/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary text-sm font-medium rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Позвонить
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-primary mb-6">Оставить заявку</h3>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-primary mb-2">Заявка отправлена!</h4>
                  <p className="text-gray-500">Откроется почтовый клиент для отправки.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ваше имя</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Иван Иванов"
                        className="w-full px-4 py-3 bg-warm rounded-xl border border-transparent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+7 (999) 123-45-67"
                        className="w-full px-4 py-3 bg-warm rounded-xl border border-transparent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Устройство</label>
                    <select
                      name="device"
                      value={formData.device}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-warm rounded-xl border border-transparent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all text-sm appearance-none"
                    >
                      <option value="">Выберите устройство</option>
                      <option value="iPhone">iPhone</option>
                      <option value="iPad">iPad</option>
                      <option value="MacBook">MacBook</option>
                      <option value="Apple Watch">Apple Watch</option>
                      <option value="Другое">Другое устройство</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Описание проблемы</label>
                    <textarea
                      name="issue"
                      value={formData.issue}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Расскажите, что случилось..."
                      className="w-full px-4 py-3 bg-warm rounded-xl border border-transparent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Отправить заявку на {config.email}
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    Нажимая кнопку, откроется почтовый клиент с заполненным письмом
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
