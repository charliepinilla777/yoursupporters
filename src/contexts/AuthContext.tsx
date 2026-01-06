import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { type User, api } from '../lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        error: null
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('gilded-noir-token'),
  isLoading: false,
  error: null
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('gilded-noir-token');
    const userData = localStorage.getItem('gilded-noir-user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token }
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('gilded-noir-token');
        localStorage.removeItem('gilded-noir-user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await api.login({ email, password });
      
      if (response.error) {
        dispatch({ type: 'LOGIN_FAILURE', payload: response.error });
        return;
      }

      const { user, token } = response;
      localStorage.setItem('gilded-noir-token', token);
      localStorage.setItem('gilded-noir-user', JSON.stringify(user));
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token }
      });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Error de conexión' });
    }
  };

  const register = async (userData: { username: string; email: string; password: string }) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await api.register(userData);
      
      if (response.error) {
        dispatch({ type: 'LOGIN_FAILURE', payload: response.error });
        return;
      }

      const { user, token } = response;
      localStorage.setItem('gilded-noir-token', token);
      localStorage.setItem('gilded-noir-user', JSON.stringify(user));
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token }
      });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Error de conexión' });
    }
  };

  const logout = () => {
    localStorage.removeItem('gilded-noir-token');
    localStorage.removeItem('gilded-noir-user');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem('gilded-noir-user', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_USER', payload: userData });
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
