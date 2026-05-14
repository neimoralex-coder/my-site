import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';

const navLinks = [
  { label: 'Услуги', href: '/#services' },
  { label: 'Почему мы', href: '/#why-us' },
  { label: 'Процесс', href: '/#process' },
  { label: 'Цены', href: '/pricing' },
  { label: 'Отзывы', href: '/#reviews' },
  { label: 'Контакты', href: '/#contacts' },
];

export default function Header() {
  const { config } = useAdmin();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isHome && location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [isHome, location.hash, location.pathname]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (!isHome && href.startsWith('/#')) {
      const id = href.replace('/#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-sm border-b border-gray-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">i</span>
            </div>
            <span className="font-semibold text-lg tracking-tight text-primary">{config.siteName}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${config.phone.replace(/\s/g, '').replace(/[()-]/g, '')}`}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" />
              {config.phone}
            </a>
            <Link
              to="/#contacts"
              onClick={() => handleNavClick('/#contacts')}
              className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors"
            >
              Записаться
            </Link>
            <Link
              to="/admin"
              className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
              title="Админ-панель"
            >
              <Settings className="w-4 h-4 text-gray-600" />
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-gray-100 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto section-padding py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-3">
                <a
                  href={`tel:${config.phone.replace(/\s/g, '').replace(/[()-]/g, '')}`}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  <Phone className="w-4 h-4" />
                  {config.phone}
                </a>
                <Link
                  to="/#contacts"
                  onClick={() => handleNavClick('/#contacts')}
                  className="mx-4 px-5 py-3 bg-primary text-white text-sm font-medium rounded-xl text-center"
                >
                  Записаться на ремонт
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="mx-4 px-5 py-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl text-center flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Админ-панель
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
