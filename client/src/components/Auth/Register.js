import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    name: '',
    businessName: '',
    location: '',
    phone: '',
    foodType: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate required fields based on role
    if (!formData.role) {
      setError('Please select your role (Vendor or Supplier)');
      setLoading(false);
      return;
    }

    if (formData.role === 'vendor' && !formData.name) {
      setError('Name is required for vendors');
      setLoading(false);
      return;
    }

    if (formData.role === 'supplier' && !formData.businessName) {
      setError('Business name is required for suppliers');
      setLoading(false);
      return;
    }

    try {
      console.log('Registration form data:', formData);
      
      // Prepare data for submission
      const { confirmPassword, ...submitData } = formData;
      
      // Use AuthContext register function
      const result = await register(submitData);
      
      if (result.success) {
        console.log('Registration successful');
        navigate(`/${submitData.role}/dashboard`);
      } else {
        console.log('Registration failed:', result.message);
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      padding: '2rem 0'
    }}>
      <div className="container">
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '25px',
          padding: '0',
          boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.3)',
          overflow: 'hidden',
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '700px'
        }}>
          {/* Left Side - Branding */}
          <div style={{
            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            padding: '3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🚀</div>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Join the Revolution!
            </h1>
            <p style={{ 
              fontSize: '1.1rem', 
              opacity: '0.9',
              marginBottom: '2rem',
              lineHeight: '1.5'
            }}>
              Create your account and transform your street food business with cutting-edge technology.
            </p>
            
            {/* Benefits List */}
            <div style={{ textAlign: 'left', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginRight: '1rem' }}>🎯</div>
                <span style={{ fontSize: '0.95rem' }}>AI-powered business insights</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginRight: '1rem' }}>🌍</div>
                <span style={{ fontSize: '0.95rem' }}>Global market access</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginRight: '1rem' }}>💰</div>
                <span style={{ fontSize: '0.95rem' }}>Instant credit & financing</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginRight: '1rem' }}>🏆</div>
                <span style={{ fontSize: '0.95rem' }}>Gamification & rewards</span>
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '1.5rem',
              borderRadius: '15px',
              marginTop: '2rem',
              width: '100%'
            }}>
              <h4 style={{ color: 'white', marginBottom: '1rem' }}>🎉 Launch Offer</h4>
              <p style={{ fontSize: '0.9rem', opacity: '0.9', margin: 0 }}>
                Join now and get 3 months of premium features absolutely free!
              </p>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div style={{ padding: '3rem', overflowY: 'auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: '#333',
                marginBottom: '0.5rem'
              }}>
                Create Account
              </h2>
              <p style={{ color: '#666', fontSize: '1rem' }}>
                Fill in your details to get started
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
              {/* Role Selection */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600', 
                  color: '#333'
                }}>
                  👤 I am a
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    borderRadius: '15px',
                    border: `2px solid ${formData.role === 'vendor' ? '#11998e' : '#e9ecef'}`,
                    background: formData.role === 'vendor' ? 'rgba(17, 153, 142, 0.1)' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    <input
                      type="radio"
                      name="role"
                      value="vendor"
                      checked={formData.role === 'vendor'}
                      onChange={handleChange}
                      style={{ marginRight: '0.5rem' }}
                    />
                    <div>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>👨‍🍳</div>
                      <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Vendor</div>
                    </div>
                  </label>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    borderRadius: '15px',
                    border: `2px solid ${formData.role === 'supplier' ? '#11998e' : '#e9ecef'}`,
                    background: formData.role === 'supplier' ? 'rgba(17, 153, 142, 0.1)' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    <input
                      type="radio"
                      name="role"
                      value="supplier"
                      checked={formData.role === 'supplier'}
                      onChange={handleChange}
                      style={{ marginRight: '0.5rem' }}
                    />
                    <div>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🏪</div>
                      <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Supplier</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Email */}
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
                    background: 'white'
                  }}
                  placeholder="Enter your email"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#11998e';
                    e.target.style.boxShadow = '0 0 0 3px rgba(17, 153, 142, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Name/Business Name */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600', 
                  color: '#333'
                }}>
                  {formData.role === 'vendor' ? '👤 Your Name' : '🏢 Business Name'}
                </label>
                <input
                  type="text"
                  name={formData.role === 'vendor' ? 'name' : 'businessName'}
                  value={formData.role === 'vendor' ? formData.name : formData.businessName}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem 1.5rem',
                    borderRadius: '15px',
                    border: '2px solid #e9ecef',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    background: 'white'
                  }}
                  placeholder={formData.role === 'vendor' ? 'Enter your full name' : 'Enter your business name'}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#11998e';
                    e.target.style.boxShadow = '0 0 0 3px rgba(17, 153, 142, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Location and Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600', 
                    color: '#333'
                  }}>
                    📍 Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '1rem 1.5rem',
                      borderRadius: '15px',
                      border: '2px solid #e9ecef',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: 'white'
                    }}
                    placeholder="City, Area"
                    onFocus={(e) => {
                      e.target.style.borderColor = '#11998e';
                      e.target.style.boxShadow = '0 0 0 3px rgba(17, 153, 142, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e9ecef';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600', 
                    color: '#333'
                  }}>
                    📱 Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '1rem 1.5rem',
                      borderRadius: '15px',
                      border: '2px solid #e9ecef',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: 'white'
                    }}
                    placeholder="+91 XXXXX XXXXX"
                    onFocus={(e) => {
                      e.target.style.borderColor = '#11998e';
                      e.target.style.boxShadow = '0 0 0 3px rgba(17, 153, 142, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e9ecef';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Food Type for Vendors */}
              {formData.role === 'vendor' && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600', 
                    color: '#333'
                  }}>
                    🍽️ Food Type
                  </label>
                  <select
                    name="foodType"
                    value={formData.foodType}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '1rem 1.5rem',
                      borderRadius: '15px',
                      border: '2px solid #e9ecef',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: 'white'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#11998e';
                      e.target.style.boxShadow = '0 0 0 3px rgba(17, 153, 142, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e9ecef';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="">Select food type</option>
                    <option value="North Indian">North Indian</option>
                    <option value="South Indian">South Indian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Fast Food">Fast Food</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </div>
              )}

              {/* Password */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div>
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
                      background: 'white'
                    }}
                    placeholder="Create password"
                    onFocus={(e) => {
                      e.target.style.borderColor = '#11998e';
                      e.target.style.boxShadow = '0 0 0 3px rgba(17, 153, 142, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e9ecef';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600', 
                    color: '#333'
                  }}>
                    🔒 Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '1rem 1.5rem',
                      borderRadius: '15px',
                      border: '2px solid #e9ecef',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: 'white'
                    }}
                    placeholder="Confirm password"
                    onFocus={(e) => {
                      e.target.style.borderColor = '#11998e';
                      e.target.style.boxShadow = '0 0 0 3px rgba(17, 153, 142, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e9ecef';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '15px',
                  border: 'none',
                  background: loading ? '#ccc' : 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  marginBottom: '1.5rem'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 15px 35px rgba(17, 153, 142, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {loading ? '🔄 Creating Account...' : '🚀 Create Account'}
              </button>
            </form>

            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  style={{ 
                    color: '#11998e', 
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                  }}
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;