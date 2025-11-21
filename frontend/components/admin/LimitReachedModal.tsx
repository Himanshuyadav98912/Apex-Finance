
import React from 'react';

interface LimitReachedModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LimitReachedModal: React.FC<LimitReachedModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 w-full max-w-md text-center">
                <div className="p-8 space-y-6">
                    <h3 className="text-xl font-semibold text-white">User Limit Reached</h3>
                    <p className="text-slate-300">
                        The maximum user limit of 21 (20 users + 1 admin) has been reached. To add a new user, you must first delete an existing user.
                    </p>
                    <button 
                        onClick={onClose} 
                        className="w-full px-6 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-800"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LimitReachedModal;
