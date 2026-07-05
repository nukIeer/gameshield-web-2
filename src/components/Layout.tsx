import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Gamepad2, Globe, Menu, X, Home, Info, Shield, FileText, ChevronRight, WifiOff } from 'lucide-react';
import { cn } from '../lib/utils';
import ScrollToTopButton from './ScrollToTopButton';
import { motion, AnimatePresence } from 'motion/react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export default function Layout() {
  const { t, i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isOnline = useOnlineStatus();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'tr' ? 'en' : 'tr');
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-bg-base text-text-primary font-sans selection:bg-accent-green/30 pb-32 sm:pb-0 relative overflow-hidden">
      {/* Ambient background blur elements */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-accent-green/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-green/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="relative z-10 flex flex-col min-h-screen">
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-red-500/90 backdrop-blur-md text-white overflow-hidden border-b border-red-400/50"
          >
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium">
              <WifiOff className="w-4 h-4" />
              <span>İnternet bağlantınız koptu. Bazı özellikler kullanılamayabilir.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <header className="sticky top-0 z-40 bg-bg-surface/50 backdrop-blur-2xl border-b border-white/5 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-text-secondary hover:text-text-primary sm:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="flex items-center gap-2 text-accent-green hover:text-accent-green-dark transition-colors group">
              <Gamepad2 className="w-8 h-8 transform group-hover:rotate-12 transition-transform" />
              <span className="font-bold text-xl tracking-tight text-text-primary hidden sm:inline-block">Best Games & Shield</span>
              <span className="font-bold text-xl tracking-tight text-text-primary sm:hidden">BG&S</span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-text-secondary">
              <Link to="/" className={cn("hover:text-accent-green transition-colors", location.pathname === '/' && "text-accent-green")}>{t('nav.home')}</Link>
              <Link to="/shield" className={cn("flex items-center gap-1.5 hover:text-accent-green transition-colors", location.pathname === '/shield' && "text-accent-green")}>
                <Shield className="w-4 h-4" />
                Shield App
              </Link>
              <Link to="/about" className={cn("hover:text-accent-green transition-colors", location.pathname === '/about' && "text-accent-green")}>{t('footer.about')}</Link>
            </nav>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-elevated hover:bg-border-subtle transition-colors text-sm font-medium border border-border-subtle"
            >
              <Globe className="w-4 h-4 text-accent-green" />
              <span className="uppercase">{i18n.language}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 sm:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-bg-surface border-r border-border-subtle z-50 sm:hidden flex flex-col"
            >
              <div className="p-4 border-b border-border-subtle flex items-center justify-between">
                <div className="flex items-center gap-2 text-accent-green">
                  <Gamepad2 className="w-6 h-6" />
                  <span className="font-bold text-lg text-text-primary">BG&S</span>
                </div>
                <button onClick={closeSidebar} className="p-2 text-text-secondary hover:text-text-primary">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                <Link onClick={closeSidebar} to="/" className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-bg-elevated transition-colors">
                  <Home className="w-5 h-5 text-accent-green" />
                  <span className="font-medium">{t('nav.home')}</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-text-faint" />
                </Link>
                <Link onClick={closeSidebar} to="/shield" className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-bg-elevated transition-colors bg-accent-green/5 border border-accent-green/20 my-2">
                  <Shield className="w-5 h-5 text-accent-green" />
                  <span className="font-medium text-accent-green">Shield App İndir</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-accent-green" />
                </Link>
                <div className="my-4 border-t border-border-subtle" />
                <div className="px-4 py-2 text-xs font-bold text-text-faint uppercase tracking-wider">Yasal / Legal</div>
                <Link onClick={closeSidebar} to="/about" className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-bg-elevated transition-colors text-text-secondary">
                  <Info className="w-5 h-5" />
                  <span className="font-medium">{t('footer.about')}</span>
                </Link>
                <Link onClick={closeSidebar} to="/privacy" className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-bg-elevated transition-colors text-text-secondary">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">{t('footer.privacy')}</span>
                </Link>
                <Link onClick={closeSidebar} to="/terms" className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-bg-elevated transition-colors text-text-secondary">
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">{t('footer.terms')}</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>

      <footer className="bg-bg-surface border-t border-border-subtle mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center md:justify-start text-sm text-text-secondary mb-8">
            <Link to="/privacy" className="hover:text-accent-green transition-colors">{t('footer.privacy')}</Link>
            <Link to="/terms" className="hover:text-accent-green transition-colors">{t('footer.terms')}</Link>
            <Link to="/kvkk" className="hover:text-accent-green transition-colors">{t('footer.kvkk')}</Link>
            <Link to="/dmca" className="hover:text-accent-green transition-colors">{t('footer.dmca')}</Link>
            <Link to="/about" className="hover:text-accent-green transition-colors">{t('footer.about')}</Link>
          </div>
          <p className="text-xs text-text-faint text-center md:text-left max-w-2xl">
            {t('footer.disclaimer')}
          </p>
        </div>
      </footer>
      <ScrollToTopButton />
      </div>
    </div>
  );
}
