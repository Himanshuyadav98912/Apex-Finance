
import React, { useState, useEffect, useCallback } from 'react';
import { adminService } from '../../services/adminService';
import { MarketMover, TrendingStock } from '../../types';

const MoverCard: React.FC<{
    item: MarketMover;
    index: number;
    type: 'gainer' | 'loser';
    onChange: (index: number, field: keyof MarketMover, value: string) => void;
    onDelete: (index: number) => void;
    isSubmitting: boolean;
}> = ({ item, index, type, onChange, onDelete, isSubmitting }) => {
    const accentColor = type === 'gainer' ? 'border-green-500' : 'border-red-500';
    const inputClasses = "p-2 w-full text-sm bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-white disabled:opacity-50 transition-colors";

    return (
        <div className={`p-4 bg-slate-800 rounded-lg border-l-4 ${accentColor} border border-slate-700/50 space-y-3 relative`}>
            <button 
                onClick={() => onDelete(index)}
                disabled={isSubmitting}
                aria-label="Delete item"
                className="absolute top-2 right-2 p-1 text-slate-500 hover:text-rose-500 rounded-full hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div>
                <label className="text-xs text-slate-400">Symbol</label>
                <input type="text" value={item.symbol} placeholder="e.g., RELIANCE" onChange={e => onChange(index, 'symbol', e.target.value)} disabled={isSubmitting} className={inputClasses} />
            </div>
            <div>
                <label className="text-xs text-slate-400">Price</label>
                <input type="text" value={item.price} placeholder="e.g., ₹2,850.50" onChange={e => onChange(index, 'price', e.target.value)} disabled={isSubmitting} className={inputClasses} />
            </div>
            <div>
                <label className="text-xs text-slate-400">Change</label>
                <input type="text" value={item.change} placeholder="e.g., +35.15 (+1.25%)" onChange={e => onChange(index, 'change', e.target.value)} disabled={isSubmitting} className={inputClasses} />
            </div>
        </div>
    );
};

const TrendingCard: React.FC<{
    item: TrendingStock;
    index: number;
    onChange: (index: number, field: keyof TrendingStock, value: string) => void;
    onDelete: (index: number) => void;
    isSubmitting: boolean;
}> = ({ item, index, onChange, onDelete, isSubmitting }) => {
    const inputClasses = "p-2 w-full text-sm bg-slate-700 rounded border border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 text-white disabled:opacity-50 transition-colors";

    return (
        <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-sky-500 border border-slate-700/50 space-y-3 relative">
             <button 
                onClick={() => onDelete(index)}
                disabled={isSubmitting}
                aria-label="Delete item"
                className="absolute top-2 right-2 p-1 text-slate-500 hover:text-rose-500 rounded-full hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div>
                <label className="text-xs text-slate-400">Symbol</label>
                <input type="text" value={item.symbol} placeholder="e.g., ZOMATO" onChange={e => onChange(index, 'symbol', e.target.value)} disabled={isSubmitting} className={inputClasses} />
            </div>
             <div>
                <label className="text-xs text-slate-400">Name</label>
                <input type="text" value={item.name} placeholder="e.g., Zomato Ltd." onChange={e => onChange(index, 'name', e.target.value)} disabled={isSubmitting} className={inputClasses} />
            </div>
            <div>
                <label className="text-xs text-slate-400">Reason</label>
                <textarea value={item.reason} placeholder="e.g., Profitability Milestone" onChange={e => onChange(index, 'reason', e.target.value)} disabled={isSubmitting} className={`${inputClasses} h-20 resize-y`} />
            </div>
        </div>
    );
};


const DataManagementTab: React.FC = () => {
    const [marketData, setMarketData] = useState<{ gainers: MarketMover[], losers: MarketMover[], trending: TrendingStock[] }>({
        gainers: [],
        losers: [],
        trending: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await adminService.getMarketMovers();
            setMarketData(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch market data.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSave = async () => {
        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);
        try {
            await adminService.updateMarketMovers(marketData);
            setSuccessMessage("Market data updated successfully!");
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err: any) {
            setError(err.message || "Failed to save market data.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleDataChange = <T extends 'gainers' | 'losers' | 'trending'>(
        type: T, 
        index: number, 
        field: keyof (typeof marketData)[T][0], 
        value: string
    ) => {
        setMarketData(prevData => {
            const updatedItems = [...prevData[type]];
            // @ts-ignore
            updatedItems[index] = { ...updatedItems[index], [field]: value };
            return { ...prevData, [type]: updatedItems };
        });
    };

    const handleDeleteItem = (type: 'gainers' | 'losers' | 'trending', index: number) => {
        setMarketData(prevData => {
            const updatedItems = [...prevData[type]];
            updatedItems.splice(index, 1);
            return { ...prevData, [type]: updatedItems };
        });
    }

    const handleAddItem = (type: 'gainers' | 'losers' | 'trending') => {
        setMarketData(prevData => {
            let newItem: any;
            if (type === 'trending') {
                newItem = { symbol: '', name: '', reason: ''};
            } else {
                newItem = { symbol: '', price: '', change: ''};
            }
            return { ...prevData, [type]: [...prevData[type], newItem] };
        });
    }

    if (isLoading) {
        return <div className="text-center p-8">Loading market data...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Edit Market Movers</h3>
                <button
                    onClick={handleSave}
                    disabled={isSubmitting || isLoading}
                    className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-wait transition-colors"
                >
                    {isSubmitting ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>
            
             {error && (
                <div className="p-3 text-sm text-red-200 bg-red-800/50 rounded-lg flex justify-between items-center">
                    <span>{error}</span>
                    <button onClick={() => setError(null)} className="font-bold text-lg leading-none">&times;</button>
                </div>
            )}
             {successMessage && (
                <div className="p-3 text-sm text-green-200 bg-green-800/50 rounded-lg">
                    {successMessage}
                </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Gainers Column */}
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-green-400">Top Gainers</h4>
                    {marketData.gainers.map((item, index) => (
                        <MoverCard key={`gainer-${index}`} item={item} index={index} type="gainer" onChange={(i, f, v) => handleDataChange('gainers', i, f, v)} onDelete={() => handleDeleteItem('gainers', index)} isSubmitting={isSubmitting} />
                    ))}
                    <button onClick={() => handleAddItem('gainers')} disabled={isSubmitting} className="w-full p-2 text-sm font-semibold text-white bg-slate-700 hover:bg-slate-600 rounded-lg border border-dashed border-slate-500 transition-colors disabled:opacity-50">
                        + Add Gainer
                    </button>
                </div>

                {/* Losers Column */}
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-red-400">Top Losers</h4>
                    {marketData.losers.map((item, index) => (
                        <MoverCard key={`loser-${index}`} item={item} index={index} type="loser" onChange={(i, f, v) => handleDataChange('losers', i, f, v)} onDelete={() => handleDeleteItem('losers', index)} isSubmitting={isSubmitting} />
                    ))}
                     <button onClick={() => handleAddItem('losers')} disabled={isSubmitting} className="w-full p-2 text-sm font-semibold text-white bg-slate-700 hover:bg-slate-600 rounded-lg border border-dashed border-slate-500 transition-colors disabled:opacity-50">
                        + Add Loser
                    </button>
                </div>

                {/* Trending Column */}
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-sky-400">Trending Stocks</h4>
                    {marketData.trending.map((item, index) => (
                        <TrendingCard key={`trending-${index}`} item={item} index={index} onChange={(i, f, v) => handleDataChange('trending', i, f, v)} onDelete={() => handleDeleteItem('trending', index)} isSubmitting={isSubmitting} />
                    ))}
                    <button onClick={() => handleAddItem('trending')} disabled={isSubmitting} className="w-full p-2 text-sm font-semibold text-white bg-slate-700 hover:bg-slate-600 rounded-lg border border-dashed border-slate-500 transition-colors disabled:opacity-50">
                        + Add Trending Stock
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataManagementTab;
