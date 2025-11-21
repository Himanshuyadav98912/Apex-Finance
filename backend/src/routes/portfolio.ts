import { Router } from 'express';
import { mockUsers } from '../data/db';

const router = Router();

// Get portfolio for a specific user
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
        const portfolioData = {
            userName: user.name,
            totalInvested: user.totalInvested,
            totalReturns: user.totalReturns,
            ytdReturnPercent: user.ytdReturnPercent,
            dayChange: user.dayChange,
            dayChangePercent: user.dayChangePercent,
            installments: user.installments,
        };
        res.json(portfolioData);
    } else {
        res.status(404).json({ message: `User with id ${userId} not found.` });
    }
});

export default router;