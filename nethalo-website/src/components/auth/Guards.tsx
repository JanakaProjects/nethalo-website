import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth';
import type { UserRole } from '../../lib/mockData';

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isGuest, isLoading } = useAuth();
  if (isLoading) return null;
  if (!isAuthenticated || isGuest) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export const RoleRoute: React.FC<{ children: React.ReactNode; roles: UserRole[] }> = ({ children, roles }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to={`/dashboard/${user.role}`} replace />;
  return <>{children}</>;
};
