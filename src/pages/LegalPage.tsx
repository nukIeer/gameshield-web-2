import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

export default function LegalPage({ type }: { type: 'privacy' | 'terms' | 'kvkk' | 'dmca' | 'about' }) {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-8"
    >
      <div className="p-8 rounded-3xl bg-bg-surface border border-border-subtle shadow-xl">
        <h1 className="text-3xl font-bold mb-8 text-text-primary">
          {t(`legal.${type}_title`)}
        </h1>
        <div className="prose prose-invert prose-green max-w-none text-text-secondary">
          <p className="leading-relaxed">
            {t(`legal.${type}_content`)}
          </p>
          {type === 'dmca' && (
            <div className="mt-8 p-4 rounded-xl bg-bg-elevated border border-border-subtle">
              <p className="text-sm font-mono text-text-primary">Contact / İletişim: dmca@gamemarket.example.com</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
