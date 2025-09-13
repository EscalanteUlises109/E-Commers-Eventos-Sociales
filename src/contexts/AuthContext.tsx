import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'cliente' | 'proveedor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo users - in real app this would be validated against database
    const demoUsers = {
      'cliente@demo.com': { password: '123456', role: 'cliente' as UserRole, name: 'Juan Cliente' },
      'proveedor@demo.com': { password: '123456', role: 'proveedor' as UserRole, name: 'María Proveedora' }
    };
    
    const demoUser = demoUsers[email as keyof typeof demoUsers];
    
    if (demoUser && demoUser.password === password && demoUser.role === role) {
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: demoUser.name,
        email,
        role: demoUser.role
      };
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};