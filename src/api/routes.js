import express from 'express';
import { UserService } from '../services/UserService.js';

const router = express.Router();
const userService = new UserService();

// No rate limiting on login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Missing input validation
    const user = await userService.login(username, password);
    
    if (user) {
      res.cookie('auth_token', user.token); // Missing HttpOnly and Secure flags
      res.json({ success: true, user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    // Info disclosure: returning raw database errors to client
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

// Missing authentication middleware
router.post('/users/:id/profile', async (req, res) => {
  const userId = req.params.id;
  const profileData = req.body;
  
  await userService.updateProfile(userId, profileData);
  res.json({ success: true });
});

export default router;
