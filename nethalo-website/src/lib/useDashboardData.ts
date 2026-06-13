import { useState, useEffect } from 'react';
import { getDashboardStats, getChildren, getReports } from './api';
import type { DashboardStats, Child, Report } from './api';

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

export function useStudentData(userId: string | undefined) {
  const [safeScore, setSafeScore] = useState<number>(0);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyTrendItem[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    getDashboardStats()
      .then(data => {
        if (cancelled) return;
        setSafeScore(data.stats.safeScore);
        setStats(data.stats);
        setWeeklyActivity(data.weeklyTrend || []);
        setRecentActivity(data.recentActivity || []);
      })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, [userId]);

  return { safeScore, stats, weeklyActivity, recentActivity, isLoading, error };
}

export function useParentData(parentId: string | undefined) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyTrendItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!parentId) return;
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    Promise.all([getDashboardStats(), getChildren()])
      .then(([d, c]) => {
        if (cancelled) return;
        setStats(d.stats);
        setChildren(c.children);
        setWeeklyActivity(d.weeklyTrend || []);
      })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, [parentId]);

  return { stats, children, weeklyActivity, isLoading, error };
}

export function useAdminData() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [pendingReports, setPendingReports] = useState<Report[]>([]);
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyTrendItem[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    Promise.all([getDashboardStats(), getReports()])
      .then(([d, r]) => {
        if (cancelled) return;
        setStats(d.stats);
        setPendingReports(r.reports);
        setWeeklyActivity(d.weeklyTrend || []);
        setRecentActivity(d.recentActivity || []);
      })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { stats, pendingReports, weeklyActivity, recentActivity, isLoading, error };
}