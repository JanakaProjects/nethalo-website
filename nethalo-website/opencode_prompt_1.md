# IMPROVEMENT: Wire all dashboards to the real backend API

## Context
National Hate Crime is a React/TypeScript SPA with an Express/SQLite backend. The backend is fully functional on port 3001 with these endpoints:
- POST /api/auth/login, POST /api/auth/signup, GET /api/auth/me
- GET /api/dashboard/stats (returns { safeScore, totalThreats, blockedThreats, weeklyTrend[], recentActivity[] })
- GET /api/threats?userId=X (returns threats with id, type, severity, message, platform, timestamp, status)
- GET /api/children?parentId=X (returns children with id, name, grade, platform, status, lastActive, threatsDetected, safeScore)
- GET /api/reports (returns reports with id, type, description, status, createdAt, priority)

The API client already exists at src/lib/api.ts with `apiFetch<T>(path, options?)` that auto-attaches JWT tokens from localStorage.

## Current Problem
All three dashboards (StudentDashboard.tsx, ParentDashboard.tsx, AdminDashboard.tsx) use hardcoded inline data — fake stats, fake bar charts, fake activity lists. The API client exists but no page imports it.

## Task
Update all three dashboard pages to fetch real data from the API and display proper loading/error/empty states.

### Step 1: Create shared data hooks at src/lib/useDashboardData.ts
```typescript
// Custom hooks that wrap apiFetch for dashboard data
export function useStudentData(userId: string) {
  // returns { safeScore, stats, weeklyActivity, recentActivity, isLoading, error }
  // Fetches from /api/dashboard/stats?userId=userId and /api/threats?userId=userId
  // useEffect + useState lifecycle
  // Handle loading, error states
}

export function useParentData(parentId: string) {
  // returns { stats, children, alerts, isLoading, error }
  // Fetches from /api/children?parentId=parentId and /api/dashboard/stats
}

export function useAdminData() {
  // returns { stats, pendingReports, isLoading, error }
  // Fetches from /api/dashboard/stats and /api/reports
}
```

### Step 2: Extract shared StatCard component
Create src/components/ui/StatCard/StatCard.tsx with:
```typescript
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  color: string;
  isMobile: boolean;
  isLoading?: boolean; // show shimmer when true
}
```
Move the duplicate inline StatCard from all three dashboards into this shared file.

### Step 3: Update StudentDashboard.tsx
- Import useStudentData from the new hooks file
- Import StatCard from shared component
- Replace hardcoded safety score (85) with API safeScore
- Replace hardcoded stat cards (Reports Filed: 3, Support Contacts: 2, Days Safe: 12) with API data
- Replace barData with weeklyTrend from API
- Replace recent activity list with API recentActivity
- When isLoading=true show skeleton shimmer on all cards
- When error occurs show a subtle error banner (not a crash)
- Keep all modals (report, talk, journal, view reports) intact — they stay as UI only

### Step 4: Update ParentDashboard.tsx
- Import useParentData
- Import shared StatCard
- Replace hardcoded cards (Overall Safety: Good, Active Alerts: 1, etc.) with API stats
- Replace "Connected Children" hardcoded rows with real data from /api/children
  - Show avatar initial, name, grade, lastActive
  - Status badge: "Safe" (green) or "Alert Active" (orange)
  - Clickable rows that navigate to /child/:id (just the navigation, page can be placeholder)
- Replace barData with API weekly data
- Loading shimmer states

### Step 5: Update AdminDashboard.tsx
- Import useAdminData
- Import shared StatCard
- Replace hardcoded cards (Total Students: 420, Active Reports: 8, etc.) with API stats
- Replace barData with API weekly data
- Replace "Pending Reports" hardcoded list with real data from /api/reports
  - Show priority badge coloring: High=#ff3b30, Medium=#ff9500, Low=#0071e3
  - Show time ago (e.g. "30m ago", "2h ago")
- Loading/error states

### Requirements
- All API calls use existing apiFetch<T>() from src/lib/api.ts
- User ID comes from useAuth() → user.id
- Preserve responsive design (useIsMobile)
- Preserve motion animations (StaggerContainer, FadeInUp)
- NO mockData.ts imports in dashboard files after changes
- Build must pass with `npm run build`

