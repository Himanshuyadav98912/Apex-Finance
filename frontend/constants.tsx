

import React from 'react';
import { PortfolioHolding, ChartDataPoint, CareerOpening, AllocationData, MarketMover, Review } from './types';

export const MOCK_PORTFOLIO_HOLDINGS: PortfolioHolding[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', shares: 150, price: 2850.50, change: 35.15, changePercent: 1.25 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', shares: 100, price: 1530.10, change: -10.80, changePercent: -0.70 },
  { symbol: 'INFY', name: 'Infosys Ltd.', shares: 200, price: 1580.75, change: 12.40, changePercent: 0.79 },
  { symbol: 'TCS', name: 'Tata Consultancy', shares: 50, price: 4125.00, change: 45.90, changePercent: 1.12 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd.', shares: 300, price: 1095.20, change: -5.60, changePercent: -0.51 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd.', shares: 120, price: 1218.45, change: 18.20, changePercent: 1.51 },
];

export const MOCK_CHART_DATA: ChartDataPoint[] = [
  { date: 'Jan', invested: 1000000, returns: 1000000 },
  { date: 'Feb', invested: 1050000, returns: 1085000 },
  { date: 'Mar', invested: 1100000, returns: 1210000 },
  { date: 'Apr', invested: 1150000, returns: 1190000 },
  { date: 'May', invested: 1200000, returns: 1300000 },
  { date: 'Jun', invested: 1250000, returns: 1380000 },
  { date: 'Jul', invested: 1300000, returns: 1450000 },
  { date: 'Aug', invested: 1350000, returns: 1520000 },
  { date: 'Sep', invested: 1400000, returns: 1500000 },
  { date: 'Oct', invested: 1450000, returns: 1610000 },
  { date: 'Nov', invested: 1500000, returns: 1720000 },
  { date: 'Dec', invested: 1550000, returns: 1810000 },
];

export const MOCK_ALLOCATION_DATA: AllocationData[] = [
    { name: 'Equity Stocks', value: 450000, color: '#4f46e5' },
    { name: 'Cryptocurrency', value: 150000, color: '#f59e0b' },
    { name: 'Derivatives Trading', value: 250000, color: '#10b981' },
    { name: 'Mutual Funds', value: 150000, color: '#8b5cf6' },
];

export const TEAM_MEMBERS = [
    { 
        name: 'Himanshu Yadav', 
        title: 'Chief Executive Officer', 
        avatar: `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop`,
        bio: "As CEO, Himanshu sets Apex Financials's overall vision and strategy, guiding the firm's mission to revolutionize financial intelligence. His leadership is pivotal to our innovation and market leadership."
    },
    { 
        name: 'Rahul Jhakhra', 
        title: 'Chief Financial Officer', 
        avatar: `https://i.imgur.com/L12n8eS.jpeg`,
        bio: "As CFO, Rahul is responsible for Apex Financials’s financial strategy, overseeing capital allocation, risk management, and financial planning. His extensive experience in capital markets ensures the firm's fiscal integrity and supports its ambitious growth trajectory."
    },
    { 
        name: 'John Doe', 
        title: 'Chief Technical Officer', 
        avatar: `https://i.pravatar.cc/150?u=aditya_tiwari`,
        bio: "As CTO, he drives Apex Financials's technology vision and execution. His leadership is instrumental in building and scaling the firm's proprietary AI-driven platform, ensuring it remains at the cutting edge of financial technology."
    },
    { 
        name: 'Jane Doe', 
        title: 'Chief Analytics Officer', 
        avatar: `https://i.pravatar.cc/150?u=anmol_suman`,
        bio: 'As CAO, she leads the "Quant" team, the architects behind our proprietary ApexAI engine. Her expertise in machine learning and statistical modeling is the driving force behind our predictive analytical capabilities.'
    }
];

export const BLOG_POSTS = [
    {
        category: 'Market Analysis',
        title: 'Navigating Volatility: Key Trends in Indian Equities',
        date: 'October 26, 2023',
        readTime: '6 min read',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
    },
    {
        category: 'Technology',
        title: 'The AI Revolution in Investment Banking',
        date: 'October 22, 2023',
        readTime: '8 min read',
        imageUrl: 'https://images.unsplash.com/photo-1665686306574-1ace09918530?q=80&w=1974&auto=format&fit=crop'
    },
    {
        category: 'Regulatory Update',
        title: 'SEBI\'s Latest Directives: What They Mean for You',
        date: 'October 19, 2023',
        readTime: '4 min read',
        imageUrl: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=2070&auto=format&fit=crop'
    }
];

export const CAREER_OPENINGS: CareerOpening[] = [];

export const MOCK_REVIEWS: Review[] = [
    {
        name: 'Shailesh Lodha',
        title: 'HNI Client',
        rating: 5,
        reviewText: "Apex Financials's analytical prowess is unmatched. Their AI-driven insights have given my portfolio a significant edge, providing clarity in a complex market. The platform is robust, intuitive, and backed by a world-class team.",
        avatar: `https://i.pravatar.cc/150?u=shailesh_lodha`
    },
    {
        name: 'Dilip Joshi',
        title: 'Family Office Manager',
        rating: 5,
        reviewText: 'The level of detail and data-driven strategy Apex Financials provides is exceptional. Their platform has become an indispensable tool for managing our assets, offering predictive analytics that are both accurate and actionable. Truly a game-changer.',
        avatar: `https://i.pravatar.cc/150?u=dilip_joshi`
    },
    {
        name: 'Kartar Singh',
        title: 'Seasoned Trader',
        rating: 4,
        reviewText: 'A powerful platform for any serious market participant. The real-time data streams and AI assistant have helped me identify opportunities I would have otherwise missed. While there\'s a slight learning curve, the payoff is immense.',
        avatar: `https://i.pravatar.cc/150?u=kartar_singh`
    },
    {
        name: 'Gullu Sharma',
        title: 'Tech Entrepreneur & Investor',
        rating: 5,
        reviewText: "As someone from the tech world, I appreciate the sophistication of Apex Financials's technology. They've successfully merged finance with cutting-edge AI, creating a product that is not only powerful but also incredibly reliable. Highly recommended.",
        avatar: `https://i.pravatar.cc/150?u=gullu_sharma`
    }
];


export const ICONS = {
  logo: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" />
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
      <path d="M12 12a5 5 0 0 1 0 10 5 5 0 0 1 0-10Z" />
      <path d="M2 12h20" />
    </svg>
  ),
  dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7"height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  ),
  portfolio: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3" />
      <path d="M12 12h7" />
      <path d="m16 8 4 4-4 4" />
    </svg>
  ),
  insights: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),
  logout: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  ),
  team: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  careers: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <path d="M8 4v16" />
      <path d="M16 4v16" />
      <path d="M4 8h16" />
      <path d="M4 16h16" />
    </svg>
  ),
  blog: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2h0Z" />
      <path d="M16 2v20" />
      <path d="M7 10h2" />
      <path d="M7 14h4" />
      <path d="M7 6h6" />
    </svg>
  ),
  reviews: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  ),
  eye: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  eyeOff: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
  ),
  menu: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
  ),
  close: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  )
};

export const DEFAULT_AVATAR_URI = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23cbd5e1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;