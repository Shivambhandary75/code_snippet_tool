import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configure axios defaults
  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:3000';
    axios.defaults.withCredentials = true;
  }, []);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      if (token && userId) {
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Verify token is still valid by making a request
        const response = await axios.get('/health');
        if (response.data.status === 'OK') {
          setUser({ 
            isAuthenticated: true,
            userId: userId,
            token: token
          });
        } else {
          // Token is invalid, clear it
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          delete axios.defaults.headers.common['Authorization'];
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      // Token is invalid or expired, clear it
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/login', {
        email,
        password
      });

      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        setUser({ 
          isAuthenticated: true,
          userId: response.data.userId,
          token: response.data.token
        });
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const signup = async (email, password, username) => {
    try {
      const response = await axios.post('/signup', {
        email,
        password,
        username
      });

      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        setUser({ 
          isAuthenticated: true,
          userId: response.data.user._id,
          token: response.data.token
        });
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed'
      };
    }
  };

  const logout = async () => {
    try {
      // Clear cookies by making a logout request
      await axios.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear localStorage and axios headers
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
