import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Demo users for offline functionality
  const demoUsers = {
    'vendor1@example.com': {
      id: 'demo-vendor-1',
      email: 'vendor1@example.com',
      role: 'vendor',
      name: 'Raj Kumar',
      businessName: 'Raj\'s Street Food',
      location: 'Andheri West',
      phone: '+91-9876543212',
      foodType: 'North Indian'
    },
    'supplier1@gmail.com': {
      id: 'demo-supplier-1',
      email: 'supplier1@gmail.com',
      role: 'supplier',
      businessName: 'Fresh Vegetables Co.',
      location: 'Mumbai Central',
      phone: '+91-9876543210',
      verified: true,
      rating: 4.5,
      totalOrders: 150
    }
  };

  useEffect(() => {
    console.log('AuthProvider: Initializing...');
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    console.log('AuthProvider: Token exists:', !!token);
    console.log('AuthProvider: User data exists:', !!userData);
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('AuthProvider: Parsed user:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('AuthProvider: Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } else {
      console.log('AuthProvider: No token or user data found');
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    console.log('AuthProvider: Login called with:', { token: !!token, userData });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  };

  const loginWithCredentials = async (email, password) => {
    try {
      console.log('AuthProvider: Login attempt for:', email);

      // Check if we're in offline mode or if it's a demo account
      const isOfflineMode = process.env.REACT_APP_OFFLINE_MODE === 'true' || process.env.REACT_APP_ENVIRONMENT === 'production';
      const demoUser = demoUsers[email];
      const isValidDemoPassword = (email === 'supplier1@gmail.com' && password === '111111') || 
                                  (email === 'vendor1@example.com' && password === 'password123');

      // If offline mode or demo account, handle locally first
      if (isOfflineMode || (demoUser && isValidDemoPassword)) {
        console.log('AuthProvider: Using offline/demo login for:', email);
        
        if (demoUser && isValidDemoPassword) {
          // Use backend-compatible user data for demo accounts
          const backendCompatibleUser = {
            id: email === 'supplier1@gmail.com' ? 'demo-supplier-1' : 'demo-vendor-1',
            email: email,
            role: demoUser.role,
            name: demoUser.name || demoUser.businessName,
            businessName: demoUser.businessName,
            location: demoUser.location,
            phone: demoUser.phone,
            verified: true
          };
          
          const demoToken = 'demo-token-' + Date.now() + '-' + demoUser.role;
          
          localStorage.setItem('token', demoToken);
          localStorage.setItem('user', JSON.stringify(backendCompatibleUser));
          setUser(backendCompatibleUser);
          
          return { success: true, user: backendCompatibleUser };
        } else if (isOfflineMode) {
          return { success: false, message: 'Invalid credentials. Please check your email and password.' };
        }
      }

      // Try backend API if not in offline mode and not a demo account
      if (!isOfflineMode) {
        console.log('AuthProvider: Attempting backend login...');
        const apiUrl = process.env.REACT_APP_API_URL || '';
        const response = await fetch(`${apiUrl}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log('AuthProvider: Backend response:', data);

        if (response.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          setUser(data.user);
          console.log('AuthProvider: Backend login successful');
          return { success: true, user: data.user };
        } else {
          console.log('AuthProvider: Backend login failed:', data.message);
          return { success: false, message: data.message };
        }
      }
      
      return { success: false, message: 'Invalid credentials. Please check your email and password.' };
    } catch (error) {
      console.error('AuthProvider: Login error:', error);
      
      // If backend fails, check if it's a demo user as fallback
      const demoUser = demoUsers[email];
      const isValidDemoPassword = (email === 'supplier1@gmail.com' && password === '111111') || 
                                  (email === 'vendor1@example.com' && password === 'password123');
      
      if (demoUser && isValidDemoPassword) {
        console.log('AuthProvider: Fallback to demo login for:', email);
        // Use backend-compatible user data for demo accounts
        const backendCompatibleUser = {
          id: email === 'supplier1@gmail.com' ? 'demo-supplier-1' : 'demo-vendor-1',
          email: email,
          role: demoUser.role,
          name: demoUser.name || demoUser.businessName,
          businessName: demoUser.businessName,
          location: demoUser.location,
          phone: demoUser.phone,
          verified: true
        };
        
        const demoToken = 'demo-token-' + Date.now() + '-' + demoUser.role;
        
        localStorage.setItem('token', demoToken);
        localStorage.setItem('user', JSON.stringify(backendCompatibleUser));
        setUser(backendCompatibleUser);
        
        return { success: true, user: backendCompatibleUser };
      }
      
      return { success: false, message: 'Network error. Please check your connection and try again.' };
    }
  };

  const quickDemoLogin = async (role) => {
    console.log('AuthProvider: Quick demo login for role:', role);
    
    const credentials = role === 'vendor' 
      ? { email: 'vendor1@example.com', password: 'password123' }
      : { email: 'supplier1@gmail.com', password: '111111' };
    
    return await loginWithCredentials(credentials.email, credentials.password);
  };

  const register = async (userData) => {
    try {
      console.log('AuthProvider: Register called with:', userData);
      
      // In offline mode, reject registration
      const isOfflineMode = process.env.REACT_APP_OFFLINE_MODE === 'true' || process.env.REACT_APP_ENVIRONMENT === 'production';
      if (isOfflineMode) {
        return { success: false, message: 'Registration is not available in offline mode. Please use demo accounts.' };
      }
      
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log('AuthProvider: Register response:', data);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('AuthProvider: Register error:', error);
      return { success: false, message: 'Registration is not available in offline mode. Please use demo accounts.' };
    }
  };

  const logout = () => {
    console.log('AuthProvider: Logout called');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const apiCall = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    };

    try {
      // Enhanced offline mode with full functionality
      const isOfflineMode = process.env.REACT_APP_OFFLINE_MODE === 'true' || process.env.REACT_APP_EMERGENCY_MODE === 'true';
      
      if (isOfflineMode && token && token.startsWith('demo-token-')) {
        console.log('🚨 EMERGENCY OFFLINE MODE: Handling API call locally');
        return handleOfflineApiCall(url, options);
      }

      // Try backend first if not in offline mode
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (response.status === 401) {
        console.log('AuthProvider: 401 received, logging out');
        logout();
        window.location.href = '/login';
        return null;
      }

      return response;
    } catch (error) {
      console.error('API call error:', error);
      
      // Fallback to offline mode if backend fails
      const token = localStorage.getItem('token');
      if (token && token.startsWith('demo-token-')) {
        console.log('🚨 BACKEND FAILED: Falling back to offline mode');
        return handleOfflineApiCall(url, options);
      }
      
      throw error;
    }
  };

  // Enhanced offline API handler
  const handleOfflineApiCall = async (url, options = {}) => {
    const method = options.method || 'GET';
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    console.log(`🔧 Offline API: ${method} ${url}`);

    // Handle different API endpoints
    if (url.includes('/api/products')) {
      return handleOfflineProducts(url, method, options, currentUser);
    }
    
    if (url.includes('/api/auth/test')) {
      return {
        ok: true,
        json: async () => ({
          message: 'Offline authentication successful',
          user: currentUser,
          timestamp: new Date().toISOString()
        })
      };
    }

    // Default response for other endpoints
    return {
      ok: true,
      json: async () => ({ 
        success: true, 
        data: [], 
        message: 'Offline mode - limited functionality',
        offline: true
      })
    };
  };

  // Handle products in offline mode
  const handleOfflineProducts = async (url, method, options, currentUser) => {
    const storageKey = 'offline_products';
    let products = JSON.parse(localStorage.getItem(storageKey) || '[]');

    // Initialize with sample data if empty
    if (products.length === 0) {
      products = [
        {
          id: 'offline-1',
          supplierId: 'demo-supplier-1',
          name: 'Fresh Onions',
          category: 'Vegetables',
          price: 25,
          unit: 'kg',
          quantity: 500,
          stock: 500,
          description: 'Fresh red onions from local farms',
          image: '/api/placeholder/200/200',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'offline-2',
          supplierId: 'demo-supplier-1',
          name: 'Tomatoes',
          category: 'Vegetables',
          price: 30,
          unit: 'kg',
          quantity: 300,
          stock: 300,
          description: 'Fresh ripe tomatoes',
          image: '/api/placeholder/200/200',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(storageKey, JSON.stringify(products));
    }

    if (method === 'GET') {
      // Return all products with supplier info
      const productsWithSupplier = products.map(product => ({
        ...product,
        supplier: {
          id: product.supplierId,
          businessName: 'Fresh Vegetables Co.',
          location: 'Mumbai Central',
          rating: 4.5
        }
      }));

      return {
        ok: true,
        json: async () => productsWithSupplier
      };
    }

    if (method === 'POST') {
      // Create new product
      const productData = JSON.parse(options.body || '{}');
      const newProduct = {
        id: 'offline-' + Date.now(),
        supplierId: currentUser.id,
        name: productData.name,
        category: productData.category,
        price: parseFloat(productData.price),
        unit: productData.unit,
        quantity: parseInt(productData.quantity || productData.stock),
        stock: parseInt(productData.quantity || productData.stock),
        description: productData.description || '',
        image: productData.image || '/api/placeholder/200/200',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      products.push(newProduct);
      localStorage.setItem(storageKey, JSON.stringify(products));

      const productWithSupplier = {
        ...newProduct,
        supplier: {
          id: currentUser.id,
          businessName: currentUser.businessName || 'Demo Business',
          location: currentUser.location || 'Demo Location',
          rating: 4.5
        }
      };

      return {
        ok: true,
        status: 201,
        json: async () => ({
          message: 'Product created successfully (offline)',
          product: productWithSupplier,
          timestamp: new Date().toISOString(),
          offline: true
        })
      };
    }

    if (method === 'PUT') {
      // Update product
      const productId = url.split('/').pop();
      const productData = JSON.parse(options.body || '{}');
      const productIndex = products.findIndex(p => p.id === productId);

      if (productIndex !== -1) {
        products[productIndex] = {
          ...products[productIndex],
          ...productData,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem(storageKey, JSON.stringify(products));

        return {
          ok: true,
          json: async () => ({
            message: 'Product updated successfully (offline)',
            product: products[productIndex],
            offline: true
          })
        };
      }

      return {
        ok: false,
        status: 404,
        json: async () => ({ message: 'Product not found' })
      };
    }

    if (method === 'DELETE') {
      // Delete product
      const productId = url.split('/').pop();
      const productIndex = products.findIndex(p => p.id === productId);

      if (productIndex !== -1) {
        products.splice(productIndex, 1);
        localStorage.setItem(storageKey, JSON.stringify(products));

        return {
          ok: true,
          json: async () => ({
            message: 'Product deleted successfully (offline)',
            offline: true
          })
        };
      }

      return {
        ok: false,
        status: 404,
        json: async () => ({ message: 'Product not found' })
      };
    }

    return {
      ok: true,
      json: async () => ({ success: true, offline: true })
    };
  };

  console.log('AuthProvider: Current state - user:', user, 'loading:', loading);

  const value = {
    user,
    setUser,
    login,
    loginWithCredentials,
    quickDemoLogin,
    register,
    logout,
    getAuthHeaders,
    apiCall,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}