'use client';

import React, { createContext, useContext} from 'react';


export interface User {
    id: string;
    email: string;
    name: string;
    role: 'customer';
  }
  export const users: User[] = [
    {
      id: '2',
      email: 'customer@example.com',
      name: 'John Customer',
      role: 'customer'
    }
  ];
  
  export const findUserByEmail = (email: string): User | undefined => {
    return users.find(user => user.email === email);
  };
  
  export const validateUser = (email: string, password: string): User | null => {
    // In a real app, this would check password hashes
    // For demo purposes, any password works for existing emails
    const user = findUserByEmail(email);
    return user ? user : null;
  };

  interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    // Add demo credentials for easy testing
    demoCredentials: {
      customer: { email: string; password: string };
      admin: { email: string; password: string };
    };
  }

  const defaultAuthContext: AuthContextType = {
    user: null,
    loading: false,
    login: async () => false,
    logout: () => {},
    demoCredentials: {
      customer: { email: '', password: '' },
      admin: { email: '', password: '' }
    }
  };
  
export const AuthContext = createContext<AuthContextType>(defaultAuthContext)||(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

const contextCodeFromDB = `
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const users=[
      {
        email: 'customer@example.com',
        name: 'John Customer',
      }
    ];

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
    const findUserByEmail = async (email)=> {
      return users.find(user => user.email === email);
    };

    const validateUser = async (email, password)=>{
      const user = findUserByEmail(email);
      return user ? user : null;
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
    };
`;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const contextValue = (() => {
    const fn = new Function('React', contextCodeFromDB);
    return fn(React);
  })();

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
