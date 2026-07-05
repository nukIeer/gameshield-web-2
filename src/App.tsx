import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PWAPrompt from './components/PWAPrompt';
import { Loader2 } from 'lucide-react';

const Home = React.lazy(() => import('./pages/Home'));
const GameDetail = React.lazy(() => import('./pages/GameDetail'));
const LegalPage = React.lazy(() => import('./pages/LegalPage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const ShieldPage = React.lazy(() => import('./pages/Shield'));

function Fallback() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-accent-green" />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="game/:slug" element={<GameDetail />} />
            <Route path="shield" element={<ShieldPage />} />
            <Route path="privacy" element={<LegalPage type="privacy" />} />
            <Route path="terms" element={<LegalPage type="terms" />} />
            <Route path="kvkk" element={<LegalPage type="kvkk" />} />
            <Route path="dmca" element={<LegalPage type="dmca" />} />
            <Route path="about" element={<LegalPage type="about" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <PWAPrompt />
    </>
  );
}
