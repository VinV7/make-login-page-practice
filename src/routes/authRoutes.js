import express from 'express';
import { loginAuthenticate, logoutFromSite } from '../controllers/authController.js'
const router = express.Router();

router.post('/login', loginAuthenticate);

router.post('/logout', logoutFromSite);

export default router;