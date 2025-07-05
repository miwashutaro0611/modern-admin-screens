
import { ReactNode } from 'react';
import CMSSidebar from './CMSSidebar';

interface CMSLayoutProps {
  children: ReactNode;
  title?: string;
}

const CMSLayout = ({ children, title }: CMSLayoutProps) => {
  return (
    <div className="cms-container">
      <div className="flex h-screen">
        <CMSSidebar />
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4 ml-0 lg:ml-0">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white ml-12 lg:ml-0">
                {title || 'CMS管理画面'}
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date().toLocaleDateString('ja-JP')}
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-6 cms-fade-in">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CMSLayout;
