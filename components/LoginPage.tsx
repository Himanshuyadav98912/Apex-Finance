import React, { useState } from 'react';
import PreLoginHeader from './PreLoginHeader';
import HomePage from './HomePage';
import PreLoginFooter from './PreLoginFooter';
import LoginFormPage from './LoginFormPage';
import BlogPage from './BlogPage';
import ReviewsPage from './ReviewsPage';
import { AdminUser } from '../types';
import AboutPage from './AboutPage';

interface LoginPageProps {
  onClientLogin: (user: AdminUser) => void;
  onAdminLogin: (user: AdminUser) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onClientLogin, onAdminLogin }) => {
  const [activePage, setActivePage] = useState('home');
  const [pageToRender, setPageToRender] = useState('home'); // 'home', 'blog', 'reviews', or 'login'

  const handleNavigation = (page: string) => {
    const homeSections = ['home', 'team', 'careers'];
    
    if (homeSections.includes(page)) {
      if (pageToRender !== 'home') {
        // If we're on another page, switch back to the home component first
        setPageToRender('home');
        // Defer scrolling until after the home component has re-rendered
        setTimeout(() => {
          document.getElementById(page)?.scrollIntoView();
        }, 100);
      } else {
        // We are already on the home page, just scroll to the section
        document.getElementById(page)?.scrollIntoView();
      }
    } else {
      // It's a different page like 'login', 'blog', or 'reviews'
      setPageToRender(page);
      window.scrollTo(0, 0); // Scroll to top when changing to a new page component
    }
    setActivePage(page);
  };

  const renderContent = () => {
    switch (pageToRender) {
      case 'login':
        return <LoginFormPage onClientLogin={onClientLogin} onAdminLogin={onAdminLogin} />;
      case 'about':
        return <AboutPage />;
      case 'blog':
        return <BlogPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col">
      <PreLoginHeader activePage={activePage} onNavigate={handleNavigation} />
      <main className="flex-grow flex flex-col relative">
        {renderContent()}
      </main>
      <PreLoginFooter />
    </div>
  );
};

export default LoginPage;