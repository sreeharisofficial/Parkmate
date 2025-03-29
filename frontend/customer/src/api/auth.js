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
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (!token) return;
    
    await axios.post(`${API_URL}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  } catch (error) {
    console.error('Logout error:', error);
  }
};