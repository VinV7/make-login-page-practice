import express from 'express';
import loginAuthenticate from '../controllers/authController.js'
const router = express.Router();

router.post('/login', loginAuthenticate);

export default router;