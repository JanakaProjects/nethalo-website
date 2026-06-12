import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
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
import journalRoutes from './routes/journal.js';
import adminRoutes from './routes/admin.js';
import { Request, Response } from 'express';
import { getDb } from './db.js';
import { setupSwagger } from './swagger.js';
import { startWeeklyDigest } from './services/digest.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: { origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'], credentials: true }
});
const PORT = parseInt(process.env.PORT || '3001', 10);

// WebSocket for real-time threat alerts
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('join', (userId: string) => {
    socket.join(userId);
    console.log('User joined room:', userId);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Export threat alert function for use in other routes
export function emitThreatAlert(userId: string, threat: any) {
  io.to(userId).emit('new_threat', threat);
}

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'], credentials: true }));
app.use(express.json());

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
app.use('/api/journal', authMiddleware, journalRoutes);
app.use('/api/admin', authMiddleware, adminRoutes);

// Export CSV route
app.get('/api/export/threats', authMiddleware, (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  const db = getDb();
  const threats = db.prepare('SELECT * FROM threats WHERE user_id = ? ORDER BY timestamp DESC').all(req.user.userId);
  
  let csv = 'id,platform,type,severity,message,timestamp,blocked\n';
  for (const t of threats) {
    csv += `${t.id},${t.platform},${t.type},${t.severity},"${t.message}",${t.timestamp},${t.blocked}\n`;
  }
  
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=threats.csv');
  res.send(csv);
});

app.get('/api/export/reports', authMiddleware, (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  const db = getDb();
  const reports = db.prepare('SELECT * FROM reports WHERE user_id = ? ORDER BY created_at DESC').all(req.user.userId);
  
  let csv = 'id,type,description,target_name,created_at\n';
  for (const r of reports) {
    csv += `${r.id},${r.type},"${r.description}",${r.target_name},${r.created_at}\n`;
  }
  
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=reports.csv');
  res.send(csv);
});

setupSwagger(app);

app.use((_req, res) => {
  res.sendFile(resolve(distPath, 'index.html'));
});

initDb();
startWeeklyDigest();
httpServer.listen(PORT, () => {
  console.log(`National Hate Crime backend running on http://localhost:${PORT}`);
});

export default app;
