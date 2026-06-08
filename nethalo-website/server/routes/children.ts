import { Router, Request, Response } from 'express';
import { getDb } from '../db.js';

const router = Router();

// GET /api/children
router.get('/', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const db = getDb();
  const children = db.prepare('SELECT * FROM children WHERE parent_id = ?').all(req.user.userId);
  res.json({ children });
});

// POST /api/children
router.post('/', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const { name, grade, platform } = req.body;
  if (!name) { res.status(400).json({ error: 'name required' }); return; }
  const db = getDb();
  const result = db.prepare(
    'INSERT INTO children (parent_id, name, grade, platform) VALUES (?, ?, ?, ?)'
  ).run(req.user.userId, name, grade || null, platform || 'Instagram');
  res.status(201).json({ id: result.lastInsertRowid });
});

// PUT /api/children/:id
router.put('/:id', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const { name, grade, platform, status } = req.body;
  const db = getDb();
  db.prepare(
    'UPDATE children SET name=COALESCE(?,name), grade=COALESCE(?,grade), platform=COALESCE(?,platform), status=COALESCE(?,status) WHERE id=? AND parent_id=?'
  ).run(name || null, grade || null, platform || null, status || null, req.params.id, req.user.userId);
  res.json({ success: true });
});

export default router;
