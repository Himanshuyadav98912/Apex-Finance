
import { AdminUser } from '../types';

const API_BASE = '/api';

const handleResponse = async (response: Response) => {
    const resJson = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(resJson.message || `HTTP error! status: ${response.status}`);
    }
    return resJson;
};

export const authService = {
  login: (email: string, password: string, loginType: 'client' | 'admin'): Promise<AdminUser> => {
    return fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, loginType })
    }).then(handleResponse);
  },
};
