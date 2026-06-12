const API = import.meta.env.VITE_API_URL || '/api';

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('nethalo_token');
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export interface Threat {
  id: string;
  platform: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  blocked: boolean;
}

export interface Child {
  id: string;
  name: string;
  grade: string;
  platform: string;
  status: 'online' | 'offline' | 'away';
  threats_detected: number;
  last_active: string;
  safe_score: number;
}

export interface ConnectedAccount {
  platform: string;
  label: string;
  connected: boolean;
  username?: string;
  connected_at?: string;
}

export interface DashboardStats {
  totalThreats: number;
  threatsBlocked: number;
  activeReports: number;
  connectedChildren: number;
  journalEntries: number;
  safeScore: number;
}

export interface Report {
  id: string;
  type: string;
  description: string;
  target_name: string;
  created_at: string;
}

export interface JournalEntry {
  id: number | string;
  user_id: string;
  content: string;
  mood?: string;
  created_at: string;
}

interface WeeklyTrendItem {
  day: string;
  threats: number;
}

interface RecentActivityItem {
  id: number | string;
  type: string;
  platform: string;
  message: string;
  severity?: string;
  time: string;
}

// Dashboard
export function getDashboardStats() {
  return apiFetch<{ stats: DashboardStats; weeklyTrend: WeeklyTrendItem[]; recentActivity: RecentActivityItem[] }>('/dashboard/stats');
}

// Threats
export function getThreats(params?: { limit?: number; offset?: number; severity?: string }) {
  const q = new URLSearchParams();
  if (params?.limit) q.set('limit', String(params.limit));
  if (params?.offset) q.set('offset', String(params.offset));
  if (params?.severity) q.set('severity', params.severity);
  const qs = q.toString();
  return apiFetch<{ threats: Threat[]; total: number }>(`/threats${qs ? '?' + qs : ''}`);
}

export function getThreatStats() {
  return apiFetch<{ stats: { total: number; critical: number; high: number; medium: number; low: number; blocked: number } }>('/threats/stats');
}

// Children
export function getChildren() {
  return apiFetch<{ children: Child[] }>('/children');
}

// Accounts
export function getAccounts() {
  return apiFetch<{ accounts: ConnectedAccount[] }>('/accounts');
}

export function connectAccount(platform: string, label: string, username?: string) {
  return apiFetch<{ success: boolean }>('/accounts/connect', {
    method: 'POST',
    body: JSON.stringify({ platform, label, username }),
  });
}

export function disconnectAccount(platform: string) {
  return apiFetch<{ success: boolean }>('/accounts/disconnect', {
    method: 'POST',
    body: JSON.stringify({ platform }),
  });
}

// Reports
export function getReports() {
  return apiFetch<{ reports: Report[] }>('/reports');
}

export function createReport(type: string, description?: string, target_name?: string) {
  return apiFetch<{ id: string }>('/reports', {
    method: 'POST',
    body: JSON.stringify({ type, description, target_name }),
  });
}

// Journal
export function getJournalEntries() {
  return apiFetch<{ entries: JournalEntry[] }>('/journal');
}

export function createJournalEntry(content: string, mood?: string) {
  return apiFetch<{ id: number }>('/journal', {
    method: 'POST',
    body: JSON.stringify({ content, mood }),
  });
}

export function deleteJournalEntry(id: string) {
  return apiFetch<{ success: boolean }>(`/journal/${id}`, {
    method: 'DELETE',
  });
}
