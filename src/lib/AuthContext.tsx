import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '../types';
import apiClient from './api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem('token');
      if (!savedToken) {
        localStorage.removeItem('user');
        setIsAuthReady(true);
        return;
      }

      try {
        const response = await apiClient.get<{ user: User }>('/auth/me');
        const userData = response.data.user;
        setToken(savedToken);
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setIsAuthReady(true);
      }
    };

    initializeAuth();
  }, []);

  const register = async (username: string, email: string, password: string) => {
    try {
      await apiClient.post('/auth/register', { username, email, password });
    } catch (error: any) {
      throw error.response?.data?.message || 'Registration failed';
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      setUser(userData);
      setIsLoggedIn(true);
      
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error: any) {
      throw error.response?.data?.message || 'Login failed';
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    setIsAuthReady(true);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoggedIn,
    isAuthReady,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};