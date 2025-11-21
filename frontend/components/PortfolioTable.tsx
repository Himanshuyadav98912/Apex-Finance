import React from 'react';
import { PortfolioHolding } from '../types';

interface PortfolioTableProps {
  holdings: PortfolioHolding[];
  fullView?: boolean;
}

const PortfolioTable: React.FC<PortfolioTableProps> = ({ holdings, fullView = false }) => {
  const displayedHoldings = fullView ? holdings : holdings.slice(0, 5);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);
  }

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">Current Holdings</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Symbol</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Price</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Day's Change (%)</th>
            </tr>
          </thead>
          <tbody className="bg-slate-800 divide-y divide-slate-700">
            {displayedHoldings.map((holding) => (
              <tr key={holding.symbol} className="hover:bg-slate-700/50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-yellow-400">{holding.symbol}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{holding.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 text-right">{formatCurrency(holding.price)}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${holding.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {holding.changePercent >= 0 ? '+' : ''}{holding.changePercent.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioTable;