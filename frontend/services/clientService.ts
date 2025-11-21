import { ClientPortfolio, MarketMover, TrendingStock } from '../types';

const API_BASE = '/api';

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const clientService = {
  // Get portfolio data for a specific user.
  getUserPortfolio: (userId: string): Promise<ClientPortfolio> => {
    return fetch(`${API_BASE}/portfolio/${userId}`).then(handleResponse);
  },

  getMarketMovers: (): Promise<{ gainers: MarketMover[], losers: MarketMover[], trending: TrendingStock[] }> => {
      return fetch(`${API_BASE}/market/movers`).then(handleResponse);
  },
};
