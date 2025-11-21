import React, { useState, useEffect, useCallback } from 'react';
import { adminService } from '../../services/adminService';
import { AdminUser } from '../../types';
import AddUserModal from './AddUserModal';

const UserManagementTab: React.FC = () => {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set());

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

    const handleSelectUser = (userId: string) => {
        const newSelection = new Set(selectedUsers);
        if (newSelection.has(userId)) {
            newSelection.delete(userId);
        } else {
            newSelection.add(userId);
        }
        setSelectedUsers(newSelection);
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const allUserIds = new Set(users.map(u => u.id));
            setSelectedUsers(allUserIds);
        } else {
            setSelectedUsers(new Set());
        }
    };
    
    const handleDeleteSelected = async () => {
        if (selectedUsers.size === 0) return;
        setIsSubmitting(true);
        await adminService.deleteUsers(Array.from(selectedUsers));
        setSelectedUsers(new Set());
        await fetchUsers();
        setIsSubmitting(false);
    };

    const handleSaveNewUser = async (newUser: Omit<AdminUser, 'id' | 'joinedDate' | 'totalInvested' | 'totalReturns' | 'ytdReturnPercent' | 'dayChange' | 'dayChangePercent' | 'installments'>) => {
        setIsSubmitting(true);
        await adminService.addUser(newUser);
        await fetchUsers();
        setIsSubmitting(false);
        setIsModalOpen(false);
    }
    
    const handleDeleteUser = async (userId: string) => {
        if(window.confirm("Are you sure you want to delete this user?")) {
            setIsSubmitting(true);
            await adminService.deleteUser(userId);
            await fetchUsers();
            setIsSubmitting(false);
        }
    }

    if (isLoading) {
        return <div className="text-center p-8">Loading users...</div>;
    }

    return (
        <>
            <AddUserModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveNewUser}
            />
            <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
                <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">Manage Users ({users.length})</h3>
                    <div className="space-x-2">
                        {selectedUsers.size > 0 && (
                            <button
                                onClick={handleDeleteSelected}
                                disabled={isSubmitting}
                                className="px-3 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg disabled:bg-slate-600 transition-colors"
                            >
                               {isSubmitting ? 'Deleting...' : `Delete Selected (${selectedUsers.size})`}
                            </button>
                        )}
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            disabled={isSubmitting}
                            className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:bg-slate-600 transition-colors"
                        >
                           {isSubmitting ? 'Adding...' : '+ Add User'}
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-700">
                        <thead className="bg-slate-800">
                            <tr>
                                <th scope="col" className="p-4">
                                    <input type="checkbox" className="h-4 w-4 rounded bg-slate-600 border-slate-500 text-indigo-600 focus:ring-indigo-500"
                                    onChange={handleSelectAll}
                                    checked={selectedUsers.size === users.length && users.length > 0}
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Password</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Joined Date</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-slate-800 divide-y divide-slate-700">
                           {users.map(user => (
                               <tr key={user.id} className={`${selectedUsers.has(user.id) ? 'bg-slate-700/50' : ''} hover:bg-slate-700/50 transition-colors`}>
                                   <td className="p-4">
                                       <input type="checkbox" className="h-4 w-4 rounded bg-slate-600 border-slate-500 text-indigo-600 focus:ring-indigo-500"
                                        checked={selectedUsers.has(user.id)}
                                        onChange={() => handleSelectUser(user.id)}
                                       />
                                   </td>
                                   <td className="px-6 py-4 whitespace-nowrap">
                                       <div className="text-sm font-medium text-white">{user.name}</div>
                                       <div className="text-xs text-slate-400">{user.email}</div>
                                   </td>
                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{user.role}</td>
                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-mono text-xs">{visiblePasswords.has(user.id) ? user.password : '••••••••••'}</span>
                                            <button 
                                                onClick={() => togglePasswordVisibility(user.id)} 
                                                className="text-slate-400 hover:text-white"
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
                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{user.joinedDate}</td>
                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                       <button 
                                            onClick={() => handleDeleteUser(user.id)}
                                            disabled={isSubmitting}
                                            className="text-rose-500 hover:text-rose-400 font-semibold disabled:text-slate-500"
                                        >
                                            Delete
                                       </button>
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

export default UserManagementTab;
