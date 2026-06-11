import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './lib/auth';
import { ThemeProvider } from './lib/theme';
import { Header } from './components/layout/Header/Header';
import { navigation } from './data/navigation';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import ParentDashboard from './pages/dashboard/ParentDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import { Connect } from './pages/Connect';
import { Journal } from './pages/Journal';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { Help } from './pages/Help';
import { NotFound } from './pages/NotFound';
import { PrivateRoute } from './components/auth/Guards';
import { GuestDashboard } from './pages/dashboard/GuestDashboard';
import './styles/tokens.css';
import './styles/global.css';
import './styles/components.css';
import './styles/motion.css';
import './styles/themes.css';

const ease = [0.16, 1, 0.3, 1] as const;
const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease } },
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div {...pageTransition}>{children}</motion.div>
);

const DashboardRedirect: React.FC = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={`/dashboard/${user.role}`} replace />;
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageWrapper>
            <div style={{ background: 'var(--color-bg-primary)', color: '#1d1d1f', fontFamily: 'var(--font-sans)' }}>
              <Header navItems={navigation.navItems} />
              <Home />
            </div>
          </PageWrapper>
        } />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
        <Route path="/dashboard" element={<PrivateRoute><PageWrapper><DashboardRedirect /></PageWrapper></PrivateRoute>} />
        <Route path="/dashboard/guest" element={<PageWrapper><GuestDashboard /></PageWrapper>} />
        <Route path="/dashboard/student" element={<PrivateRoute><PageWrapper><StudentDashboard /></PageWrapper></PrivateRoute>} />
        <Route path="/dashboard/parent" element={<PrivateRoute><PageWrapper><ParentDashboard /></PageWrapper></PrivateRoute>} />
        <Route path="/dashboard/admin" element={<PrivateRoute><PageWrapper><AdminDashboard /></PageWrapper></PrivateRoute>} />
        <Route path="/journal" element={<PrivateRoute><PageWrapper><Journal /></PageWrapper></PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><PageWrapper><Reports /></PageWrapper></PrivateRoute>} />
        <Route path="/connect" element={<PrivateRoute><PageWrapper><Connect /></PageWrapper></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><PageWrapper><Settings /></PageWrapper></PrivateRoute>} />
        <Route path="/help" element={<PageWrapper><Help /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

export const App: React.FC = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <AnimatedRoutes />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
