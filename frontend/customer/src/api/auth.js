import axios from 'axios';

const API_URL = 'http://localhost:3000/auth'; // Adjust if your backend runs on a different port

export const register = async (username, email, password, role = 'user') => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
      role
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Registration failed';
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Login failed';
  }
};

export const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // If there's no token, just clear local storage
      if (!token) {
        clearAuthData();
        return;
      }
  
      // Attempt to call the logout endpoint
      await axios.post(`${API_URL}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Clear auth data regardless of API response
      clearAuthData();
      
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the API call fails, clear local storage
      clearAuthData();
      window.location.href = '/';
    }
  };
  
  // Helper function to clear auth data
  const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
  };