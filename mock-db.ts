import { AdminUser, MarketMover, InvestmentInstallment, TrendingStock } from './types';

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

export let mockUsers: AdminUser[] = [
    generateUser(1, 'Alex Thompson', 'alex.t@example.com', 'Admin', '2023-01-15'),
    generateUser(2, 'Brenda Chen', 'brenda.c@example.com', 'Analyst', '2023-03-22'),
    generateUser(3, 'Carlos Diaz', 'carlos.d@example.com', 'Junior Analyst', '2023-05-10'),
    generateUser(4, 'Diana Evans', 'diana.e@example.com', 'Trader', '2022-11-30'),
    generateUser(5, 'Ethan Foster', 'ethan.f@example.com', 'Analyst', '2023-08-01'),
];

for (let i = 6; i <= 20; i++) {
    mockUsers.push(
        generateUser(
            i,
            `User ${i}`,
            `user.${i}@example.com`,
            i % 3 === 0 ? 'Trader' : 'Analyst',
            `2023-0${Math.floor(i / 2)}-${i > 9 ? i : '0' + i}`
        )
    );
}

export let mockMarketGainers: MarketMover[] = [
    { symbol: 'TATAMOTORS', price: '₹635.20', change: '+25.40 (+4.16%)' },
    { symbol: 'ADANIENT', price: '₹2450.75', change: '+82.15 (+3.47%)' },
    { symbol: 'HDFCBANK', price: '₹1530.10', change: '+45.90 (+3.09%)' },
    { symbol: 'BAJFINANCE', price: '₹7912.50', change: '+210.30 (+2.73%)' },
];

export let mockMarketLosers: MarketMover[] = [
    { symbol: 'INFY', price: '₹1350.45', change: '-33.80 (-2.44%)' },
    { symbol: 'WIPRO', price: '₹389.90', change: '-7.60 (-1.91%)' },
    { symbol: 'TCS', price: '₹3415.60', change: '-55.25 (-1.59%)' },
    { symbol: 'HCLTECH', price: '₹1255.80', change: '-18.05 (-1.42%)' },
];

export let mockTrendingStocks: TrendingStock[] = [
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', reason: 'Post-AGM Announcements' },
    { symbol: 'ZOMATO', name: 'Zomato Ltd.', reason: 'Profitability Milestone' },
    { symbol: 'PAYTM', name: 'One97 Communications Ltd.', reason: 'New Partnership News' },
    { symbol: 'IRFC', name: 'Indian Railway Finance Corp', reason: 'High Trading Volume' },
];