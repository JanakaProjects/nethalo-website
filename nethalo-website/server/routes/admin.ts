import { Router, Request, Response } from 'express';
import { getDb } from '../db.js';
import bcrypt from 'bcryptjs';

const router = Router();

router.get('/users', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const db = getDb();
  const users = db.prepare('SELECT id, name, email, role, school, created_at FROM users ORDER BY created_at DESC').all();
  res.json({ users });
});

router.put('/users/:id', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const { name, email, role } = req.body;
  const db = getDb();
  db.prepare('UPDATE users SET name=COALESCE(?,name), email=COALESCE(?,email), role=COALESCE(?,role) WHERE id=?')
    .run(name || null, email || null, role || null, req.params.id);
  res.json({ success: true });
});

router.delete('/users/:id', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const db = getDb();
  db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

router.get('/stats', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const db = getDb();
  const totalUsers = (db.prepare('SELECT COUNT(*) as c FROM users').get() as any).c;
  const totalThreats = (db.prepare('SELECT COUNT(*) as c FROM threats').get() as any).c;
  const totalReports = (db.prepare('SELECT COUNT(*) as c FROM reports').get() as any).c;
  const byRole = db.prepare('SELECT role, COUNT(*) as count FROM users GROUP BY role').all();
  res.json({ totalUsers, totalThreats, totalReports, usersByRole: byRole });
});

export default router;