import { Router, Request, Response } from 'express';
import { getDb } from '../db.js';

const router = Router();

// GET /api/journal
router.get('/', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const db = getDb();
  const entries = db.prepare('SELECT * FROM journal_entries WHERE user_id = ? ORDER BY created_at DESC').all(req.user.userId);
  res.json({ entries });
});

// POST /api/journal
router.post('/', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const { content, mood } = req.body;
  if (!content) { res.status(400).json({ error: 'content required' }); return; }
  const db = getDb();
  const result = db.prepare(
    'INSERT INTO journal_entries (user_id, content, mood) VALUES (?, ?, ?)'
  ).run(req.user.userId, content, mood || null);
  res.status(201).json({ id: result.lastInsertRowid });
});

// DELETE /api/journal/:id
router.delete('/:id', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const db = getDb();
  db.prepare('DELETE FROM journal_entries WHERE id = ? AND user_id = ?').run(req.params.id, req.user.userId);
  res.json({ success: true });
});

export default router;