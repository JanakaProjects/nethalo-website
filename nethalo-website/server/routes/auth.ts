import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { getDb } from '../db.js';
import { generateToken, authMiddleware } from '../middleware/auth.js';

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

  const allowedRoles = ['student', 'parent'];
  if (!allowedRoles.includes(role)) {
    res.status(400).json({ error: 'Invalid role' });
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
router.get('/me', authMiddleware, (req: Request, res: Response) => {
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

// POST /api/auth/reset-password
router.post('/reset-password', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: 'Email required' });
    return;
  }
  const db = getDb();
  const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email) as any;
  if (!user) {
    res.status(404).json({ error: 'Account not found' });
    return;
  }
  const resetToken = crypto.randomBytes(32).toString('hex');
  const expires = Date.now() + 3600000;
  db.prepare('UPDATE users SET reset_token = ?, reset_expires = ? WHERE id = ?').run(resetToken, expires, user.id);
  res.json({ message: 'Reset link sent to your email' });
});

// POST /api/auth/verify-email
router.post('/verify-email', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: 'Email required' });
    return;
  }
  const db = getDb();
  const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email) as any;
  if (!user) {
    res.status(404).json({ error: 'Account not found' });
    return;
  }
  const verifyToken = crypto.randomBytes(32).toString('hex');
  db.prepare('UPDATE users SET verify_token = ? WHERE id = ?').run(verifyToken, user.id);
  res.json({ message: 'Verification email sent' });
});

export default router;
