import { Router } from 'express';
import { mockUsers } from '../data/db';
import { AdminUser } from '../types';

const router = Router();

router.post('/login', (req, res) => {
    const { email, password, loginType } = req.body;

    if (!email || !password || !loginType) {
        return res.status(400).json({ message: 'Email, password, and loginType are required.' });
    }

    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    
    if (loginType === 'admin') {
      if (user.role !== 'Admin') {
        return res.status(403).json({ message: "This user does not have admin privileges. Try the Client Login." });
      }
    } else { // 'client'
      if (user.role === 'Admin') {
        return res.status(403).json({ message: "Admin accounts must use the Admin Login." });
      }
    }

    // Never send the password back to the client
    const userToSend = { ...user };
    delete (userToSend as any).password;

    res.json(userToSend);
});

export default router;