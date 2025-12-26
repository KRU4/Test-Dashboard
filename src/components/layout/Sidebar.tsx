import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const { t, language } = useLanguage();

  const menuItems = [
    { id: 'webhooks', label: t('webhooks'), icon: '🔗' },
    { id: 'about', label: t('aboutCompany'), icon: '🏢' },
    { id: 'services', label: t('services'), icon: '⚙️' },
    { id: 'data', label: t('data'), icon: '📊' },
  ];

  return (
    <aside
      className={`
        fixed top-0 h-full w-64
        bg-white dark:bg-[#2d2d2d]
        border-r border-gray-200 dark:border-gray-700
        z-40 transition-transform duration-300
        ${language === 'ar' ? 'right-0' : 'left-0'}
        hidden md:block
      `}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Dashboard
        </h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg
                transition-colors text-left
                ${
                  activePage === item.id
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

