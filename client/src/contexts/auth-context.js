import { useState, useEffect, useContext, createContext } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { client } from '../utils/api-client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { data } = useQuery('AuthProvider', () => client.get('/auth/me'), {
    onSuccess: ({ data }) => navigate(`/profile/${data.user.username}`),
  });

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthPovider component');
  }

  return context;
}
