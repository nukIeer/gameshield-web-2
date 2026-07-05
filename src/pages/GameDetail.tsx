import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, Download, ChevronRight, Info, FileText, Smartphone, Home, Gamepad2, Loader2, Bookmark, X, ChevronLeft } from 'lucide-react';
import { useGames } from '../hooks/useGames';
import { useSavedGames } from '../hooks/useSavedGames';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import AdBanner from '../components/AdBanner';

export default function GameDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { data, loading, error } = useGames();
  const { savedGames, toggleSave, isSaved } = useSavedGames();
  
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [downloadUrl, setDownloadUrl] = useState('');
  
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const game = data?.games?.find(g => g.id === slug || g.package === slug);

  useEffect(() => {
    if (showDownloadModal && countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (showDownloadModal && countdown === 0 && downloadUrl) {
      window.location.href = downloadUrl;
      const hideTimer = setTimeout(() => setShowDownloadModal(false), 1500);
      return () => clearTimeout(hideTimer);
    }
  }, [showDownloadModal, countdown, downloadUrl]);

  const handleDownloadClick = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
    e.preventDefault();
    setDownloadUrl(url);
    setCountdown(3);
    setShowDownloadModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="w-12 h-12 text-accent-green animate-spin" />
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="py-20 text-center">
        <p className="text-text-faint">{game ? 'Error' : 'Game not found'}</p>
        <Link to="/" className="text-accent-green hover:underline mt-4 inline-block">
          Return home
        </Link>
      </div>
    );
  }

  const hasDownloadLinks = game.downloadLinks?.apk1 || game.downloadLinks?.apk2 || game.downloadLinks?.mirrors?.length || game.downloadLinks?.playStoreUrl || game.downloadLinks?.galaxyStoreUrl;
  const directDownloadUrl = `/api/download/${game.id}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-text-secondary overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
        <Link to="/" className="hover:text-accent-green flex items-center gap-1 transition-colors">
          <Home className="w-4 h-4" />
          {t('nav.home')}
        </Link>
        <ChevronRight className="w-4 h-4 text-text-faint shrink-0" />
        <span className="text-text-faint">Games</span>
        <ChevronRight className="w-4 h-4 text-text-faint shrink-0" />
        <span className="text-text-primary font-medium truncate">{game.title}</span>
      </nav>

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-bg-elevated border border-border-subtle aspect-[21/9] sm:aspect-[21/8] shadow-2xl">
        {game.media?.bannerUrl ? (
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={game.media.bannerUrl} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover opacity-60" 
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-bg-elevated to-bg-surface" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/80 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-end gap-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-bg-elevated border border-border-subtle shadow-2xl shrink-0"
          >
            {game.media?.iconUrl ? (
              <img src={game.media.iconUrl} alt={game.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-border-subtle to-bg-elevated flex items-center justify-center">
                 <Gamepad2 className="w-10 h-10 text-text-faint" />
              </div>
            )}
          </motion.div>
          
          <motion.div 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.3 }}
            className="flex-1 space-y-2"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{game.title || 'Unknown'}</h1>
            <p className="text-text-secondary font-mono text-sm opacity-80">{game.package}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2 text-accent-green font-bold bg-accent-green/10 px-3 py-1.5 rounded-xl border border-accent-green/20 backdrop-blur-sm">
                <Star className="w-5 h-5 fill-accent-green drop-shadow-md" />
                <span className="text-xl">{game.details?.rating || '0.0'}</span>
              </div>
              <button
                onClick={() => toggleSave(game.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all shadow-lg",
                  isSaved(game.id)
                    ? "bg-accent-green text-bg-base"
                    : "bg-bg-surface/50 border border-border-subtle text-white hover:bg-bg-elevated backdrop-blur-sm"
                )}
              >
                <Bookmark className={cn("w-5 h-5", isSaved(game.id) && "fill-current")} />
                <span className="hidden sm:inline">{isSaved(game.id) ? 'Kaydedildi' : 'Kaydet'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
        <div className="space-y-8">
          {/* Screenshots */}
          {game.media?.screenshots && game.media.screenshots.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-xl font-bold">{t('game_detail.screenshots')}</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                {game.media.screenshots.map((src, i) => (
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    key={i} 
                    onClick={() => setSelectedImageIndex(i)}
                    className="shrink-0 w-64 sm:w-72 rounded-2xl overflow-hidden bg-bg-elevated border border-border-subtle snap-center shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-green cursor-zoom-in"
                  >
                    <img src={src} alt={`Screenshot ${i+1}`} className="w-full h-auto object-cover" loading="lazy" />
                  </motion.button>
                ))}
              </div>
            </section>
          )}

          <AdBanner />

          {/* Description */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold">{t('game_detail.description')}</h3>
            <div className="text-text-secondary leading-relaxed whitespace-pre-wrap text-sm bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm">
              {game.description || t('game_detail.no_description')}
            </div>
          </section>

          {/* What's New */}
          {game.whatsNew && (
            <section className="space-y-4 p-6 rounded-2xl bg-bg-surface border border-border-subtle shadow-sm">
              <h3 className="text-lg font-bold text-accent-green flex items-center gap-2">
                <Info className="w-5 h-5" />
                {t('game_detail.whats_new')}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">{game.whatsNew}</p>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Download Actions */}
          <div className="fixed bottom-0 left-0 right-0 z-50 sm:static sm:z-auto p-4 sm:p-6 rounded-t-3xl sm:rounded-3xl bg-bg-surface/90 sm:bg-bg-surface backdrop-blur-xl sm:backdrop-blur-none border-t sm:border border-border-subtle shadow-[0_-8px_30px_rgba(0,0,0,0.5)] sm:shadow-sm space-y-4">
            {hasDownloadLinks ? (
              <>
                <button
                  onClick={(e) => handleDownloadClick(e, directDownloadUrl)}
                  className="relative overflow-hidden w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-accent-green hover:bg-accent-green-dark text-bg-base font-bold text-lg transition-all active:scale-95 shadow-lg shadow-accent-green/20 group"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-2xl" />
                  <Download className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">{t('game_detail.direct_download')}</span>
                </button>
                
                {game.downloadLinks?.playStoreUrl && (
                  <a
                    href={game.downloadLinks.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-bg-elevated hover:bg-border-subtle text-text-primary font-medium transition-all active:scale-95 border border-border-subtle hover:border-text-faint"
                  >
                    {t('game_detail.google_play')}
                  </a>
                )}
              </>
            ) : (
              <button disabled className="w-full py-4 rounded-xl bg-bg-elevated text-text-faint font-bold cursor-not-allowed">
                {t('game_detail.unavailable')}
              </button>
            )}
          </div>

          {/* Meta Tiles */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-bg-surface border border-border-subtle hover:border-border-strong transition-colors">
              <div className="text-text-faint text-xs mb-1 flex items-center gap-1">
                <Download className="w-3 h-3" /> {t('game_detail.downloads')}
              </div>
              <div className="font-bold text-text-primary">{game.details?.downloads || t('game_detail.unknown')}</div>
            </div>
            <div className="p-4 rounded-2xl bg-bg-surface border border-border-subtle hover:border-border-strong transition-colors">
              <div className="text-text-faint text-xs mb-1 flex items-center gap-1">
                <FileText className="w-3 h-3" /> {t('game_detail.size')}
              </div>
              <div className="font-bold text-text-primary">{game.details?.size || t('game_detail.unknown')}</div>
            </div>
            <div className="p-4 rounded-2xl bg-bg-surface border border-border-subtle hover:border-border-strong transition-colors">
              <div className="text-text-faint text-xs mb-1 flex items-center gap-1">
                <Info className="w-3 h-3" /> {t('game_detail.version')}
              </div>
              <div className="font-bold text-text-primary truncate">{game.details?.version || t('game_detail.unknown')}</div>
            </div>
            <div className="p-4 rounded-2xl bg-bg-surface border border-border-subtle hover:border-border-strong transition-colors">
              <div className="text-text-faint text-xs mb-1 flex items-center gap-1">
                <Smartphone className="w-3 h-3" /> {t('game_detail.android_version')}
              </div>
              <div className="font-bold text-text-primary">{game.details?.androidVersion || t('game_detail.unknown')}</div>
            </div>
            <div className="col-span-2 p-4 rounded-2xl bg-bg-surface border border-border-subtle hover:border-border-strong transition-colors">
              <div className="text-text-faint text-xs mb-1">{t('game_detail.age_rating')}</div>
              <div className="font-bold text-text-primary">{game.details?.ageRating || t('game_detail.unknown')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Progress Modal */}
      <AnimatePresence>
        {showDownloadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-bg-surface border border-border-strong p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-accent-green/10 flex items-center justify-center mb-6">
                <Download className="w-10 h-10 text-accent-green animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-text-primary">İndirmeniz Başlıyor</h3>
              <p className="text-text-secondary mb-6">Lütfen bekleyin, yönlendiriliyorsunuz...</p>
              
              <div className="text-5xl font-bold text-accent-green tabular-nums">
                {countdown}
              </div>
              
              {countdown === 0 && (
                <div className="mt-4 text-sm text-text-faint animate-pulse">
                  Yönlendiriliyor...
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox for Screenshots */}
      <AnimatePresence>
        {selectedImageIndex !== null && game.media?.screenshots && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImageIndex(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-zoom-out"
            />
            
            <button 
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {selectedImageIndex > 0 && (
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(selectedImageIndex - 1); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            {selectedImageIndex < game.media.screenshots.length - 1 && (
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(selectedImageIndex + 1); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            <motion.img
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={game.media.screenshots[selectedImageIndex]}
              alt={`Screenshot ${selectedImageIndex + 1}`}
              className="relative z-[5] max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-black/50 text-white text-sm font-medium backdrop-blur-md">
              {selectedImageIndex + 1} / {game.media.screenshots.length}
            </div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
