import React, { useState, useCallback } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import { AdminUser } from './types';

type AuthStatus = 'loggedOut' | 'client' | 'admin';

const App: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loggedOut');
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  const handleClientLogin = useCallback((user: AdminUser) => {
    setCurrentUser(user);
    setAuthStatus('client');
  }, []);

  const handleAdminLogin = useCallback((user: AdminUser) => {
    setCurrentUser(user);
    setAuthStatus('admin');
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setAuthStatus('loggedOut');
  }, []);

  const renderContent = () => {
    switch (authStatus) {
      case 'client':
        return <Dashboard onLogout={handleLogout} user={currentUser!} />;
      case 'admin':
        return <AdminDashboard onLogout={handleLogout} user={currentUser!} />;
      case 'loggedOut':
      default:
        return <LoginPage onClientLogin={handleClientLogin} onAdminLogin={handleAdminLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      {renderContent()}
    </div>
  );
};

export default App;