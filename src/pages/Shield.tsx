import { motion } from 'motion/react';
import { Shield, Zap, Globe, Smartphone, Download, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ShieldPage() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto space-y-12 py-8"
    >
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-bg-elevated border border-border-subtle p-8 sm:p-12 text-center shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-green/20 to-transparent opacity-50" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-bg-surface rounded-3xl border border-border-subtle shadow-xl flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-accent-green" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">Best Games & Shield</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Oyun deneyiminizi zirveye taşıyan resmi uygulamamız! Sadece oyun indirmekle kalmayın, cihazınızı oyunlar için optimize edin, bağlantınızı hızlandırın.
          </p>
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-accent-green text-bg-base font-bold text-lg hover:bg-accent-green-dark transition-all hover:scale-105 shadow-lg shadow-accent-green/20"
          >
            <Download className="w-6 h-6" />
            Google Play'den İndir
          </a>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl bg-bg-surface border border-border-subtle hover:border-accent-green/50 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-accent-green/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6 text-accent-green" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-text-primary">Oyun Hızlandırma (Game Booster)</h3>
          <p className="text-text-secondary leading-relaxed">
            Arka plan uygulamalarını uyutarak ve RAM'i temizleyerek oyunlarda maksimum FPS ve akıcılık sağlayın. Cihazınızın tüm gücünü oyunlara odaklayın.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-bg-surface border border-border-subtle hover:border-accent-green/50 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-accent-green/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Globe className="w-6 h-6 text-accent-green" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-text-primary">DNS Değiştirici (DNS Changer)</h3>
          <p className="text-text-secondary leading-relaxed">
            Gecikmeyi (ping) düşürmek ve bağlantı engellerini aşmak için tek tıkla en hızlı oyun DNS sunucularına bağlanın. Kesintisiz çok oyunculu deneyim.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-bg-surface border border-border-subtle hover:border-accent-green/50 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-accent-green/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Shield className="w-6 h-6 text-accent-green" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-text-primary">Güvenlik ve Koruma</h3>
          <p className="text-text-secondary leading-relaxed">
            İndirdiğiniz oyun paketlerini zararlı yazılımlara karşı otomatik tarar. Cihazınızı her zaman güvende tutarak riskleri minimuma indirir.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-bg-surface border border-border-subtle hover:border-accent-green/50 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-accent-green/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Smartphone className="w-6 h-6 text-accent-green" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-text-primary">Tek Tuşla Yönetim</h3>
          <p className="text-text-secondary leading-relaxed">
            Tüm oyun kütüphanenizi tek bir yerden yönetin, güncellemeleri anında görün ve favori oyunlarınıza anında erişin.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
