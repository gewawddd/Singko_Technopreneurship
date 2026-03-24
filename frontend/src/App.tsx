import { useEffect, useState } from 'react';
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
import { PrivateRoute } from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import { Menu } from 'lucide-react';

export function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, loading, login, logout } = useAuth();

  useEffect(() => {
    if (loading) return; // wait for restore
    if (!isLoggedIn && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, loading, location.pathname, navigate]);

  const handleLogin = async () => {
    await login();
    navigate('/dashboard', { replace: true });
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  // mobile sidebar state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  useEffect(() => {
    if (!isLoggedIn) setMobileSidebarOpen(false);
  }, [isLoggedIn]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-[#060b1d] via-[#0a1128] to-[#0f1535] text-slate-100 flex items-center justify-center">
        <div className="glass-panel rounded-2xl px-6 py-4 text-sm text-slate-300">Loading workspace...</div>
      </div>
    );
  }

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
          onNavigate={p => {
            navigate(pageToPath(p));
            setMobileSidebarOpen(false);
          }}
          onLogout={() => {
            handleLogout();
            setMobileSidebarOpen(false);
          }}
          mobileOpen={mobileSidebarOpen}
          onRequestClose={() => setMobileSidebarOpen(false)}
        />
      )}

      <main
        className={`flex-1 ${
          isLoggedIn ? 'md:ml-64' : ''
        } p-4 md:p-8 overflow-y-auto h-screen relative z-10 pt-16 md:pt-8`}
      >
        {isLoggedIn && (
          <button
            onClick={() => setMobileSidebarOpen(s => !s)}
            className="md:hidden fixed top-4 left-4 z-[60] p-2 rounded-lg bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10"
            aria-label="Toggle sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/devices"
                element={
                  <PrivateRoute>
                    <DeviceMonitoringPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/alerts"
                element={
                  <PrivateRoute>
                    <AlertsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <PrivateRoute>
                    <ReportsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/branches"
                element={
                  <PrivateRoute>
                    <BranchMonitoringPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <SettingsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/"
                element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} replace />}
              />
              <Route
                path="*"
                element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} replace />}
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
