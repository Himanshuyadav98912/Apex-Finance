

import React from 'react';
import { ICONS } from '../constants';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const NavLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-indigo-600 text-white shadow-lg'
        : 'text-slate-400 hover:bg-slate-700 hover:text-white'
    }`}
  >
    {icon}
    <span className="ml-4">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <div className="flex flex-col w-64 p-4 space-y-4 bg-slate-800 border-r border-slate-700">
      <div className="flex items-center justify-center py-4 text-yellow-400 border-b border-slate-700">
        {ICONS.logo}
        <div className="ml-2 flex flex-col leading-none">
            <span className="font-extrabold text-white text-lg tracking-tight">APEX</span>
            <span className="text-xs font-medium text-slate-300 tracking-wider">FINANCIALS</span>
        </div>
      </div>
      <nav className="flex-1 space-y-2">
        <NavLink 
          icon={ICONS.dashboard} 
          label="Dashboard"
          isActive={activeView === 'dashboard'} 
          onClick={() => setActiveView('dashboard')}
        />
        <NavLink 
          icon={ICONS.portfolio} 
          label="Portfolio"
          isActive={activeView === 'portfolio'} 
          onClick={() => setActiveView('portfolio')}
        />
        <NavLink 
          icon={ICONS.insights} 
          label="AI Insights"
          isActive={activeView === 'insights'} 
          onClick={() => setActiveView('insights')}
        />
      </nav>
      <div className="mt-auto">
        <div className="p-4 text-center rounded-lg bg-slate-700/50">
          <h4 className="font-semibold text-white">Upgrade to Pro</h4>
          <p className="mt-1 text-xs text-slate-400">Unlock advanced analytics and real-time data.</p>
          <button className="w-full px-4 py-2 mt-3 text-sm font-semibold text-white transition-colors duration-200 bg-yellow-500 rounded-lg hover:bg-yellow-600">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;