import { Router, Request, Response } from 'express';
import { moderateComment, analyzeComment } from '../services/moderation.js';
import { getDb } from '../db.js';

const router = Router();

function initModerationTable() {
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS moderation_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      platform TEXT NOT NULL,
      comment_id TEXT,
      comment_text TEXT NOT NULL,
      is_hate INTEGER DEFAULT 0,
      severity TEXT DEFAULT 'none',
      categories TEXT,
      confidence REAL DEFAULT 0,
      action_taken TEXT DEFAULT 'allow',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

initModerationTable();

// POST /api/moderation/analyze
router.post('/analyze', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const { text, platform, commentId } = req.body;
  if (!text) {
    res.status(400).json({ error: 'Text required' });
    return;
  }
  const result = analyzeComment(text);
  res.json({ result });
});

// POST /api/moderation/moderate
router.post('/moderate', (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  const { text, platform, commentId } = req.body;
  if (!text || !platform) {
    res.status(400).json({ error: 'Text and platform required' });
    return;
  }

  moderateComment(text, platform, commentId || 'unknown').then(result => {
    const db = getDb();
    db.prepare(
      'INSERT INTO moderation_logs (user_id, platform, comment_id, comment_text, is_hate, severity, categories, confidence, action_taken) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(
      req.user!.userId,
      platform,
      commentId || null,
      text,
      result.isHate ? 1 : 0,
      result.severity,
      JSON.stringify(result.categories),
      result.confidence,
      result.suggestedAction
    );

    res.json({ result });
  }).catch(err => {
    console.error('Moderation error:', err);
    res.status(500).json({ error: 'Moderation failed' });
  });
});

// GET /api/moderation/logs
router.get('/logs', (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  const db = getDb();
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const offset = (page - 1) * limit;

  const total = (db.prepare('SELECT COUNT(*) as c FROM moderation_logs WHERE user_id = ?').get(req.user.userId) as any).c;
  const logs = db.prepare(
    'SELECT * FROM moderation_logs WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?'
  ).all(req.user.userId, limit, offset);

  res.json({ logs, total, page, limit, totalPages: Math.ceil(total / limit) });
});

export default router;
