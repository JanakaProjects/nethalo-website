import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('api', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('apiFetch attaches auth header when token exists', async () => {
    localStorage.setItem('national-hate-crime_token', 'test-token');
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: 'test' }),
    });

    vi.resetModules();
    const { apiFetch } = await import('./api');
    const result = await apiFetch<{ data: string }>('/test');

    expect(fetch).toHaveBeenCalled();
    const callArgs = (fetch as any).mock.calls[0];
    expect(callArgs[0]).toBe('/api/test');
    expect(callArgs[1].headers.Authorization).toBe('Bearer test-token');
    expect(result).toEqual({ data: 'test' });
  });

  it('apiFetch throws on non-ok response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    });

    vi.resetModules();
    const { apiFetch } = await import('./api');
    await expect(apiFetch('/test')).rejects.toThrow('API error: 401 Unauthorized');
  });
});

