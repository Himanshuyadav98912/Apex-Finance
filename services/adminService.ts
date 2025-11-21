import { mockUsers, mockMarketGainers, mockMarketLosers, mockTrendingStocks } from '../mock-db';
import { AdminUser, MarketMover, TrendingStock } from '../types';

const LATENCY = 500; // ms

export const adminService = {
  getUsers: (): Promise<AdminUser[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([...mockUsers]);
      }, LATENCY / 2);
    });
  },

  addUser: (user: Omit<AdminUser, 'id' | 'joinedDate' | 'totalInvested' | 'totalReturns' | 'ytdReturnPercent' | 'dayChange' | 'dayChangePercent' | 'installments'>): Promise<AdminUser> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newUser: AdminUser = {
          ...user,
          id: `usr_${Date.now()}`,
          joinedDate: new Date().toISOString().split('T')[0],
          totalInvested: 0,
          totalReturns: 0,
          ytdReturnPercent: 0,
          dayChange: 0,
          dayChangePercent: 0,
          installments: [],
        };
        mockUsers.unshift(newUser);
        resolve(newUser);
      }, LATENCY);
    });
  },

  deleteUser: (userId: string): Promise<boolean> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const initialLength = mockUsers.length;
        const userIndex = mockUsers.findIndex(u => u.id === userId);
        if (userIndex > -1) {
            mockUsers.splice(userIndex, 1);
        }
        resolve(mockUsers.length < initialLength);
      }, LATENCY);
    });
  },
  
  deleteUsers: (userIds: string[]): Promise<boolean> => {
     return new Promise(resolve => {
      setTimeout(() => {
        const initialLength = mockUsers.length;
        const idSet = new Set(userIds);
        const usersToKeep = mockUsers.filter(u => !idSet.has(u.id));
        mockUsers.length = 0;
        mockUsers.push(...usersToKeep);
        resolve(mockUsers.length < initialLength);
      }, LATENCY * 1.5);
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
          }, LATENCY / 2);
      });
  },

  updateMarketMovers: (data: { gainers: MarketMover[], losers: MarketMover[], trending: TrendingStock[] }): Promise<boolean> => {
      return new Promise(resolve => {
          setTimeout(() => {
              mockMarketGainers.length = 0;
              mockMarketGainers.push(...data.gainers);
              mockMarketLosers.length = 0;
              mockMarketLosers.push(...data.losers);
              mockTrendingStocks.length = 0;
              mockTrendingStocks.push(...data.trending);
              resolve(true);
          }, LATENCY);
      });
  },

  updateUsersData: (updatedUsers: AdminUser[]): Promise<boolean> => {
    return new Promise(resolve => {
        setTimeout(() => {
            mockUsers.length = 0;
            mockUsers.push(...updatedUsers);
            resolve(true);
        }, LATENCY);
    });
  },
};