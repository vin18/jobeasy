import { useState, useEffect, useContext, createContext } from 'react';
import { useQuery } from 'react-query';
import { client } from '../utils/api-client';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const isLoggedIn = Boolean(user);
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(
    'AuthProvider',
    () => client.get('/auth/me'),
    {
      onSuccess: (data) => {
        setUser(data?.data?.user);
      },
      onError: () => {
        setUser(null);
      },
    }
  );

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthPovider component');
  }

  return context;
}
