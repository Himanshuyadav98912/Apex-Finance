export interface PortfolioHolding {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  change: number;
  changePercent: number;
}

export interface ChartDataPoint {
  date: string;
  invested: number;
  returns: number;
}

export interface CareerOpening {
  title: string;
  department: string;
  location: string;
}

export interface AllocationData {
    name: string;
    value: number;
    color: string;
}

export interface InvestmentInstallment {
    date: string;
    amount: number;
}

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    joinedDate: string;
    totalInvested: number;
    totalReturns: number;
    ytdReturnPercent: number;
    dayChange: number;
    dayChangePercent: number;
    installments: InvestmentInstallment[];
}

export interface MarketMover {
    symbol: string;
    price: string;
    change: string;
}

export interface TrendingStock {
    symbol: string;
    name: string;
    reason: string;
}

export interface ClientPortfolio {
    userName: string;
    totalInvested: number;
    totalReturns: number;
    ytdReturnPercent: number;
    dayChange: number;
    dayChangePercent: number;
    installments: InvestmentInstallment[];
}

export interface Review {
  name: string;
  title: string;
  rating: number;
  reviewText: string;
  avatar: string;
}