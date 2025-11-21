import React, { useState, useEffect } from 'react';
import { BLOG_POSTS } from '../constants';
import { clientService } from '../services/clientService';
import { MarketMover, TrendingStock } from '../types';

const GainersLosersTable: React.FC<{ title: string; data: MarketMover[] }> = ({ title, data }) => {
    const isGainer = title.includes('Gainers');
    return (
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden h-full flex flex-col">
            <h3 className="p-4 text-lg font-semibold text-white border-b border-slate-700">{title}</h3>
            <div className="overflow-x-auto flex-grow">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Symbol</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Change</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {data.map((item) => (
                            <tr key={item.symbol} className="hover:bg-slate-700/50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-yellow-400">{item.symbol}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 text-right">{item.price}</td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${isGainer ? 'text-green-400' : 'text-red-400'}`}>{item.change}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const TrendingTable: React.FC<{ title: string; data: TrendingStock[] }> = ({ title, data }) => (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden h-full flex flex-col">
        <h3 className="p-4 text-lg font-semibold text-white border-b border-slate-700">{title}</h3>
        <div className="overflow-x-auto flex-grow">
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Reason</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                    {data.map((item) => (
                        <tr key={item.symbol} className="hover:bg-slate-700/50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div className="font-medium text-yellow-400">{item.symbol}</div>
                                <div className="text-xs text-slate-400">{item.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{item.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const BlogPage: React.FC = () => {
    const [marketData, setMarketData] = useState<{ gainers: MarketMover[], losers: MarketMover[], trending: TrendingStock[] }>({ gainers: [], losers: [], trending: [] });
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        const fetchMovers = async () => {
            setIsLoading(true);
            try {
                const data = await clientService.getMarketMovers();
                setMarketData(data);
            } catch (error) {
                console.error("Failed to fetch market movers:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovers();
    }, []);

    const renderMarketData = () => {
        if (isLoading) {
            return <div className="text-center p-8 text-slate-400">Loading market data...</div>;
        }
        return (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <GainersLosersTable title="Top Gainers" data={marketData.gainers} />
                <GainersLosersTable title="Top Losers" data={marketData.losers} />
                <TrendingTable title="Trending Stocks" data={marketData.trending} />
            </div>
        );
    }

  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">Market Insights & Blog</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
            Stay ahead with Apex Financials's expert analysis of the Indian financial landscape.
          </p>
        </div>

        <section className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Today's Market Snapshot</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700">
                    <h3 className="text-2xl font-bold text-yellow-400 mb-4">National Stock Exchange (NSE)</h3>
                    <p className="text-slate-400">The NSE is India's largest financial market. The Nifty 50 index is a benchmark for the Indian equity market, representing the weighted average of 50 of the largest Indian companies listed on the NSE.</p>
                </div>
                <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700">
                    <h3 className="text-2xl font-bold text-yellow-400 mb-4">Bombay Stock Exchange (BSE)</h3>
                    <p className="text-slate-400">Established in 1875, the BSE is Asia's first stock exchange. The S&P BSE Sensex is a free-float market-weighted stock market index of 30 well-established and financially sound companies listed on the BSE.</p>
                </div>
            </div>
            {renderMarketData()}
        </section>

        <section className="mt-24">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">From Our Analysts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BLOG_POSTS.map((post, index) => (
                    <div key={index} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden group flex flex-col">
                        <div className="overflow-hidden">
                          <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <p className="text-sm text-indigo-400 font-semibold">{post.category}</p>
                            <h3 className="mt-2 text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors flex-grow">{post.title}</h3>
                            <div className="mt-4 flex items-center text-sm text-slate-400">
                                <span>{post.date}</span>
                                <span className="mx-2">&middot;</span>
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPage;