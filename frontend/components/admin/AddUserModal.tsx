
import React, { useState } from 'react';
import { AdminUser } from '../../types';

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (user: Omit<AdminUser, 'id' | 'joinedDate' | 'totalInvested' | 'totalReturns' | 'ytdReturnPercent' | 'dayChange' | 'dayChangePercent' | 'installments'>) => Promise<void>;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Client');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const resetState = () => {
        setName('');
        setEmail('');
        setPassword('');
        setRole('Client');
        setError('');
        setShowPassword(false);
        setIsSubmitting(false);
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!name || !email || !role || !password) {
            setError('All fields are required.');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }
        
        setError('');
        setIsSubmitting(true);
        try {
            await onSave({ name, email, role, password });
            handleClose(); // Success, close and clear
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 w-full max-w-md">
                <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">Add New User</h3>
                    <button onClick={handleClose} className="text-slate-400 hover:text-white">&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        {error && <p className="text-sm text-red-300 bg-red-800/40 p-3 rounded text-center">{error}</p>}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-white disabled:opacity-50" disabled={isSubmitting} required/>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-white disabled:opacity-50" disabled={isSubmitting} required/>
                        </div>
                         <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">Set Password</label>
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 pr-10 text-white disabled:opacity-50" disabled={isSubmitting} required placeholder="Min. 8 characters"/>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-white disabled:opacity-50"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    disabled={isSubmitting}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-1">Role</label>
                             <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-white disabled:opacity-50" disabled={isSubmitting}>
                                <option>Admin</option>
                                <option>Client</option>
                                <option>Analyst</option>
                                <option>Senior Analyst</option>
                                <option>Junior Analyst</option>
                                <option>Trader</option>
                            </select>
                        </div>
                    </div>
                    <div className="p-4 bg-slate-800/50 border-t border-slate-700 flex justify-end space-x-3">
                        <button type="button" onClick={handleClose} disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-slate-300 bg-slate-600 hover:bg-slate-500 rounded-lg disabled:opacity-50">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:bg-slate-600 disabled:cursor-wait">
                            {isSubmitting ? 'Saving...' : 'Save User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;
