import express from 'express';
import notFound from './src/middlewares/error/notFound.js'
import authRoutes from './src/routes/authRoutes.js'
import path from 'path';
import errorHandler from './src/middlewares/error/errorHandler.js'
import logger from './src/middlewares/debug/logger.js'
import session from './src/config/session.js';
import requireAuth from './src/middlewares/session/sessionAuth.js'
import checkAuthenticated from './src/middlewares/session/checkSession.js';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 5000;
const app = express();

// Logger Debug Middleware
app.use(logger) 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Express session (Cookies) middleware
app.use((session));

// Routes
app.get('/', checkAuthenticated, (req, res) => {
    const sessionId = req.sessionID;
    console.log(sessionId)
    res.sendFile(path.join(__dirname, 'public', 'views', 'login.html'));
});

app.use('/auth', authRoutes);

app.get('/home', requireAuth, (req, res) => {
    console.log(req.session)
    res.sendFile(path.join(__dirname, 'public', 'views', 'homepage.html'));
});

// Error handler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
