import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { getDb } from '../db.js';
import { generateToken } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/login
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password required' });
    return;
  }

  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
  if (!user) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const token = generateToken({ userId: user.id, email: user.email, role: user.role });
  const { password: _, ...userData } = user;
  res.json({ token, user: userData });
});

// POST /api/auth/signup
router.post('/signup', (req: Request, res: Response) => {
  const { name, email, password, role, school, age, child_name } = req.body;
  if (!name || !email || !password || !role) {
    res.status(400).json({ error: 'name, email, password, and role required' });
    return;
  }

  const db = getDb();
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    res.status(409).json({ error: 'Email already registered' });
    return;
  }

  const id = `u${Date.now()}`;
  const hashed = bcrypt.hashSync(password, 10);
  db.prepare(
    'INSERT INTO users (id, name, email, password, role, school, age, child_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(id, name, email, hashed, role, school || null, age || null, child_name || null);

  const token = generateToken({ userId: id, email, role });
  res.status(201).json({
    token,
    user: { id, name, email, role, school: school || null, age: age || null },
  });
});

// GET /api/auth/me
router.get('/me', (req: Request, res: Response) => {
  // Requires auth middleware to set req.user
  if (!req.user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  const db = getDb();
  const user = db.prepare('SELECT id, name, email, role, school, age, child_name, created_at FROM users WHERE id = ?').get(req.user.userId) as any;
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.json({ user });
});

export default router;
