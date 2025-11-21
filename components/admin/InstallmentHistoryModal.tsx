
import React, { useState, useEffect } from 'react';
import { AdminUser, InvestmentInstallment } from '../../types';

interface InstallmentHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: AdminUser | null;
    onSave: (installments: InvestmentInstallment[]) => void;
}

const InstallmentHistoryModal: React.FC<InstallmentHistoryModalProps> = ({ isOpen, onClose, user, onSave }) => {
    const [installments, setInstallments] = useState<InvestmentInstallment[]>([]);

    useEffect(() => {
        if (user?.installments) {
            // Create a deep copy to avoid mutating the original prop state directly
            setInstallments(JSON.parse(JSON.stringify(user.installments)));
        } else {
            setInstallments([]);
        }
    }, [user]);

    if (!isOpen || !user) return null;

    const handleInputChange = (index: number, field: keyof InvestmentInstallment, value: string | number) => {
        const newInstallments = [...installments];
        // @ts-ignore
        newInstallments[index][field] = value;
        setInstallments(newInstallments);
    };

    const handleAddInstallment = () => {
        setInstallments([...installments, { date: new Date().toISOString().split('T')[0], amount: 0 }]);
    };

    const handleDeleteInstallment = (index: number) => {
        const newInstallments = installments.filter((_, i) => i !== index);
        setInstallments(newInstallments);
    };

    const handleSaveChanges = () => {
        // Filter out any potentially empty rows and ensure amount is a number
        const cleanedInstallments = installments
            .filter(inst => inst.date)
            .map(inst => ({ ...inst, amount: Number(inst.amount) || 0 }));
        onSave(cleanedInstallments);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 w-full max-w-2xl">
                <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">Edit History: <span className="text-indigo-400">{user.name}</span></h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none">&times;</button>
                </div>
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-4">
                        {installments.map((installment, index) => (
                            <div key={index} className="grid grid-cols-12 gap-3 items-center">
                                <div className="col-span-5">
                                    <label className="text-xs text-slate-400">Date</label>
                                    <input
                                        type="date"
                                        value={installment.date}
                                        onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                                        className="w-full p-2 mt-1 text-sm bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                                    />
                                </div>
                                <div className="col-span-5">
                                    <label className="text-xs text-slate-400">Amount (₹)</label>
                                    <input
                                        type="number"
                                        value={installment.amount}
                                        onChange={(e) => handleInputChange(index, 'amount', Number(e.target.value))}
                                        className="w-full p-2 mt-1 text-sm bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                                    />
                                </div>
                                <div className="col-span-2 text-right pt-5">
                                    <button 
                                        onClick={() => handleDeleteInstallment(index)}
                                        className="p-2 text-rose-500 hover:text-rose-400 rounded-md hover:bg-slate-700"
                                        aria-label="Delete installment"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                     {installments.length === 0 && (
                        <p className="text-center text-slate-400 py-8">No investment history. Add the first one below.</p>
                    )}
                    <div className="mt-6">
                        <button
                            onClick={handleAddInstallment}
                            className="w-full px-4 py-2 text-sm font-semibold text-white bg-indigo-600/50 hover:bg-indigo-600 rounded-lg transition-colors border border-dashed border-indigo-400"
                        >
                            + Add New Installment
                        </button>
                    </div>
                </div>
                <div className="p-4 bg-slate-800/50 border-t border-slate-700 flex justify-end space-x-3">
                     <button 
                        onClick={onClose} 
                        className="px-4 py-2 text-sm font-semibold text-slate-300 bg-slate-600 hover:bg-slate-500 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSaveChanges} 
                        className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstallmentHistoryModal;
