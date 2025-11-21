import React, { useState } from 'react';
import { ICONS } from '../constants';
import { AdminUser } from '../types';
import { mockUsers } from '../mock-db';

interface LoginFormPageProps {
  onClientLogin: (user: AdminUser) => void;
  onAdminLogin: (user: AdminUser) => void;
}

function LoginFormPage({ onClientLogin, onAdminLogin }: LoginFormPageProps) {
  const [loginType, setLoginType] = useState<'client' | 'admin'>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginTypeChange = (type: 'client' | 'admin') => {
      setLoginType(type);
      setError('');
      setEmail('');
      setPassword('');
      setShowPassword(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
        setError("Email and password are required.");
        return;
    }

    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || user.password !== password) {
      setError("Invalid email or password.");
      return;
    }
    
    if (loginType === 'admin') {
      if (user.role !== 'Admin') {
        setError("This user does not have admin privileges. Try the Client Login.");
        return;
      }
      onAdminLogin(user);
    } else { // 'client'
      if (user.role === 'Admin') {
        setError("Admin accounts must use the Admin Login.");
        return;
      }
      onClientLogin(user);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute bg-indigo-500 rounded-full -left-20 -top-20 w-96 h-96 mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bg-yellow-500 rounded-full -right-20 -bottom-40 w-96 h-96 mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bg-purple-500 rounded-full -bottom-20 left-40 w-96 h-96 mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl z-10 border border-slate-700">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4 text-yellow-400">
            {ICONS.logo}
            <h1 className="ml-3 text-4xl font-extrabold text-white">
              Apex Financials
            </h1>
          </div>
          <p className="text-slate-400">Portal Access</p>
        </div>

        <div className="flex p-1 bg-slate-700/50 rounded-lg">
          <button
            onClick={() => handleLoginTypeChange('client')}
            className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${loginType === 'client' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
          >
            Client Login
          </button>
          <button
            onClick={() => handleLoginTypeChange('admin')}
            className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${loginType === 'admin' ? 'bg-rose-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
          >
            Admin Login
          </button>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="p-3 text-sm text-red-200 bg-red-800/50 rounded-lg text-center">{error}</div>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input 
                id="email-address" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                className="appearance-none rounded-none relative block w-full px-3 py-3 bg-slate-700 border border-slate-600 placeholder-slate-400 text-white rounded-t-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input 
                id="password" 
                name="password" 
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password" 
                required 
                className="appearance-none rounded-none relative block w-full px-3 py-3 bg-slate-700 border border-slate-600 placeholder-slate-400 text-white rounded-b-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 z-20 px-3 flex items-center text-slate-400 hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? ICONS.eyeOff : ICONS.eye}
              </button>
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loginType === 'client' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-rose-600 hover:bg-rose-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-800 transition-all duration-300`}
            >
              Sign In to {loginType === 'client' ? 'Dashboard' : 'Admin Panel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginFormPage;