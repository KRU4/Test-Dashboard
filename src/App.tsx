import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { MobileMenu } from './components/layout/MobileMenu';
import { AssistantChat } from './components/Assistant/AssistantChat';
import { WebhooksPage } from './pages/WebhooksPage';
import { AboutCompanyPage } from './pages/AboutCompanyPage';
import { ServicesPage } from './pages/ServicesPage';
import { DataUploadPage } from './pages/DataUploadPage';
import { useLanguage } from './hooks/useLanguage';
import './App.css';

const AppContent: React.FC = () => {
  const [activePage, setActivePage] = useState('webhooks');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language } = useLanguage();

  const renderPage = () => {
    switch (activePage) {
      case 'webhooks':
        return <WebhooksPage />;
      case 'about':
        return <AboutCompanyPage />;
      case 'services':
        return <ServicesPage />;
      case 'data':
        return <DataUploadPage />;
      default:
        return <WebhooksPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1a1a1a]">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activePage={activePage}
        onNavigate={setActivePage}
      />
      <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />
      <main
        className={`
          pt-16 transition-all duration-300
          ${language === 'ar' ? 'md:mr-64' : 'md:ml-64'}
        `}
      >
        {renderPage()}
      </main>
      <AssistantChat />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
