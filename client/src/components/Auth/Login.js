import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { loginWithCredentials, quickDemoLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('🔐 Login attempt:', formData.email);

    try {
      // EMERGENCY FIX: Force demo login for known demo accounts
      if (formData.email === 'supplier1@gmail.com' && formData.password === '111111') {
        console.log('🚨 EMERGENCY: Using offline demo login for supplier');
        const demoUser = {
          id: '2',
          email: 'supplier1@gmail.com',
          role: 'supplier',
          name: 'Fresh Produce Supplier',
          verified: true
        };
        const demoToken = 'demo-token-' + Date.now() + '-supplier';
        
        localStorage.setItem('token', demoToken);
        localStorage.setItem('user', JSON.stringify(demoUser));
        
        console.log('✅ Emergency demo login successful');
        navigate('/supplier/dashboard');
        setLoading(false);
        return;
      }
      
      if (formData.email === 'vendor1@example.com' && formData.password === 'password123') {
        console.log('🚨 EMERGENCY: Using offline demo login for vendor');
        const demoUser = {
          id: '1',
          email: 'vendor1@example.com',
          role: 'vendor',
          name: 'Street Food Vendor',
          verified: true
        };
        const demoToken = 'demo-token-' + Date.now() + '-vendor';
        
        localStorage.setItem('token', demoToken);
        localStorage.setItem('user', JSON.stringify(demoUser));
        
        console.log('✅ Emergency demo login successful');
        navigate('/vendor/dashboard');
        setLoading(false);
        return;
      }

      // Try normal login for other accounts
      const result = await loginWithCredentials(formData.email, formData.password);
      
      if (result.success) {
        console.log('✅ Login successful');
        navigate(`/${result.user.role}/dashboard`);
      } else {
        console.log('❌ Login failed:', result.message);
        setError(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('🚨 Login error:', error);
      setError('Backend error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (role) => {
    if (role === 'vendor') {
      setFormData({
        email: 'vendor1@example.com',
        password: 'password123'
      });
    } else {
      setFormData({
        email: 'supplier1@gmail.com',
        password: '111111'
      });
    }
  };

  const handleQuickLogin = async (role) => {
    setLoading(true);
    setError('');
    
    console.log('🚀 Quick demo login for:', role);

    // EMERGENCY: Force offline demo login
    if (role === 'supplier') {
      const demoUser = {
        id: '2',
        email: 'supplier1@gmail.com',
        role: 'supplier',
        name: 'Fresh Produce Supplier',
        verified: true
      };
      const demoToken = 'demo-token-' + Date.now() + '-supplier';
      
      localStorage.setItem('token', demoToken);
      localStorage.setItem('user', JSON.stringify(demoUser));
      
      console.log('✅ Emergency quick login successful for supplier');
      navigate('/supplier/dashboard');
      setLoading(false);
      return;
    }
    
    if (role === 'vendor') {
      const demoUser = {
        id: '1',
        email: 'vendor1@example.com',
        role: 'vendor',
        name: 'Street Food Vendor',
        verified: true
      };
      const demoToken = 'demo-token-' + Date.now() + '-vendor';
      
      localStorage.setItem('token', demoToken);
      localStorage.setItem('user', JSON.stringify(demoUser));
      
      console.log('✅ Emergency quick login successful for vendor');
      navigate('/vendor/dashboard');
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '25px',
        padding: '3rem',
        boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.3)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍜</div>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#333',
            marginBottom: '0.5rem'
          }}>
            Sign In
          </h2>
          <p style={{ color: '#666', fontSize: '1rem' }}>
            Enter your credentials to access your account
          </p>
        </div>

        
        {error && (
          <div style={{
            background: '#fee',
            color: '#c33',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            border: '1px solid #fcc',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600', 
              color: '#333'
            }}>
              📧 Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                borderRadius: '15px',
                border: '2px solid #e9ecef',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                background: 'white',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600', 
              color: '#333'
            }}>
              🔒 Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                borderRadius: '15px',
                border: '2px solid #e9ecef',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                background: 'white',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your password"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <button
              type="button"
              onClick={() => fillDemoCredentials('vendor')}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #ddd',
                background: 'white',
                color: '#666',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Fill Vendor Info
            </button>
            <button
              type="button"
              onClick={() => fillDemoCredentials('supplier')}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #ddd',
                background: 'white',
                color: '#666',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Fill Supplier Info
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '15px',
              border: 'none',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '1rem'
            }}
          >
            {loading ? '🔄 Signing In...' : '🚀 Sign In'}
          </button>
        </form>

        {/* Quick Demo Login Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <button
            onClick={() => handleQuickLogin('vendor')}
            disabled={loading}
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: '10px',
              border: '2px solid #28a745',
              background: 'white',
              color: '#28a745',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            🍕 Quick Vendor Login
          </button>
          <button
            onClick={() => handleQuickLogin('supplier')}
            disabled={loading}
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: '10px',
              border: '2px solid #007bff',
              background: 'white',
              color: '#007bff',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            🏪 Quick Supplier Login
          </button>
        </div>

        {/* Demo Account Info */}
        <div style={{
          background: '#e3f2fd',
          padding: '1rem',
          borderRadius: '10px',
          marginBottom: '1.5rem',
          fontSize: '0.85rem',
          color: '#1976d2'
        }}>
          <strong>Demo Accounts (Working Offline):</strong><br/>
          📧 vendor1@example.com | 🔒 password123<br/>
          📧 supplier1@gmail.com | 🔒 111111
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#666', fontSize: '0.95rem' }}>
            Don't have an account?{' '}
            <Link 
              to="/register" 
              style={{ 
                color: '#667eea', 
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;