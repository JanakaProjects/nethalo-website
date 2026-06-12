import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@National Hate Crime.app';

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
});

export async function sendThreatAlert(to: string, name: string, threat: any) {
  if (!SMTP_USER) return;
  await transporter.sendMail({
    from: FROM_EMAIL,
    to,
    subject: `🚨 Threat Alert for ${name}`,
    html: `<p>Hello,</p><p>A new ${threat.severity} severity threat was detected on ${threat.platform}: <strong>${threat.type}</strong>.</p><p>${threat.message}</p>`,
  });
}

export async function sendWeeklyDigest(to: string, name: string, stats: any) {
  if (!SMTP_USER) return;
  await transporter.sendMail({
    from: FROM_EMAIL,
    to,
    subject: `📊 Weekly Safety Digest for ${name}`,
    html: `<p>Hello ${name},</p><p>This week: ${stats.totalThreats} threats detected, ${stats.blocked} blocked.</p>`,
  });
}
