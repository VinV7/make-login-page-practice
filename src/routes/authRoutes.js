import express from 'express';

// Controllers Import
import { loginAuthenticate, logoutFromSite } from '../controllers/authController.js'

const router = express.Router();

// === Routes === 
router.post('/login', loginAuthenticate);

router.post('/logout', logoutFromSite);

export default router;