import React from 'react';
import { InvestmentInstallment } from '../types';

interface InstallmentHistoryTableProps {
  installments: InvestmentInstallment[];
}

const InstallmentHistoryTable: React.FC<InstallmentHistoryTableProps> = ({ installments }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);
  }

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">Investment History</h3>
      </div>
      <div className="overflow-y-auto flex-grow">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-800 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-slate-800 divide-y divide-slate-700">
            {installments.length > 0 ? installments.map((item, index) => (
              <tr key={index} className="hover:bg-slate-700/50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 text-right font-medium">{formatCurrency(item.amount)}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={2} className="text-center py-8 text-slate-500">No investment history found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstallmentHistoryTable;