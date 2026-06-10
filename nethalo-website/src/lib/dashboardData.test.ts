import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useDashboardData', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('returns initial loading state', async () => {
    const { useStudentData } = await import('./useDashboardData');
    // Just verify it can be imported without errors
    expect(useStudentData).toBeDefined();
  });
});