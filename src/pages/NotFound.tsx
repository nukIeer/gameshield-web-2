import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <Gamepad2 className="w-24 h-24 text-accent-green mb-6 opacity-50" />
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl text-text-secondary mb-8">Aradığınız oyun veya sayfa bulunamadı.</p>
      <Link 
        to="/"
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent-green text-bg-base font-bold hover:bg-accent-green-dark transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Ana Sayfaya Dön
      </Link>
    </motion.div>
  );
}
