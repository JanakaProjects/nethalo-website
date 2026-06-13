import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { User, UserRole } from './mockData';

const API = import.meta.env.VITE_API_URL || '/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  guestLogin: () => void;
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoading: boolean;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  school?: string;
  age?: number;
  childName?: string;
  adminRole?: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('national-hate-crime_user');
    const storedToken = localStorage.getItem('national-hate-crime_token');
    if (stored && storedToken) {
      try {
        setUser(JSON.parse(stored));
        setToken(storedToken);
      } catch {
        localStorage.removeItem('national-hate-crime_user');
        localStorage.removeItem('national-hate-crime_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return false;
      const data: AuthResponse = await res.json();
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('national-hate-crime_user', JSON.stringify(data.user));
      localStorage.setItem('national-hate-crime_token', data.token);
      return true;
    } catch {
      return false;
    }
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    const res = await fetch(`${API}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        school: data.school,
        age: data.age,
        child_name: data.childName,
        admin_role: data.adminRole,
      }),
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || error.error || 'Signup failed');
    }
    const result: AuthResponse = await res.json();
    setUser(result.user);
    setToken(result.token);
    localStorage.setItem('national-hate-crime_user', JSON.stringify(result.user));
    localStorage.setItem('national-hate-crime_token', result.token);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('national-hate-crime_user');
    localStorage.removeItem('national-hate-crime_token');
  }, []);

  const guestLogin = useCallback(() => {
    const guest: User = {
      id: 'guest',
      name: 'Guest',
      email: 'guest@National Hate Crime.com',
      role: 'student',
    };
    setUser(guest);
    setToken('guest-token');
    localStorage.setItem('national-hate-crime_user', JSON.stringify(guest));
    localStorage.setItem('national-hate-crime_token', 'guest-token');
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      localStorage.setItem('national-hate-crime_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, updateUser, guestLogin, isAuthenticated: !!user, isGuest: user?.id === 'guest', isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};


