import { useEffect, useState } from 'react';
import { OnboardingCarousel } from './components/OnboardingCarousel';
import { MainLayout } from './components/MainLayout';
import { LoginPage } from './components/LoginPage';
import { getCurrentUser, logoutUser } from './auth';
const USE_BACKEND = typeof import.meta !== 'undefined' && import.meta.env?.VITE_USE_BACKEND === 'true';
const API_BASE = USE_BACKEND ? (import.meta.env.VITE_API_BASE || 'http://localhost:4000') : undefined;
import { ADMIN_EMAIL } from './config';
import { DashboardLayout } from './components/DashboardLayout';
import { RegisterPage } from './components/RegisterPage';

type PublicUser = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<PublicUser | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (USE_BACKEND) {
      (async () => {
        try {
          const resp = await fetch(`${API_BASE}/api/auth/me`, { credentials: 'include' });
          if (!resp.ok) return;
          const data = await resp.json();
          setCurrentUser(data.user);
        } catch {
          // ignore
        }
      })();
      return;
    }

    const u = getCurrentUser();
    if (u) setCurrentUser(u);
  }, []);

  // Not logged in -> show login or register view
  if (!currentUser) {
    if (showRegister) {
      return (
        <RegisterPage
          onRegistered={(user) => {
            setCurrentUser(user as PublicUser);
            setShowRegister(false);
          }}
          onCancel={() => setShowRegister(false)}
        />
      );
    }

    return (
      <LoginPage
        onLogin={(user) => {
          setCurrentUser(user as PublicUser);
        }}
        onShowRegister={() => setShowRegister(true)}
      />
    );
  }

  // If the email matches the admin email, show admin dashboard
  if (currentUser.email === ADMIN_EMAIL) {
    return (
      <DashboardLayout
        onLogout={() => {
          logoutUser();
          setCurrentUser(null);
        }}
      />
    );
  }

  // Regular user flow: optional onboarding then main layout
  if (showOnboarding) {
    return <OnboardingCarousel onComplete={() => setShowOnboarding(false)} />;
  }

  return <MainLayout />;
}
