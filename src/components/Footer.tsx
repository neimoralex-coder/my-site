import { Link } from 'react-router-dom';
import { Smartphone, Watch, Tablet, Laptop } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function Footer() {
  const { config } = useAdmin();

  return (
    <footer className="bg-primary text-white py-16">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
                <span className="text-primary font-bold text-lg">i</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">{config.siteName}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Профессиональный сервисный центр по ремонту техники Apple. 
              Гарантия 1 год на все виды работ.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-5">Услуги</h4>
            <ul className="space-y-3">
              {[
                { icon: Smartphone, label: 'Ремонт iPhone', href: '/services/iphone' },
                { icon: Tablet, label: 'Ремонт iPad', href: '/services/ipad' },
                { icon: Laptop, label: 'Ремонт MacBook', href: '/services/macbook' },
                { icon: Watch, label: 'Ремонт Apple Watch', href: '/services/applewatch' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5">Информация</h4>
            <ul className="space-y-3">
              {[
                { label: 'О нас', href: '/#why-us' },
                { label: 'Цены', href: '/pricing' },
                { label: 'Гарантия', href: '/#why-us' },
                { label: 'Отзывы', href: '/#reviews' },
                { label: 'Контакты', href: '/#contacts' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-gray-400 hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5">Контакты</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href={`tel:${config.phone.replace(/\s/g, '').replace(/[()-]/g, '')}`} className="hover:text-white transition-colors">{config.phone}</a></li>
              <li><a href={`mailto:${config.email}`} className="hover:text-white transition-colors">{config.email}</a></li>
              <li>{config.address}</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2026 {config.siteName}. Все права защищены.</p>
          <p className="text-xs text-gray-500">Сервисный центр по ремонту техники Apple</p>
        </div>
      </div>
    </footer>
  );
}
