import { Shield, Zap, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ShieldBanner() {
  return (
    <Link to="/shield" className="block w-full rounded-[2rem] overflow-hidden relative group my-8 bg-bg-surface/60 backdrop-blur-xl border border-accent-green/40 hover:border-accent-green/80 transition-all duration-500 hover:shadow-[0_0_60px_rgba(34,197,94,0.25)]">
      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-green/10 via-transparent to-accent-green/10 opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
      
      {/* Shine effect */}
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine"></div>

      <div className="relative p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 z-10 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
          <div className="w-20 h-20 shrink-0 rounded-3xl bg-gradient-to-br from-bg-elevated to-bg-base border border-accent-green/50 flex items-center justify-center shadow-[inset_0_0_20px_rgba(34,197,94,0.1)] group-hover:scale-110 transition-transform duration-500">
            <Shield className="w-10 h-10 text-accent-green" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center sm:justify-start gap-3 mb-2">
              Best Games Shield <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)] animate-pulse" />
            </h3>
            <p className="text-base text-text-secondary max-w-md">
              Oyunlarınızı hızlandırın, ping'i düşürün ve cihazınızı koruyun! %100 Ücretsiz oyun asistanı.
            </p>
          </div>
        </div>
        <div className="shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
          <div className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-accent-green text-bg-base font-bold text-lg group-hover:bg-accent-green-dark group-hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            <Download className="w-6 h-6" />
            <span>Hemen İndir</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
