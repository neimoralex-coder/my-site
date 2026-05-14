import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Phone } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MessengerModal({ open, onClose }: Props) {
  const { config } = useAdmin();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              <h3 className="text-xl font-bold text-primary mb-2">Записаться на ремонт</h3>
              <p className="text-sm text-gray-500 mb-6">
                Выберите удобный для вас способ связи
              </p>

              <div className="space-y-3">
                {config.messengers.map((messenger) => (
                  <a
                    key={messenger.id}
                    href={messenger.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="flex items-center gap-4 p-4 bg-warm rounded-2xl hover:bg-accent-light transition-colors group"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      {messenger.id === 'telegram' ? (
                        <Send className="w-6 h-6 text-accent" />
                      ) : messenger.id === 'whatsapp' ? (
                        <MessageCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <Phone className="w-6 h-6 text-accent" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-primary">{messenger.name}</p>
                      <p className="text-xs text-gray-500">Написать в {messenger.name}</p>
                    </div>
                  </a>
                ))}

                <a
                  href={`tel:${config.phone.replace(/\s/g, '').replace(/[()-]/g, '')}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-4 bg-primary rounded-2xl hover:bg-gray-800 transition-colors group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Позвонить</p>
                    <p className="text-xs text-gray-300">{config.phone}</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
