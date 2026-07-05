import { useTranslation } from 'react-i18next';

export default function AdBanner({ className = '' }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <div className={`w-full bg-bg-elevated/50 border border-border-subtle border-dashed rounded-2xl flex flex-col items-center justify-center py-6 px-4 text-text-faint my-6 ${className}`}>
      <span className="text-[10px] uppercase tracking-widest mb-1 bg-bg-surface px-2 py-0.5 rounded-full border border-border-subtle">
        Reklam Alanı
      </span>
      <span className="text-sm">Google AdSense / Unity Ads Placeholder</span>
    </div>
  );
}
