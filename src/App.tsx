import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { DeviceMonitoringPage } from './pages/DeviceMonitoringPage';
import { AlertsPage } from './pages/AlertsPage';
import { ReportsPage } from './pages/ReportsPage';
import { BranchMonitoringPage } from './pages/BranchMonitoringPage';
import { SettingsPage } from './pages/SettingsPage';
import { Sidebar, PageType } from './components/Sidebar';

const STORAGE_KEY = 'powertrack.isLoggedIn';

export function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // If user is not logged in and not on /login, redirect to /login
    if (!isLoggedIn && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {}
    navigate('/dashboard', { replace: true });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    navigate('/login', { replace: true });
  };

  const pathToPage = (path: string): PageType => {
    if (path.startsWith('/devices')) return 'devices';
    if (path.startsWith('/alerts')) return 'alerts';
    if (path.startsWith('/reports')) return 'reports';
    if (path.startsWith('/branches')) return 'branches';
    if (path.startsWith('/settings')) return 'settings';
    return 'dashboard';
  };

  const pageToPath = (page: PageType) => {
    switch (page) {
      case 'devices':
        return '/devices';
      case 'alerts':
        return '/alerts';
      case 'reports':
        return '/reports';
      case 'branches':
        return '/branches';
      case 'settings':
        return '/settings';
      default:
        return '/dashboard';
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#060b1d] via-[#0a1128] to-[#0f1535] text-slate-100 flex relative overflow-hidden">
      <div className="bg-orb-1"></div>
      <div className="bg-orb-2"></div>

      {/* Sidebar - show only when logged in */}
      {isLoggedIn && (
        <Sidebar
          activePage={pathToPage(location.pathname)}
          onNavigate={(p) => navigate(pageToPath(p))}
          onLogout={handleLogout}
        />
      )}

      <main className={`flex-1 ${isLoggedIn ? 'ml-64' : ''} p-8 overflow-y-auto h-screen relative z-10`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}>

            <Routes>
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
              <Route
                path="/dashboard"
                element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/devices"
                element={isLoggedIn ? <DeviceMonitoringPage /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/alerts"
                element={isLoggedIn ? <AlertsPage /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/reports"
                element={isLoggedIn ? <ReportsPage /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/branches"
                element={isLoggedIn ? <BranchMonitoringPage /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/settings"
                element={isLoggedIn ? <SettingsPage /> : <Navigate to="/login" replace />}
              />
              <Route path="/" element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} replace />} />
              <Route path="*" element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}