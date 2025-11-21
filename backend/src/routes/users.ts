
import { Router } from 'express';
import { mockUsers, persistData } from '../data/db';
import { AdminUser } from '../types';

const router = Router();

// Get all users
router.get('/', (req, res) => {
    res.json(mockUsers);
});

// Add user
router.post('/', (req, res) => {
    if (mockUsers.length >= 21) {
        return res.status(403).json({ success: false, message: 'User limit of 21 (20 users + 1 admin) has been reached. Please delete a user before adding a new one.' });
    }
    const user = req.body;
    const newUser: AdminUser = {
        ...user,
        id: `usr_${Date.now()}`,
        joinedDate: new Date().toISOString().split('T')[0],
        totalInvested: 0,
        totalReturns: 0,
        ytdReturnPercent: 0,
        dayChange: 0,
        dayChangePercent: 0,
        installments: [],
    };
    mockUsers.unshift(newUser);
    persistData();
    res.status(201).json(newUser);
});

// Delete a single user
router.delete('/:userId', (req, res) => {
    const { userId } = req.params;
    const initialLength = mockUsers.length;
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    
    if (userIndex > -1) {
        mockUsers.splice(userIndex, 1);
        persistData();
    }
    
    if (mockUsers.length < initialLength) {
        res.status(200).json({ success: true });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});

// Delete multiple users
router.delete('/', (req, res) => {
    const { userIds } = req.body;
    if (!userIds || !Array.isArray(userIds)) {
        return res.status(400).json({ message: 'userIds array is required in the body' });
    }
    const initialLength = mockUsers.length;
    const idSet = new Set(userIds);
    const usersToKeep = mockUsers.filter(u => !idSet.has(u.id));
    
    if (usersToKeep.length < initialLength) {
        mockUsers.length = 0;
        mockUsers.push(...usersToKeep);
        persistData();
        res.status(200).json({ success: true });
    } else {
        res.status(200).json({ success: false, message: 'No matching users found to delete' });
    }
});

// Update all users data (for portfolio tab)
router.put('/', (req, res) => {
    const updatedUsers = req.body;
    if (!Array.isArray(updatedUsers)) {
        return res.status(400).json({ message: 'Request body must be an array of users' });
    }
    mockUsers.length = 0;
    mockUsers.push(...updatedUsers);
    persistData();
    res.status(200).json({ success: true });
});

export default router;
