
import React, { useState, useEffect, useCallback } from 'react';
import { adminService } from '../../services/adminService';
import { AdminUser, InvestmentInstallment } from '../../types';
import InstallmentHistoryModal from './InstallmentHistoryModal';

const UserPortfolioTab: React.FC = () => {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set());
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [selectedUserForHistory, setSelectedUserForHistory] = useState<AdminUser | null>(null);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        const fetchedUsers = await adminService.getUsers();
        setUsers(fetchedUsers);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const togglePasswordVisibility = (userId: string) => {
        const newSet = new Set(visiblePasswords);
        if (newSet.has(userId)) {
            newSet.delete(userId);
        } else {
            newSet.add(userId);
        }
        setVisiblePasswords(newSet);
    };

    const handleInputChange = (userId: string, field: keyof AdminUser, value: string | number) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId ? { ...user, [field]: value } : user
            )
        );
    };

    const handleSave = async () => {
        setIsSubmitting(true);
        // Ensure numeric values are correctly parsed and password is not empty
        const usersToSave = users.map(user => ({
            ...user,
            password: user.password.trim() === '' ? `default_pass_${user.id}` : user.password,
            totalInvested: Number(user.totalInvested),
            totalReturns: Number(user.totalReturns),
            ytdReturnPercent: Number(user.ytdReturnPercent),
            dayChange: Number(user.dayChange),
            dayChangePercent: Number(user.dayChangePercent),
        }))
        await adminService.updateUsersData(usersToSave);
        await fetchUsers();
        setIsSubmitting(false);
        alert("User portfolio data updated successfully!");
    };

    const handleViewHistory = (user: AdminUser) => {
        setSelectedUserForHistory(user);
        setIsHistoryModalOpen(true);
    };

    const handleSaveInstallmentHistory = (updatedInstallments: InvestmentInstallment[]) => {
        if (!selectedUserForHistory) return;

        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === selectedUserForHistory.id 
                ? { ...user, installments: updatedInstallments } 
                : user
            )
        );
    };


    if (isLoading) {
        return <div className="text-center p-8">Loading user portfolio data...</div>;
    }

    return (
        <>
            <InstallmentHistoryModal 
                isOpen={isHistoryModalOpen}
                onClose={() => setIsHistoryModalOpen(false)}
                user={selectedUserForHistory}
                onSave={handleSaveInstallmentHistory}
            />
            <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
                <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">Edit User Portfolio Data</h3>
                     <button
                        onClick={handleSave}
                        disabled={isSubmitting}
                        className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-slate-600 transition-colors"
                    >
                        {isSubmitting ? 'Saving...' : 'Save All Changes'}
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-700 text-sm">
                        <thead className="bg-slate-800">
                            <tr>
                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">User</th>
                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Password</th>
                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Total Invested (₹)</th>
                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Total Returns (₹)</th>
                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">YTD (%)</th>
                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Day Change (₹)</th>
                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Day Change (%)</th>
                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">History</th>
                            </tr>
                        </thead>
                        <tbody className="bg-slate-800 divide-y divide-slate-700">
                           {users.map(user => (
                               <tr key={user.id} className="hover:bg-slate-700/50 transition-colors">
                                   <td className="px-3 py-2 whitespace-nowrap">
                                       <div className="font-medium text-white">{user.name}</div>
                                       <div className="text-xs text-slate-400">{user.email}</div>
                                   </td>
                                   <td className="px-3 py-2 whitespace-nowrap">
                                       <select value={user.role} onChange={(e) => handleInputChange(user.id, 'role', e.target.value)}
                                       className="p-2 w-32 bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-white">
                                           <option>Client</option>
                                           <option>Analyst</option>
                                           <option>Senior Analyst</option>
                                           <option>Junior Analyst</option>
                                           <option>Trader</option>
                                       </select>
                                   </td>
                                   <td className="px-3 py-2 whitespace-nowrap">
                                        <div className="relative flex items-center">
                                            <input 
                                                type={visiblePasswords.has(user.id) ? 'text' : 'password'}
                                                value={user.password} 
                                                onChange={(e) => handleInputChange(user.id, 'password', e.target.value)}
                                                className="p-2 w-40 bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 pr-9 text-white" 
                                                required
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => togglePasswordVisibility(user.id)}
                                                className="absolute right-0 p-2 text-slate-400 hover:text-white"
                                                aria-label={visiblePasswords.has(user.id) ? "Hide password" : "Show password"}
                                            >
                                                {visiblePasswords.has(user.id) ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                                                )}
                                            </button>
                                        </div>
                                   </td>
                                   <td className="px-3 py-2 whitespace-nowrap">
                                       <input type="number" value={user.totalInvested} onChange={(e) => handleInputChange(user.id, 'totalInvested', e.target.value)}
                                         className="p-2 w-36 bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                                   </td>
                                   <td className="px-3 py-2 whitespace-nowrap">
                                       <input type="number" value={user.totalReturns} onChange={(e) => handleInputChange(user.id, 'totalReturns', e.target.value)}
                                         className="p-2 w-36 bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                                   </td>
                                   <td className="px-3 py-2 whitespace-nowrap">
                                        <input type="number" step="0.01" value={user.ytdReturnPercent} onChange={(e) => handleInputChange(user.id, 'ytdReturnPercent', e.target.value)}
                                         className="p-2 w-24 bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                                   </td>
                                   <td className="px-3 py-2 whitespace-nowrap">
                                        <input type="number" step="0.01" value={user.dayChange} onChange={(e) => handleInputChange(user.id, 'dayChange', e.target.value)}
                                         className="p-2 w-28 bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                                   </td>
                                   <td className="px-3 py-2 whitespace-nowrap">
                                        <input type="number" step="0.01" value={user.dayChangePercent} onChange={(e) => handleInputChange(user.id, 'dayChangePercent', e.target.value)}
                                         className="p-2 w-24 bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                                   </td>
                                   <td className="px-3 py-2 whitespace-nowrap">
                                       <button onClick={() => handleViewHistory(user)} className="px-3 py-2 text-xs font-semibold text-sky-400 bg-sky-900/50 hover:bg-sky-900 rounded-md">View</button>
                                   </td>
                               </tr>
                           ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default UserPortfolioTab;
