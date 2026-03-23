import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { DeviceMonitoringPage } from './pages/DeviceMonitoringPage';
import { AlertsPage } from './pages/AlertsPage';
import { ReportsPage } from './pages/ReportsPage';
import { BranchMonitoringPage } from './pages/BranchMonitoringPage';
import { SettingsPage } from './pages/SettingsPage';
import { Sidebar, PageType } from './components/Sidebar';
export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'devices':
        return <DeviceMonitoringPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'branches':
        return <BranchMonitoringPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#060b1d] via-[#0a1128] to-[#0f1535] text-slate-100 flex relative overflow-hidden">
      {/* Global Background Orbs for the liquid glass feel */}
      <div className="bg-orb-1"></div>
      <div className="bg-orb-2"></div>

      {/* Sidebar */}
      <Sidebar
        activePage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout} />
      

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -10
            }}
            transition={{
              duration: 0.3
            }}>
            
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>);

}