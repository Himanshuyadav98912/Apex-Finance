import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import StatCard from './StatCard';
import InvestmentChart from './InvestmentChart';
import PortfolioTable from './PortfolioTable';
import AIAssistant from './AIAssistant';
import AllocationPieChart from './AllocationPieChart';
import InstallmentHistoryTable from './InstallmentHistoryTable';
import { MOCK_CHART_DATA, MOCK_PORTFOLIO_HOLDINGS, MOCK_ALLOCATION_DATA } from '../constants';
import { clientService } from '../services/clientService';
import { ClientPortfolio, AdminUser } from '../types';

interface DashboardProps {
  onLogout: () => void;
  user: AdminUser;
}

const formatCurrency = (value: number) => {
    if (Math.abs(value) >= 10000000) {
        return `₹${(value / 10000000).toFixed(2)} Cr`;
    }
    if (Math.abs(value) >= 100000) {
        return `₹${(value / 100000).toFixed(2)} L`;
    }
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, user }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [portfolio, setPortfolio] = useState<ClientPortfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
        try {
            const data = await clientService.getUserPortfolio(user.id);
            setPortfolio(data);
        } catch (error) {
            console.error("Failed to fetch portfolio data:", error);
        }
    };

    const initialFetch = async () => {
        setLoading(true);
        try {
            await fetchPortfolio();
        } finally {
            setLoading(false);
        }
    };
    
    initialFetch();

    const intervalId = setInterval(fetchPortfolio, 10000); // Poll every 10 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [user.id]);
  
  const renderContent = () => {
    if (loading && activeView === 'dashboard') {
        return <div className="flex items-center justify-center h-full text-slate-400">Loading dashboard data...</div>;
    }
      
    if (!portfolio && activeView === 'dashboard') {
        return <div className="flex items-center justify-center h-full text-red-400">Could not load portfolio data. Please try again later.</div>;
    }
    
    switch (activeView) {
      case 'dashboard':
        return (
          <>
            <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
              <StatCard title="Portfolio Value" value={formatCurrency(portfolio!.totalReturns)} change={`+${portfolio!.ytdReturnPercent.toFixed(1)}% YTD`} isPositive={portfolio!.ytdReturnPercent >= 0} />
              <StatCard title="Total Investment" value={formatCurrency(portfolio!.totalInvested)} change="vs Returns" isPositive={true} />
              <StatCard title="24h Change" value={`${portfolio!.dayChange > 0 ? '+' : ''}${formatCurrency(portfolio!.dayChange)}`} change={`${portfolio!.dayChangePercent.toFixed(2)}%`} isPositive={portfolio!.dayChange >= 0} />
              <StatCard title="AI Confidence" value="High" change="Stable Market" isPositive={true} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                    <InvestmentChart data={MOCK_CHART_DATA} />
                </div>
                <div className="h-96">
                    <AllocationPieChart data={MOCK_ALLOCATION_DATA} />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <PortfolioTable holdings={MOCK_PORTFOLIO_HOLDINGS} />
              </div>
              <div className="lg:col-span-2">
                <InstallmentHistoryTable installments={portfolio!.installments} />
              </div>
            </div>
          </>
        );
      case 'insights':
        return <AIAssistant />;
      case 'portfolio':
        return <PortfolioTable holdings={MOCK_PORTFOLIO_HOLDINGS} fullView={true} />;
      default:
        return <div>Select a view</div>;
    }
  }

  return (
    <div className="flex h-screen bg-slate-900 text-slate-200">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header userName={user.name} userRole={user.role} onLogout={onLogout} />
        <main className="flex-1 p-4 overflow-x-hidden overflow-y-auto md:p-8 bg-slate-900">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;