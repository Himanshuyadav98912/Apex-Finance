
import { Router } from 'express';
import { mockMarketGainers, mockMarketLosers, mockTrendingStocks, persistData } from '../data/db';

const router = Router();

// Get market movers
router.get('/movers', (req, res) => {
    res.json({
        gainers: mockMarketGainers,
        losers: mockMarketLosers,
        trending: mockTrendingStocks
    });
});

// Update market movers
router.put('/movers', (req, res) => {
    const { gainers, losers, trending } = req.body;
    if (gainers === undefined || losers === undefined || trending === undefined) {
        return res.status(400).json({ message: 'gainers, losers, and trending arrays are required' });
    }
    
    mockMarketGainers.length = 0;
    mockMarketGainers.push(...gainers);

    mockMarketLosers.length = 0;
    mockMarketLosers.push(...losers);
    
    mockTrendingStocks.length = 0;
    mockTrendingStocks.push(...trending);

    persistData();
    res.status(200).json({ success: true });
});

export default router;
