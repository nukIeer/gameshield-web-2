import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Star, Download, LayoutGrid, List as ListIcon, ChevronDown, Loader2, Gamepad2, Bookmark } from 'lucide-react';
import { useGames } from '../hooks/useGames';
import { useSavedGames } from '../hooks/useSavedGames';
import { Game } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import AdBanner from '../components/AdBanner';

import ShieldBanner from '../components/ShieldBanner';

type Tab = 'all' | 'top_sellers' | 'most_played' | 'new_releases' | 'saved';
type ViewType = 'list' | 'grid';
type SortType = 'default' | 'rating' | 'name';

function GameCardSkeleton({ view }: { view: ViewType; key?: React.Key }) {
  if (view === 'grid') {
    return (
      <div className="p-4 rounded-2xl bg-bg-surface border border-border-subtle space-y-4 animate-pulse">
        <div className="aspect-[4/3] rounded-xl bg-bg-elevated w-full" />
        <div className="space-y-2">
          <div className="h-5 bg-bg-elevated rounded w-3/4" />
          <div className="h-4 bg-bg-elevated rounded w-1/2" />
        </div>
        <div className="h-10 bg-bg-elevated rounded-xl w-full" />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-bg-surface border border-border-subtle animate-pulse">
      <div className="w-6 h-6 bg-bg-elevated rounded shrink-0" />
      <div className="w-16 h-16 rounded-xl bg-bg-elevated shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-bg-elevated rounded w-1/3" />
        <div className="h-4 bg-bg-elevated rounded w-1/4" />
      </div>
      <div className="w-24 h-10 rounded-full bg-bg-elevated shrink-0 hidden sm:block" />
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const { data, loading, error } = useGames();
  const { savedGames, toggleSave, isSaved } = useSavedGames();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [viewType, setViewType] = useState<ViewType>('list');
  const [sortBy, setSortBy] = useState<SortType>('default');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isOfflineOnly, setIsOfflineOnly] = useState(false);

  const categories = [
    { id: 'all', label: 'Tümü' },
    { id: 'action', label: 'Aksiyon' },
    { id: 'rpg', label: 'RPG' },
    { id: 'strategy', label: 'Strateji' },
    { id: 'casual', label: 'Basit Eğlence' }
  ];

  const games = data?.games || [];

  const filteredGames = useMemo(() => {
    let result = [...games];
    
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.title?.toLowerCase().includes(lowerQuery) ||
          g.package?.toLowerCase().includes(lowerQuery) ||
          g.description?.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Pseudo-filtering for categories & offline (UI presentation)
    if (selectedCategory !== 'all') {
      const catIndex = categories.findIndex(c => c.id === selectedCategory);
      result = result.filter((g, i) => (g.title.length + i) % categories.length === catIndex);
    }

    if (isOfflineOnly) {
      result = result.filter((g, i) => i % 2 === 0);
    }

    if (activeTab === 'saved') {
      result = result.filter(g => savedGames.includes(g.id));
    }
    
    if (sortBy === 'rating') {
      result.sort((a, b) => {
        const ra = parseFloat(String(a.details?.rating || 0));
        const rb = parseFloat(String(b.details?.rating || 0));
        return rb - ra;
      });
    } else if (sortBy === 'name') {
      result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }

    return result;
  }, [games, searchQuery, sortBy]);

  const featuredGame = filteredGames[0];
  const listGames = filteredGames;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Hero & Search Header */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{t('home.title')}</h1>
          <p className="text-text-secondary">{t('home.subtitle')}</p>
        </div>
        
        <div className="relative max-w-xl group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-faint group-focus-within:text-accent-green transition-colors" />
          <input
            type="text"
            placeholder={t('nav.search_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg-elevated border border-border-subtle rounded-xl py-3 pl-11 pr-4 text-text-primary placeholder:text-text-faint focus:outline-none focus:border-accent-green focus:ring-1 focus:ring-accent-green transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Featured Hero */}
      {!loading && featuredGame && !searchQuery && (
        <Link to={`/game/${featuredGame.id}`} className="block group">
          <div className="relative rounded-2xl overflow-hidden aspect-[21/9] sm:aspect-[21/8] bg-bg-elevated border border-border-subtle shadow-xl">
            {featuredGame.media?.bannerUrl ? (
              <img
                src={featuredGame.media.bannerUrl}
                alt={featuredGame.title || 'Featured game banner'}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-bg-elevated to-bg-surface" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E11] via-[#0C0E11]/80 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex items-end justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-4xl font-bold text-white group-hover:text-accent-green transition-colors">
                  {featuredGame.title || 'Unknown Game'}
                </h2>
                <div className="flex items-center gap-3 text-sm text-text-silver">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-accent-green fill-accent-green" />
                    {featuredGame.details?.rating || '0.0'}
                  </span>
                  <span>•</span>
                  <span>{featuredGame.details?.downloads || 'Unknown'} {t('game_card.downloads')}</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-accent-green text-[#0C0E11] group-hover:bg-accent-green-dark transition-colors shrink-0 shadow-lg shadow-accent-green/20">
                <Download className="w-6 h-6" />
              </div>
            </div>
          </div>
        </Link>
      )}

      <ShieldBanner />

      {/* Filters and View Controls */}
      <div className="flex flex-col gap-4 border-b border-border-subtle pb-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Tabs */}
          <div className="flex sm:flex-wrap overflow-x-auto w-full sm:w-auto scrollbar-hide gap-2 snap-x snap-mandatory pb-2 sm:pb-0">
            {(['all', 'top_sellers', 'most_played', 'new_releases', 'saved'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border snap-start",
                  activeTab === tab
                    ? "bg-text-primary text-bg-base border-text-primary"
                    : "bg-transparent text-text-secondary border-border-subtle hover:bg-bg-elevated hover:text-text-primary"
                )}
              >
                {t(`home.tabs.${tab}`)}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <div className="relative group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortType)}
                className="appearance-none bg-bg-elevated border border-border-subtle rounded-lg py-2 pl-3 pr-8 text-sm text-text-primary focus:outline-none focus:border-accent-green cursor-pointer"
              >
                <option value="default">Varsayılan / Default</option>
                <option value="rating">Puan / Rating</option>
                <option value="name">İsim / Name (A-Z)</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
            </div>

            <div className="flex bg-bg-elevated rounded-lg p-1 border border-border-subtle">
              <button
                onClick={() => setViewType('list')}
                className={cn("p-1.5 rounded-md transition-colors", viewType === 'list' ? 'bg-bg-surface text-accent-green shadow-sm' : 'text-text-secondary hover:text-text-primary')}
              >
                <ListIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewType('grid')}
                className={cn("p-1.5 rounded-md transition-colors", viewType === 'grid' ? 'bg-bg-surface text-accent-green shadow-sm' : 'text-text-secondary hover:text-text-primary')}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories & Tags */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
          <div className="flex sm:flex-wrap overflow-x-auto w-full sm:w-auto scrollbar-hide gap-2 pb-2 sm:pb-0 snap-x snap-mandatory">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border snap-start",
                  selectedCategory === cat.id
                    ? "bg-accent-green/10 text-accent-green border-accent-green/30"
                    : "bg-transparent text-text-secondary border-border-subtle hover:bg-bg-elevated hover:text-text-primary"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="hidden sm:block w-px h-6 bg-border-subtle" />
          <button
            onClick={() => setIsOfflineOnly(!isOfflineOnly)}
            className={cn(
              "whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
              isOfflineOnly
                ? "bg-accent-green text-bg-base border-accent-green"
                : "bg-bg-elevated text-text-secondary border-border-subtle hover:bg-bg-surface hover:text-text-primary"
            )}
          >
            Sadece Offline (Offline Only)
          </button>
        </div>
      </div>

      {/* List/Grid Content */}
      {loading ? (
        <div className={cn(
          viewType === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-4'
        )}>
          {[1, 2, 3, 4, 5, 6].map(i => <GameCardSkeleton key={i} view={viewType} />)}
        </div>
      ) : listGames.length === 0 ? (
        <div className="py-20 text-center text-text-faint bg-bg-surface rounded-2xl border border-border-subtle border-dashed">
          <Gamepad2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
          {t('home.no_games')}
        </div>
      ) : (
        <div className={cn(
          viewType === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-4'
        )}>
          <AnimatePresence>
            {listGames.map((game, index) => (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: viewType === 'grid' ? (index % 10) * 0.05 : 0 }}
                key={game.id}
              >
                <Link
                  to={`/game/${game.id}`}
                  className={cn(
                    "group flex bg-bg-surface/40 backdrop-blur-md border border-white/5 hover:border-accent-green/30 transition-all duration-300 relative overflow-hidden",
                    viewType === 'grid' ? "flex-col p-4 rounded-2xl hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]" : "items-center gap-4 p-4 rounded-2xl hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                  )}
                >
                  {/* Ripple effect overlay */}
                  <div className="absolute inset-0 bg-accent-green/0 group-active:bg-accent-green/5 transition-colors duration-200" />
                  
                  {viewType === 'list' && (
                    <div className={cn(
                      "w-6 text-center font-bold text-lg hidden sm:block",
                      index < 3 && sortBy === 'default' && !searchQuery ? "text-accent-green" : "text-text-faint"
                    )}>
                      {sortBy === 'default' && !searchQuery ? index + 1 : '-'}
                    </div>
                  )}
                  
                  <div className={cn(
                    "overflow-hidden bg-bg-elevated shrink-0 transition-transform duration-300 group-hover:scale-105",
                    viewType === 'grid' ? "w-full aspect-[4/3] rounded-xl mb-4" : "w-16 h-16 rounded-xl"
                  )}>
                    {game.media?.iconUrl ? (
                      <img src={viewType === 'grid' && game.media.bannerUrl ? game.media.bannerUrl : game.media.iconUrl} alt={game.title} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-border-subtle to-bg-elevated flex items-center justify-center">
                        <Gamepad2 className="w-8 h-8 text-text-faint opacity-50" />
                      </div>
                    )}
                  </div>

                  <div className={cn("flex-1 min-w-0", viewType === 'grid' && "w-full text-center")}>
                    <div className={cn("flex items-center gap-2 mb-1", viewType === 'grid' && "justify-center")}>
                      <h3 className="font-bold text-base truncate group-hover:text-accent-green transition-colors">
                        {game.title || 'Unknown Game'}
                      </h3>
                      {viewType === 'list' && index < 3 && sortBy === 'default' && !searchQuery && activeTab !== 'saved' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold border border-accent-green/30 text-accent-green shrink-0">
                          Top #{index + 1}
                        </span>
                      )}
                    </div>
                    
                    <div className={cn("flex items-center gap-3 text-xs text-text-secondary", viewType === 'grid' && "justify-center")}>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-accent-green fill-accent-green" />
                        {game.details?.rating || '0.0'}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border-strong" />
                      <span className="truncate">{game.details?.size || 'Unknown'}</span>
                      {viewType === 'list' && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-border-strong hidden sm:block" />
                          <span className="truncate hidden sm:block">{game.details?.downloads || 'Unknown'} {t('game_card.downloads')}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className={cn("shrink-0", viewType === 'grid' ? "w-full mt-4 flex items-center gap-2" : "pl-4 flex items-center gap-3")}>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSave(game.id);
                      }}
                      className={cn(
                        "p-2 rounded-full border transition-all hover:scale-110",
                        isSaved(game.id)
                          ? "bg-accent-green/10 border-accent-green text-accent-green"
                          : "bg-bg-elevated border-border-subtle text-text-faint hover:text-text-primary"
                      )}
                    >
                      <Bookmark className={cn("w-4 h-4", isSaved(game.id) && "fill-accent-green")} />
                    </button>
                    <div className={cn(
                      "rounded-full bg-accent-green text-bg-base font-bold group-hover:bg-accent-green-dark transition-all flex items-center justify-center gap-2 shadow-sm group-hover:shadow-accent-green/20",
                      viewType === 'grid' ? "flex-1 py-2.5" : "px-4 py-1.5 text-sm group-active:scale-95"
                    )}>
                      {viewType === 'grid' && <Download className="w-4 h-4" />}
                      {t('game_card.download')}
                    </div>
                  </div>
                </Link>
                {viewType === 'list' && index < listGames.length - 1 && (
                  <div className="h-px bg-border-subtle/50 ml-14 mr-4 mt-4 hidden sm:block" />
                )}
                {index === 3 && activeTab === 'all' && (
                  <AdBanner className="mx-4 mt-4" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
