import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isFeaturesDropdownOpen, setIsFeaturesDropdownOpen] = useState(false);
  const [profileDropdownTimeout, setProfileDropdownTimeout] = useState(null);
  const [featuresDropdownTimeout, setFeaturesDropdownTimeout] = useState(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // Close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setIsFeaturesDropdownOpen(false);
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      document.removeEventListener('mousedown', handleClickOutside);
      if (profileDropdownTimeout) clearTimeout(profileDropdownTimeout);
      if (featuresDropdownTimeout) clearTimeout(featuresDropdownTimeout);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '0',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backdropFilter: 'blur(10px)'
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px'
  };

  const headerContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70px',
    position: 'relative'
  };

  const logoStyle = {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  };

  const logoTextStyle = {
    background: 'linear-gradient(45deg, #fff, #f0f0f0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const mobileToggleStyle = {
    display: isMobile ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.15)',
    border: 'none',
    color: 'white',
    padding: '12px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  };

  const navStyle = {
    display: isMobile && !isMenuOpen ? 'none' : 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    ...(isMobile && isMenuOpen && {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      flexDirection: 'column',
      padding: '1.5rem',
      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.1)'
    })
  };

  const linkStyle = (isActive = false) => ({
    color: 'white',
    textDecoration: 'none',
    padding: isMobile ? '12px 16px' : '10px 16px',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    fontSize: isMobile ? '1rem' : '0.95rem',
    fontWeight: '500',
    width: isMobile ? '100%' : 'auto',
    textAlign: isMobile ? 'center' : 'left',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    position: 'relative',
    background: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
    backdropFilter: isActive ? 'blur(10px)' : 'none',
    border: isActive ? '1px solid rgba(255,255,255,0.3)' : '1px solid transparent'
  });

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: isMobile ? '12px 16px' : '8px 12px',
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative'
  };

  const avatarStyle = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'white',
    border: '2px solid rgba(255,255,255,0.3)'
  };

  const userDetailsStyle = {
    display: isMobile ? 'none' : 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  };

  const userNameStyle = {
    fontSize: '0.9rem',
    fontWeight: '600',
    margin: 0,
    lineHeight: 1
  };

  const userRoleStyle = {
    fontSize: '0.75rem',
    opacity: 0.8,
    margin: 0,
    lineHeight: 1,
    textTransform: 'capitalize'
  };

  const dropdownStyle = {
    position: 'relative',
    display: 'inline-block'
  };

  const dropdownContentStyle = (isOpen) => ({
    position: 'absolute',
    top: '100%',
    right: 0,
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    borderRadius: '16px',
    padding: '8px',
    minWidth: '220px',
    display: isOpen ? 'block' : 'none',
    zIndex: 1000,
    border: '1px solid rgba(255,255,255,0.2)',
    marginTop: '8px'
  });

  const dropdownLinkStyle = {
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem',
    fontWeight: '500',
    borderRadius: '12px',
    margin: '2px 0'
  };

  const featuresDropdownStyle = (isOpen) => ({
    position: 'absolute',
    top: '100%',
    left: 0,
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    borderRadius: '16px',
    padding: '8px',
    minWidth: '280px',
    display: isOpen ? 'block' : 'none',
    zIndex: 1000,
    border: '1px solid rgba(255,255,255,0.2)',
    marginTop: '8px'
  });

  const logoutButtonStyle = {
    background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
    border: 'none',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
    width: isMobile ? '100%' : 'auto',
    justifyContent: 'center'
  };

  const badgeStyle = {
    background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
    color: 'white',
    fontSize: '0.7rem',
    padding: '2px 6px',
    borderRadius: '8px',
    fontWeight: '600',
    marginLeft: '4px'
  };

  const vendorFeatures = [
    { path: '/vendor/smart-recommendations', icon: '🤖', label: 'Smart Recommendations', badge: 'AI' },
    { path: '/vendor/voice-ordering', icon: '🎤', label: 'Voice Ordering', badge: 'NEW' },
    { path: '/vendor/micro-lending', icon: '💳', label: 'Micro Lending' },
    { path: '/vendor/sustainability', icon: '🌱', label: 'Sustainability Tracker' },
    { path: '/vendor/community', icon: '🤝', label: 'Community Hub' },
    { path: '/vendor/group-orders', icon: '👥', label: 'Group Orders' }
  ];

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <div style={headerContentStyle}>
          {/* Logo */}
          <Link 
            to="/" 
            style={logoStyle}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <span style={{ fontSize: '2rem' }}>🍜</span>
            <span style={logoTextStyle}>Street Food Platform</span>
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMenu} 
            style={mobileToggleStyle}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.25)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
          
          {/* Navigation */}
          <nav style={navStyle}>
            {user ? (
              <>
                {/* Main Navigation Links */}
                {user.role === 'vendor' && (
                  <>
                    <Link 
                      to="/vendor/dashboard"
                      style={linkStyle(isActiveRoute('/vendor/dashboard'))}
                      onMouseEnter={(e) => {
                        if (!isActiveRoute('/vendor/dashboard')) {
                          e.target.style.background = 'rgba(255,255,255,0.15)';
                          e.target.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActiveRoute('/vendor/dashboard')) {
                          e.target.style.background = 'transparent';
                          e.target.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      <span>📊</span> Dashboard
                    </Link>
                    
                    <Link 
                      to="/vendor/products"
                      style={linkStyle(isActiveRoute('/vendor/products'))}
                      onMouseEnter={(e) => {
                        if (!isActiveRoute('/vendor/products')) {
                          e.target.style.background = 'rgba(255,255,255,0.15)';
                          e.target.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActiveRoute('/vendor/products')) {
                          e.target.style.background = 'transparent';
                          e.target.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      <span>📦</span> Products
                    </Link>
                    
                    <Link 
                      to="/vendor/orders"
                      style={linkStyle(isActiveRoute('/vendor/orders'))}
                      onMouseEnter={(e) => {
                        if (!isActiveRoute('/vendor/orders')) {
                          e.target.style.background = 'rgba(255,255,255,0.15)';
                          e.target.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActiveRoute('/vendor/orders')) {
                          e.target.style.background = 'transparent';
                          e.target.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      <span>📋</span> Orders
                    </Link>
                    
                    {/* Features Dropdown */}
                    <div 
                      className="dropdown-container"
                      style={dropdownStyle}
                      onMouseEnter={() => {
                        if (!isMobile) {
                          if (featuresDropdownTimeout) clearTimeout(featuresDropdownTimeout);
                          setIsFeaturesDropdownOpen(true);
                        }
                      }}
                      onMouseLeave={() => {
                        if (!isMobile) {
                          const timeout = setTimeout(() => setIsFeaturesDropdownOpen(false), 300);
                          setFeaturesDropdownTimeout(timeout);
                        }
                      }}
                    >
                      <button
                        style={{
                          ...linkStyle(),
                          background: isFeaturesDropdownOpen ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                        onClick={() => isMobile ? setIsFeaturesDropdownOpen(!isFeaturesDropdownOpen) : null}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(255,255,255,0.2)';
                          e.target.style.transform = 'translateY(-2px)';
                          if (!isMobile) setIsFeaturesDropdownOpen(true);
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = isFeaturesDropdownOpen ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)';
                          e.target.style.transform = 'translateY(0)';
                        }}
                      >
                        <span>🚀</span> Features 
                        <span style={{ marginLeft: '4px', transition: 'transform 0.3s ease', transform: isFeaturesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          ▼
                        </span>
                      </button>
                      
                      <div style={featuresDropdownStyle(isFeaturesDropdownOpen)}>
                        {vendorFeatures.map((feature, index) => (
                          <Link 
                            key={index}
                            to={feature.path} 
                            style={dropdownLinkStyle}
                            onClick={() => setIsFeaturesDropdownOpen(false)}
                            onMouseEnter={(e) => {
                              e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                              e.target.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'transparent';
                              e.target.style.transform = 'translateX(0)';
                            }}
                          >
                            <span style={{ fontSize: '1.2rem' }}>{feature.icon}</span>
                            <span>{feature.label}</span>
                            {feature.badge && <span style={badgeStyle}>{feature.badge}</span>}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {user.role === 'supplier' && (
                  <>
                    <Link 
                      to="/supplier/dashboard"
                      style={linkStyle(isActiveRoute('/supplier/dashboard'))}
                      onMouseEnter={(e) => {
                        if (!isActiveRoute('/supplier/dashboard')) {
                          e.target.style.background = 'rgba(255,255,255,0.15)';
                          e.target.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActiveRoute('/supplier/dashboard')) {
                          e.target.style.background = 'transparent';
                          e.target.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      <span>📊</span> Dashboard
                    </Link>
                    
                    <Link 
                      to="/supplier/products"
                      style={linkStyle(isActiveRoute('/supplier/products'))}
                      onMouseEnter={(e) => {
                        if (!isActiveRoute('/supplier/products')) {
                          e.target.style.background = 'rgba(255,255,255,0.15)';
                          e.target.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActiveRoute('/supplier/products')) {
                          e.target.style.background = 'transparent';
                          e.target.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      <span>📦</span> Products
                    </Link>
                    
                    <Link 
                      to="/supplier/orders"
                      style={linkStyle(isActiveRoute('/supplier/orders'))}
                      onMouseEnter={(e) => {
                        if (!isActiveRoute('/supplier/orders')) {
                          e.target.style.background = 'rgba(255,255,255,0.15)';
                          e.target.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActiveRoute('/supplier/orders')) {
                          e.target.style.background = 'transparent';
                          e.target.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      <span>📋</span> Orders
                    </Link>
                  </>
                )}
                
                {/* User Profile Dropdown */}
                <div 
                  className="dropdown-container"
                  style={dropdownStyle}
                  onMouseEnter={() => {
                    if (!isMobile) {
                      if (profileDropdownTimeout) clearTimeout(profileDropdownTimeout);
                      setIsProfileDropdownOpen(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) {
                      const timeout = setTimeout(() => setIsProfileDropdownOpen(false), 300);
                      setProfileDropdownTimeout(timeout);
                    }
                  }}
                >
                  <div
                    style={userInfoStyle}
                    onClick={() => isMobile ? setIsProfileDropdownOpen(!isProfileDropdownOpen) : null}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.25)';
                      e.target.style.transform = 'translateY(-2px)';
                      if (!isMobile) setIsProfileDropdownOpen(true);
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.15)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={avatarStyle}>
                      {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                    </div>
                    <div style={userDetailsStyle}>
                      <div style={userNameStyle}>
                        {user.name || user.businessName || user.email.split('@')[0]}
                      </div>
                      <div style={userRoleStyle}>{user.role}</div>
                    </div>
                    <span style={{ 
                      marginLeft: '8px', 
                      transition: 'transform 0.3s ease',
                      transform: isProfileDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      fontSize: '0.8rem'
                    }}>
                      ▼
                    </span>
                  </div>
                  
                  <div style={dropdownContentStyle(isProfileDropdownOpen)}>
                    <Link 
                      to="/profile" 
                      style={dropdownLinkStyle}
                      onClick={() => setIsProfileDropdownOpen(false)}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                        e.target.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.transform = 'translateX(0)';
                      }}
                    >
                      <span>👤</span> My Profile
                    </Link>
                    
                    <Link 
                      to="/settings" 
                      style={dropdownLinkStyle}
                      onClick={() => setIsProfileDropdownOpen(false)}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                        e.target.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.transform = 'translateX(0)';
                      }}
                    >
                      <span>⚙️</span> Settings
                    </Link>
                    
                    <div style={{ height: '1px', background: 'rgba(0,0,0,0.1)', margin: '8px 16px' }}></div>
                    
                    <button 
                      onClick={handleLogout}
                      style={{
                        ...dropdownLinkStyle,
                        background: 'transparent',
                        border: 'none',
                        width: '100%',
                        textAlign: 'left',
                        color: '#dc3545',
                        fontWeight: '600'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(220, 53, 69, 0.1)';
                        e.target.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.transform = 'translateX(0)';
                      }}
                    >
                      <span>🚪</span> Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  style={linkStyle()}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.15)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <span>🔑</span> Login
                </Link>
                
                <Link 
                  to="/register"
                  style={{
                    ...linkStyle(),
                    background: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    fontWeight: '600'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.3)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 15px rgba(255,255,255,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.2)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <span>✨</span> Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;