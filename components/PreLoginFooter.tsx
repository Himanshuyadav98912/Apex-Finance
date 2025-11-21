import React from 'react';
import { ICONS } from '../constants';

const PreLoginFooter: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-500">
        <div className="flex items-center justify-center mb-4 text-slate-500">
          {ICONS.logo}
          <span className="ml-2 font-semibold">Apex Financials</span>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Apex Financials Corporation. All Rights Reserved.
        </p>
        <p className="text-xs mt-2">
            Apex Financials provides financial data and AI-powered insights for informational purposes only. Not financial advice.
        </p>
      </div>
    </footer>
  );
};

export default PreLoginFooter;