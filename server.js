import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Middlewares
import logger from "./src/middlewares/debug/logger.js";
import session from "./src/config/session.js";
import requireAuth from "./src/middlewares/session/sessionAuth.js";
import checkAuthenticated from "./src/middlewares/session/checkSession.js";
import notFound from "./src/middlewares/error/notFound.js";
import errorHandler from "./src/middlewares/error/errorHandler.js";

// Routes
import authRoutes from "./src/routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// === Path Setup ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, "public");
const VIEWS_DIR = path.join(PUBLIC_DIR, "views");

// === Core Middleware ===
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session);
app.use(express.static('public'));
app.use(express.static(PUBLIC_DIR));

// === Route Handlers ===
const sendView = (res, file) => {
  return res.sendFile(path.join(VIEWS_DIR, file));
};

// === Routes ===
app.get("/", checkAuthenticated, (req, res) => {
  return sendView(res, "login.html");
});

app.use("/auth", authRoutes);

app.get("/home", requireAuth, (req, res) => {
  return sendView(res, "homepage.html");
});

// === Error Handling ===
app.use(notFound);
app.use(errorHandler);

// === Server Start ===
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});