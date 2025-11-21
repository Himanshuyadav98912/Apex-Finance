import { AdminUser, MarketMover, InvestmentInstallment, TrendingStock } from '../types';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix: __dirname is not available in ES modules, so we define it manually.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Persistence ---
const dataPath = path.resolve(__dirname, 'db.json');

interface DBState {
    users: AdminUser[];
    gainers: MarketMover[];
    losers: MarketMover[];
    trending: TrendingStock[];
}

const saveData = (data: DBState) => {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error("Failed to save data:", error);
    }
};

// --- Initial Data Generation ---

const generateInstallments = (baseInvestment: number): { installments: InvestmentInstallment[], total: number } => {
    const installments: InvestmentInstallment[] = [];
    let remaining = baseInvestment;
    let count = Math.floor(Math.random() * 5) + 3; // 3 to 7 installments

    for(let i = count; i > 0; i--) {
        const installmentAmount = i === 1 ? remaining : Math.round((remaining / i) * (Math.random() * 0.4 + 0.8));
        remaining -= installmentAmount;
        
        const date = new Date();
        date.setMonth(date.getMonth() - (Math.random() * 12));
        date.setDate(Math.floor(Math.random() * 28) + 1);

        installments.push({
            date: date.toISOString().split('T')[0],
            amount: installmentAmount,
        });
    }
    
    const total = installments.reduce((acc, curr) => acc + curr.amount, 0);
    return { installments: installments.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()), total };
};


const generateUser = (id: number, name: string, email: string, role: string, joinedDate: string): AdminUser => {
    const baseInvestment = Math.random() * (5000000 - 500000) + 500000;
    const { installments, total: totalInvested } = generateInstallments(baseInvestment);

    const returnMultiplier = Math.random() * (1.5 - 0.9) + 0.9;
    const totalReturns = totalInvested * returnMultiplier;
    const ytdReturnPercent = ((totalReturns - totalInvested) / totalInvested) * 100;

    const dayChangePercent = (Math.random() * 4 - 2); // -2% to +2%
    const dayChange = (totalReturns * dayChangePercent) / 100;

    return {
        id: `usr_${id}`,
        name,
        email,
        password: `password${id}$!`,
        role,
        joinedDate,
        totalInvested: Math.round(totalInvested),
        totalReturns: Math.round(totalReturns),
        ytdReturnPercent: parseFloat(ytdReturnPercent.toFixed(2)),
        dayChange: Math.round(dayChange),
        dayChangePercent: parseFloat(dayChangePercent.toFixed(2)),
        installments,
    };
};

const generateInitialState = (): DBState => {
    const users: AdminUser[] = [
        generateUser(1, 'Alex Thompson', 'alex.t@example.com', 'Admin', '2023-01-15'),
        generateUser(2, 'Brenda Chen', 'brenda.c@example.com', 'Analyst', '2023-03-22'),
        generateUser(3, 'Carlos Diaz', 'carlos.d@example.com', 'Junior Analyst', '2023-05-10'),
        generateUser(4, 'Diana Evans', 'diana.e@example.com', 'Trader', '2022-11-30'),
        generateUser(5, 'Ethan Foster', 'ethan.f@example.com', 'Analyst', '2023-08-01'),
    ];

    for (let i = 6; i <= 20; i++) {
        users.push(
            generateUser(
                i,
                `User ${i}`,
                `user.${i}@example.com`,
                i % 3 === 0 ? 'Trader' : 'Analyst',
                `2023-0${Math.floor(i / 2)}-${i > 9 ? i : '0' + i}`
            )
        );
    }
    
    const gainers: MarketMover[] = [
        { symbol: 'TATAMOTORS', price: '₹635.20', change: '+25.40 (+4.16%)' },
        { symbol: 'ADANIENT', price: '₹2450.75', change: '+82.15 (+3.47%)' },
        { symbol: 'HDFCBANK', price: '₹1530.10', change: '+45.90 (+3.09%)' },
        { symbol: 'BAJFINANCE', price: '₹7912.50', change: '+210.30 (+2.73%)' },
    ];

    const losers: MarketMover[] = [
        { symbol: 'INFY', price: '₹1350.45', change: '-33.80 (-2.44%)' },
        { symbol: 'WIPRO', price: '₹389.90', change: '-7.60 (-1.91%)' },
        { symbol: 'TCS', price: '₹3415.60', change: '-55.25 (-1.59%)' },
        { symbol: 'HCLTECH', price: '₹1255.80', change: '-18.05 (-1.42%)' },
    ];
    
    const trending: TrendingStock[] = [
        { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', reason: 'Post-AGM Announcements' },
        { symbol: 'ZOMATO', name: 'Zomato Ltd.', reason: 'Profitability Milestone' },
        { symbol: 'PAYTM', name: 'One97 Communications Ltd.', reason: 'New Partnership News' },
        { symbol: 'IRFC', name: 'Indian Railway Finance Corp', reason: 'High Trading Volume' },
    ];

    return { users, gainers, losers, trending };
};

// --- Data Loading & Initialization ---
const loadData = (): DBState => {
    try {
        if (fs.existsSync(dataPath)) {
            const fileContent = fs.readFileSync(dataPath, 'utf-8');
            // Basic validation
            const data = JSON.parse(fileContent);
            if (data.users && data.gainers && data.losers && data.trending) {
                return data;
            }
        }
    } catch (error) {
        console.error("Failed to load or parse db.json, will re-initialize:", error);
    }
    // If file doesn't exist or is corrupt, create a new one from initial state
    const initialState = generateInitialState();
    saveData(initialState);
    return initialState;
};

const db = loadData();

// --- Exported Data & Persistence Function ---
export let mockUsers: AdminUser[] = db.users;
export let mockMarketGainers: MarketMover[] = db.gainers;
export let mockMarketLosers: MarketMover[] = db.losers;
export let mockTrendingStocks: TrendingStock[] = db.trending;

export const persistData = () => {
    const currentState: DBState = {
        users: mockUsers,
        gainers: mockMarketGainers,
        losers: mockMarketLosers,
        trending: mockTrendingStocks,
    };
    saveData(currentState);
};
