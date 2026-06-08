import { Router, Request, Response } from 'express';
import { getDb } from '../db.js';

const router = Router();

// GET /api/accounts
router.get('/', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const db = getDb();
  const accounts = db.prepare('SELECT * FROM connected_accounts WHERE user_id = ?').all(req.user.userId);
  res.json({ accounts });
});

// POST /api/accounts/connect
router.post('/connect', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const { platform, label, username } = req.body;
  if (!platform || !label) { res.status(400).json({ error: 'platform and label required' }); return; }
  const db = getDb();
  db.prepare(
    `INSERT INTO connected_accounts (user_id, platform, label, connected, username, connected_at)
     VALUES (?, ?, ?, 1, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(user_id, platform) DO UPDATE SET connected=1, username=COALESCE(?,username), connected_at=CURRENT_TIMESTAMP`
  ).run(req.user.userId, platform, label, username || null, username || null);
  res.json({ success: true });
});

// POST /api/accounts/disconnect
router.post('/disconnect', (req: Request, res: Response) => {
  if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }
  const { platform } = req.body;
  if (!platform) { res.status(400).json({ error: 'platform required' }); return; }
  const db = getDb();
  db.prepare(
    'UPDATE connected_accounts SET connected=0 WHERE user_id=? AND platform=?'
  ).run(req.user.userId, platform);
  res.json({ success: true });
});

export default router;
