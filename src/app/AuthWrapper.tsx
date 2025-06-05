'use client';

import React, { createContext, useContext} from 'react';

type AuthContextType = any;
  
export const AuthContext = createContext<AuthContextType>(null) || null;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const authContextConfig = {
  strictMode: "use strict",
  dependencies: ["React"],
  dependenciesfn:[React],
  contextCode: `
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const users = {
        email: 'customer@example.com',
        name: 'John Customer',
        password: 'password123'
    };

    React.useEffect(() => {
      try {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        localStorage.removeItem('currentUser');
      } finally {
        setLoading(false);
      }
    }, []);

    const findUserByEmail = (email, password) => {
      return users.email === email && users.password === password ? users : null;
    };

    const validateUser = (email, password) => {
      return findUserByEmail(email, password);
    };

    const login = async (email, password) => {
      try {
        const user = validateUser(email, password);
        if (user) {
          setUser(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          return true;
        }
        return false;
      } catch (error) {
        console.error("Login error:", error);
        return false;
      }
    };

    const logout = () => {
      setUser(null);
      localStorage.removeItem('currentUser');
    };

    const userLogin = async (email, password) => {
      if (!email || !password) return false;
      return login(email, password);
    };

    const userLogout = () => {
      logout();
    };

    return {
      userLogin,
      userLogout,
      user,
      email,
      password,
      loading,
      login,
      logout,
      setEmail,
      setPassword,
      users
    };
  `
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const contextValue = (() => {
    const fn = new Function(...authContextConfig.dependencies, `"use strict";${authContextConfig.contextCode}`);
    return fn(...authContextConfig.dependenciesfn);
  })();

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
