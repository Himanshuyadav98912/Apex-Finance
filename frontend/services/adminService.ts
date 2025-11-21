import { AdminUser, MarketMover, TrendingStock } from '../types';

const API_BASE = '/api';

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    // Handle responses with no content
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
    }
    return { success: true };
};

export const adminService = {
  getUsers: (): Promise<AdminUser[]> => {
    return fetch(`${API_BASE}/users`).then(handleResponse);
  },

  addUser: (user: Omit<AdminUser, 'id' | 'joinedDate' | 'totalInvested' | 'totalReturns' | 'ytdReturnPercent' | 'dayChange' | 'dayChangePercent' | 'installments'>): Promise<AdminUser> => {
    return fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }).then(handleResponse);
  },

  deleteUser: (userId: string): Promise<{success: boolean}> => {
    return fetch(`${API_BASE}/users/${userId}`, {
        method: 'DELETE'
    }).then(handleResponse);
  },
  
  deleteUsers: (userIds: string[]): Promise<{success: boolean}> => {
     return fetch(`${API_BASE}/users`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userIds })
     }).then(handleResponse);
  },

  getMarketMovers: (): Promise<{ gainers: MarketMover[], losers: MarketMover[], trending: TrendingStock[] }> => {
      return fetch(`${API_BASE}/market/movers`).then(handleResponse);
  },

  updateMarketMovers: (data: { gainers: MarketMover[], losers: MarketMover[], trending: TrendingStock[] }): Promise<{success: boolean}> => {
      return fetch(`${API_BASE}/market/movers`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      }).then(handleResponse);
  },

  updateUsersData: (updatedUsers: AdminUser[]): Promise<{success: boolean}> => {
    return fetch(`${API_BASE}/users`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUsers)
    }).then(handleResponse);
  },
};
