

import React, { useState } from 'react';
import { ICONS, DEFAULT_AVATAR_URI } from '../../constants';
import UserManagementTab from './UserManagementTab';
import DataManagementTab from './DataManagementTab';
import UserPortfolioTab from './UserPortfolioTab';
import { AdminUser } from '../../types';

interface AdminDashboardProps {
  onLogout: () => void;
  user: AdminUser;
}

const AdminHeader: React.FC<{ onLogout: () => void; user: AdminUser }> = ({ onLogout, user }) => (
    <header className="flex items-center justify-between flex-shrink-0 h-16 px-4 bg-slate-800 border-b border-slate-700 md:px-8">
        <div className="flex items-center space-x-3">
            <div className="flex items-center text-rose-400">
                {ICONS.logo}
                <h1 className="ml-3 text-2xl font-bold text-white">Apex Financials <span className="text-rose-400 font-semibold">Admin</span></h1>
            </div>
        </div>
        <div className="flex items-center space-x-4">
             <div className="text-right">
                <div className="font-semibold text-white">{user.name}</div>
                <div className="text-xs text-rose-400">Administrator</div>
            </div>
             <img
                className="w-10 h-10 rounded-full bg-slate-700 p-1"
                src={DEFAULT_AVATAR_URI}
                alt="Admin Avatar"
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

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, user }) => {
    const [activeTab, setActiveTab] = useState('users');

    return (
        <div className="flex flex-col h-screen bg-slate-900 text-slate-200">
            <AdminHeader onLogout={onLogout} user={user} />
            <div className="flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-6">Admin Control Panel</h2>
                    <div className="border-b border-slate-700 mb-6">
                        <nav className="flex space-x-4" aria-label="Tabs">
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`px-3 py-2 font-medium text-sm rounded-t-lg transition-colors ${activeTab === 'users' ? 'border-b-2 border-rose-500 text-white' : 'text-slate-400 hover:text-white'}`}
                            >
                                User Management
                            </button>
                            <button
                                onClick={() => setActiveTab('portfolios')}
                                className={`px-3 py-2 font-medium text-sm rounded-t-lg transition-colors ${activeTab === 'portfolios' ? 'border-b-2 border-rose-500 text-white' : 'text-slate-400 hover:text-white'}`}
                            >
                                User Portfolio Data
                            </button>
                            <button
                                onClick={() => setActiveTab('data')}
                                className={`px-3 py-2 font-medium text-sm rounded-t-lg transition-colors ${activeTab === 'data' ? 'border-b-2 border-rose-500 text-white' : 'text-slate-400 hover:text-white'}`}
                            >
                                Market Movers
                            </button>
                        </nav>
                    </div>

                    <div>
                        {activeTab === 'users' && <UserManagementTab />}
                        {activeTab === 'portfolios' && <UserPortfolioTab />}
                        {activeTab === 'data' && <DataManagementTab />}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AdminDashboard;