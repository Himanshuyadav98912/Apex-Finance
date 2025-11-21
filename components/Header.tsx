
import React from 'react';
import { ICONS, DEFAULT_AVATAR_URI } from '../constants';

interface HeaderProps {
  userName: string;
  userRole: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, userRole, onLogout }) => {
  return (
    <header className="flex items-center justify-end flex-shrink-0 h-16 px-4 bg-slate-800 border-b border-slate-700 md:px-8">
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="font-semibold text-white">{userName}</div>
          <div className="text-xs text-slate-400">{userRole}</div>
        </div>
        <img
          className="w-10 h-10 rounded-full bg-slate-700 p-1"
          src={DEFAULT_AVATAR_URI}
          alt="User Avatar"
        />
        <button
          onClick={onLogout}
          className="p-2 text-slate-400 rounded-full hover:bg-slate-700 hover:text-white transition-colors duration-200"
          aria-label="Logout"
        >
          {ICONS.logout}
        </button>
      </div>
    </header>
  );
};

export default Header;