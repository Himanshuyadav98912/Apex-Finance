
import React, { useState, useEffect, useCallback } from 'react';
import { adminService } from '../../services/adminService';
import { MarketMover, TrendingStock } from '../../types';

const DataManagementTab: React.FC = () => {
    const [gainers, setGainers] = useState<MarketMover[]>([]);
    const [losers, setLosers] = useState<MarketMover[]>([]);
    const [trending, setTrending] = useState<TrendingStock[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const { gainers, losers, trending } = await adminService.getMarketMovers();
        setGainers(gainers);
        setLosers(losers);
        setTrending(trending);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSave = async () => {
        setIsSubmitting(true);
        await adminService.updateMarketMovers({ gainers, losers, trending });
        setIsSubmitting(false);
        alert("Market data updated successfully!");
    };
    
    const handleGainerChange = (index: number, field: keyof MarketMover, value: string) => {
        const newGainers = [...gainers];
        newGainers[index] = { ...newGainers[index], [field]: value };
        setGainers(newGainers);
    }

    const handleLoserChange = (index: number, field: keyof MarketMover, value: string) => {
        const newLosers = [...losers];
        newLosers[index] = { ...newLosers[index], [field]: value };
        setLosers(newLosers);
    }
    
    const handleTrendingChange = (index: number, field: keyof TrendingStock, value: string) => {
        const newTrending = [...trending];
        newTrending[index] = { ...newTrending[index], [field]: value };
        setTrending(newTrending);
    }
    
    const MarketDataTable: React.FC<{
        title: string;
        data: MarketMover[];
        onChange: (index: number, field: keyof MarketMover, value: string) => void;
    }> = ({ title, data, onChange }) => (
        <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 flex-1">
            <h3 className="text-lg font-semibold text-white p-4 border-b border-slate-700">{title}</h3>
            <div className="p-4 space-y-4">
                {data.map((item, index) => (
                    <div key={index} className="grid grid-cols-3 gap-3 text-sm">
                        <input type="text" value={item.symbol} placeholder="Symbol" onChange={e => onChange(index, 'symbol', e.target.value)} className="p-2 bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                        <input type="text" value={item.price} placeholder="Price" onChange={e => onChange(index, 'price', e.target.value)} className="p-2 bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                        <input type="text" value={item.change} placeholder="Change" onChange={e => onChange(index, 'change', e.target.value)} className="p-2 bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                    </div>
                ))}
            </div>
        </div>
    );
    
    const TrendingStockTable: React.FC = () => (
         <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 flex-1">
            <h3 className="text-lg font-semibold text-white p-4 border-b border-slate-700">Trending Stocks</h3>
            <div className="p-4 space-y-4">
                {trending.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <input type="text" value={item.symbol} placeholder="Symbol" onChange={e => handleTrendingChange(index, 'symbol', e.target.value)} className="p-2 bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                        <input type="text" value={item.name} placeholder="Name" onChange={e => handleTrendingChange(index, 'name', e.target.value)} className="p-2 bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                        <input type="text" value={item.reason} placeholder="Reason" onChange={e => handleTrendingChange(index, 'reason', e.target.value)} className="p-2 bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                    </div>
                ))}
            </div>
        </div>
    );

    if (isLoading) {
        return <div className="text-center p-8">Loading market data...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <MarketDataTable title="Top Gainers" data={gainers} onChange={handleGainerChange} />
                <MarketDataTable title="Top Losers" data={losers} onChange={handleLoserChange} />
            </div>
            <TrendingStockTable />
            <div className="flex justify-end pt-4">
                <button
                    onClick={handleSave}
                    disabled={isSubmitting}
                    className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-slate-600 transition-colors"
                >
                    {isSubmitting ? 'Saving...' : 'Save Market Data'}
                </button>
            </div>
        </div>
    );
};

export default DataManagementTab;
