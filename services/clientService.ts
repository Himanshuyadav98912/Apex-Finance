import { mockUsers, mockMarketGainers, mockMarketLosers, mockTrendingStocks } from '../mock-db';
import { ClientPortfolio, MarketMover, TrendingStock } from '../types';

const LATENCY = 300; // ms

export const clientService = {
  // Get portfolio data for a specific user.
  getUserPortfolio: (userId: string): Promise<ClientPortfolio> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.id === userId);
        if (user) {
          resolve({
            userName: user.name,
            totalInvested: user.totalInvested,
            totalReturns: user.totalReturns,
            ytdReturnPercent: user.ytdReturnPercent,
            dayChange: user.dayChange,
            dayChangePercent: user.dayChangePercent,
            installments: user.installments,
          });
        } else {
            reject(new Error(`User with id ${userId} not found.`));
        }
      }, LATENCY);
    });
  },

  getMarketMovers: (): Promise<{ gainers: MarketMover[], losers: MarketMover[], trending: TrendingStock[] }> => {
      return new Promise(resolve => {
          setTimeout(() => {
              resolve({
                  gainers: [...mockMarketGainers],
                  losers: [...mockMarketLosers],
                  trending: [...mockTrendingStocks]
              });
          }, LATENCY);
      });
  },
};