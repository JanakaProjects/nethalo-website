import express from 'express';
import cors from 'cors';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { initDb } from './db.js';
import { authMiddleware } from './middleware/auth.js';
import authRoutes from './routes/auth.js';
import threatRoutes from './routes/threats.js';
import childRoutes from './routes/children.js';
import dashboardRoutes from './routes/dashboard.js';
import reportRoutes from './routes/reports.js';
import accountRoutes from './routes/accounts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

// Middleware
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'], credentials: true }));
app.use(express.json());

// Serve static files from dist in production
const distPath = resolve(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/threats', authMiddleware, threatRoutes);
app.use('/api/children', authMiddleware, childRoutes);
app.use('/api/dashboard', authMiddleware, dashboardRoutes);
app.use('/api/reports', authMiddleware, reportRoutes);
app.use('/api/accounts', authMiddleware, accountRoutes);

// Fallback to index.html for SPA routing
app.use((_req, res) => {
  res.sendFile(resolve(distPath, 'index.html'));
});

// Initialize DB and start server
initDb();
app.listen(PORT, () => {
  console.log(`NETHALO backend running on http://localhost:${PORT}`);
});

export default app;
