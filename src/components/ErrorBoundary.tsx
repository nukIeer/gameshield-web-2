import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Gamepad2, RefreshCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col bg-bg-base text-text-primary font-sans items-center justify-center p-4 text-center">
          <Gamepad2 className="w-24 h-24 text-red-500 mb-6 opacity-50" />
          <h1 className="text-3xl font-bold mb-4">Bir Şeyler Ters Gitti</h1>
          <p className="text-text-secondary mb-8 max-w-md">Beklenmeyen bir hata oluştu. Lütfen sayfayı yenilemeyi deneyin veya daha sonra tekrar dönün.</p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent-green text-bg-base font-bold hover:bg-accent-green-dark transition-colors"
          >
            <RefreshCcw className="w-5 h-5" />
            Sayfayı Yenile
          </button>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
