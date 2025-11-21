

import React, { useState } from 'react';
import { ICONS } from '../constants';

interface PreLoginHeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const NavLink: React.FC<{ label: string; page: string; activePage: string; onNavigate: (page: string) => void; isHomeLink?: boolean; isBlock?: boolean }> = 
({ label, page, activePage, onNavigate, isHomeLink = false, isBlock = false }) => {
    const isHomePageSection = ['home', 'team', 'careers'].includes(activePage);
    const isActive = isHomeLink ? isHomePageSection : page === activePage;
    
    const baseClasses = "text-sm font-medium transition-colors rounded-md";
    const layoutClasses = isBlock ? "block w-full text-left px-3 py-2" : "px-3 py-2";
    const colorClasses = isActive 
        ? (isBlock ? "bg-indigo-600 text-white" : "text-white") 
        : "text-slate-400 hover:text-white hover:bg-slate-700/50";

    return (
        <button 
            onClick={() => onNavigate(page)}
            className={`${baseClasses} ${layoutClasses} ${colorClasses}`}
        >
            {label}
        </button>
    );
};

const PreLoginHeader: React.FC<PreLoginHeaderProps> = ({ activePage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNav = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 bg-slate-900/70 backdrop-blur-lg border-b border-slate-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => onNavigate('home')} className="flex-shrink-0 flex items-center text-yellow-400">
              {ICONS.logo}
              <div className="ml-2 flex flex-col leading-tight">
                  <span className="font-extrabold text-white text-lg tracking-tight">APEX</span>
                  <span className="text-xs font-medium text-slate-300 tracking-wider">FINANCIALS</span>
              </div>
            </button>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-1">
            <NavLink label="Home" page="home" activePage={activePage} onNavigate={onNavigate} isHomeLink={true} />
            <NavLink label="About Us" page="about" activePage={activePage} onNavigate={onNavigate} />
            <NavLink label="Our Team" page="team" activePage={activePage} onNavigate={onNavigate} />
            <NavLink label="Reviews" page="reviews" activePage={activePage} onNavigate={onNavigate} />
            <NavLink label="Careers" page="careers" activePage={activePage} onNavigate={onNavigate} />
            <NavLink label="Blog" page="blog" activePage={activePage} onNavigate={onNavigate} />
          </div>
          <div className="flex items-center">
             <button
              onClick={() => onNavigate('login')}
              className={`px-4 py-2 text-sm font-semibold text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 transition-all duration-300 ${
                activePage === 'login' ? 'bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              Client Login
            </button>
            {/* Mobile menu button */}
            <div className="ml-2 md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? ICONS.close : ICONS.menu}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink label="Home" page="home" activePage={activePage} onNavigate={handleMobileNav} isHomeLink={true} isBlock={true} />
            <NavLink label="About Us" page="about" activePage={activePage} onNavigate={handleMobileNav} isBlock={true} />
            <NavLink label="Our Team" page="team" activePage={activePage} onNavigate={handleMobileNav} isBlock={true} />
            <NavLink label="Reviews" page="reviews" activePage={activePage} onNavigate={handleMobileNav} isBlock={true} />
            <NavLink label="Careers" page="careers" activePage={activePage} onNavigate={handleMobileNav} isBlock={true} />
            <NavLink label="Blog" page="blog" activePage={activePage} onNavigate={handleMobileNav} isBlock={true} />
          </div>
        </div>
      )}
    </header>
  );
};

export default PreLoginHeader;