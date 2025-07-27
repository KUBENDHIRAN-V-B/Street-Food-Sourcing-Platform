import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function VendorDashboard() {
  const { apiCall } = useAuth();
  const [stats, setStats] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [ordersResponse] = await Promise.all([
        apiCall('/api/orders')
      ]);

      if (ordersResponse && ordersResponse.ok) {
        const orders = await ordersResponse.json();
        setRecentOrders(orders.slice(0, 5));
        
        // Calculate stats
        const totalOrders = orders.length;
        const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
        const pendingOrders = orders.filter(order => order.status === 'pending').length;
        const completedOrders = orders.filter(order => order.status === 'delivered').length;

        setStats({
          totalOrders,
          totalSpent,
          pendingOrders,
          completedOrders
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '3rem',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <div className="spinner" style={{ width: '50px', height: '50px', margin: '0 auto 1rem auto' }}></div>
          <p style={{ fontSize: '1.2rem', color: '#667eea' }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 0'
    }}>
      <div className="container">
        {/* Welcome Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '25px',
          padding: '2.5rem',
          marginBottom: '2rem',
          boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h1 style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem',
                lineHeight: '1.2'
              }}>
                Welcome Back! 👋
              </h1>
              <p style={{ fontSize: '1.2rem', color: '#666', margin: 0, lineHeight: '1.5' }}>
                Ready to grow your street food business? Here's your complete overview.
              </p>
              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                marginTop: '1.5rem',
                flexWrap: 'wrap'
              }}>
                <Link 
                  to="/vendor/products" 
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '15px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
                  }}
                >
                  🛒 Browse Products
                </Link>
                <Link 
                  to="/vendor/voice-ordering" 
                  style={{
                    background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '15px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    boxShadow: '0 10px 25px rgba(17, 153, 142, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 15px 35px rgba(17, 153, 142, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 10px 25px rgba(17, 153, 142, 0.3)';
                  }}
                >
                  🎤 Voice Order
                </Link>
              </div>
            </div>
            <div style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              width: '120px',
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              boxShadow: '0 15px 35px rgba(102, 126, 234, 0.3)',
              marginTop: '1rem'
            }}>
              🧑‍🍳
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '25px',
            padding: '2.5rem',
            color: 'white',
            boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-8px)';
            e.target.style.boxShadow = '0 30px 60px rgba(102, 126, 234, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3)';
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3rem' }}>📦</div>
              <div style={{ 
                background: 'rgba(255,255,255,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '15px',
                fontSize: '0.875rem'
              }}>
                Total Orders
              </div>
            </div>
            <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.5rem', lineHeight: '1' }}>
              {stats.totalOrders || 0}
            </div>
            <div style={{ fontSize: '1.1rem', opacity: '0.9' }}>Orders Placed Successfully</div>
            <div style={{ 
              marginTop: '1rem',
              padding: '0.75rem',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '10px',
              fontSize: '0.9rem'
            }}>
              📈 +12% from last month
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            borderRadius: '25px',
            padding: '2.5rem',
            color: 'white',
            boxShadow: '0 20px 40px rgba(17, 153, 142, 0.3)',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-8px)';
            e.target.style.boxShadow = '0 30px 60px rgba(17, 153, 142, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 20px 40px rgba(17, 153, 142, 0.3)';
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3rem' }}>💰</div>
              <div style={{ 
                background: 'rgba(255,255,255,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '15px',
                fontSize: '0.875rem'
              }}>
                Total Revenue
              </div>
            </div>
            <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.5rem', lineHeight: '1' }}>
              ₹{(stats.totalSpent || 0).toLocaleString()}
            </div>
            <div style={{ fontSize: '1.1rem', opacity: '0.9' }}>Total Investment</div>
            <div style={{ 
              marginTop: '1rem',
              padding: '0.75rem',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '10px',
              fontSize: '0.9rem'
            }}>
              💹 +25% profit margin
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            borderRadius: '25px',
            padding: '2.5rem',
            color: '#8B4513',
            boxShadow: '0 20px 40px rgba(252, 182, 159, 0.3)',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-8px)';
            e.target.style.boxShadow = '0 30px 60px rgba(252, 182, 159, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 20px 40px rgba(252, 182, 159, 0.3)';
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3rem' }}>⏳</div>
              <div style={{ 
                background: 'rgba(139,69,19,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '15px',
                fontSize: '0.875rem'
              }}>
                In Progress
              </div>
            </div>
            <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.5rem', lineHeight: '1' }}>
              {stats.pendingOrders || 0}
            </div>
            <div style={{ fontSize: '1.1rem', opacity: '0.8' }}>Pending Orders</div>
            <div style={{ 
              marginTop: '1rem',
              padding: '0.75rem',
              background: 'rgba(139,69,19,0.1)',
              borderRadius: '10px',
              fontSize: '0.9rem'
            }}>
              🚚 Expected delivery soon
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            borderRadius: '25px',
            padding: '2.5rem',
            color: '#2D5A87',
            boxShadow: '0 20px 40px rgba(168, 237, 234, 0.3)',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-8px)';
            e.target.style.boxShadow = '0 30px 60px rgba(168, 237, 234, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 20px 40px rgba(168, 237, 234, 0.3)';
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}></div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3rem' }}>✅</div>
              <div style={{ 
                background: 'rgba(45,90,135,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '15px',
                fontSize: '0.875rem'
              }}>
                Completed
              </div>
            </div>
            <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.5rem', lineHeight: '1' }}>
              {stats.completedOrders || 0}
            </div>
            <div style={{ fontSize: '1.1rem', opacity: '0.8' }}>Successful Orders</div>
            <div style={{ 
              marginTop: '1rem',
              padding: '0.75rem',
              background: 'rgba(45,90,135,0.1)',
              borderRadius: '10px',
              fontSize: '0.9rem'
            }}>
              🎉 100% satisfaction rate
            </div>
          </div>
        </div>

        {/* Revolutionary Features Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '25px',
          padding: '2.5rem',
          marginBottom: '2rem',
          boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}>
              🚀 Revolutionary Features
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>
              Explore cutting-edge tools designed to transform your business
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem'
          }}>
            <Link to="/vendor/smart-recommendations" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '20px',
                padding: '2rem',
                color: 'white',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                boxShadow: '0 15px 35px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.3)';
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
                <h3 style={{ color: 'white', marginBottom: '1rem' }}>AI Smart Recommendations</h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>
                  Weather-based demand prediction, personalized suggestions, and inventory optimization
                </p>
                <div style={{ 
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '15px',
                  fontSize: '0.875rem'
                }}>
                  40% waste reduction
                </div>
              </div>
            </Link>

            <Link to="/vendor/voice-ordering" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                borderRadius: '20px',
                padding: '2rem',
                color: 'white',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                boxShadow: '0 15px 35px rgba(17, 153, 142, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 25px 50px rgba(17, 153, 142, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 15px 35px rgba(17, 153, 142, 0.3)';
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎤</div>
                <h3 style={{ color: 'white', marginBottom: '1rem' }}>Voice Ordering</h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>
                  Order in Hindi, Bengali, Tamil, and 5+ Indian languages with hands-free commands
                </p>
                <div style={{ 
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '15px',
                  fontSize: '0.875rem'
                }}>
                  50% faster ordering
                </div>
              </div>
            </Link>

            <Link to="/vendor/micro-lending" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                borderRadius: '20px',
                padding: '2rem',
                color: '#8B4513',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                boxShadow: '0 15px 35px rgba(252, 182, 159, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 25px 50px rgba(252, 182, 159, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 15px 35px rgba(252, 182, 159, 0.3)';
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💳</div>
                <h3 style={{ color: '#8B4513', marginBottom: '1rem' }}>Micro-Lending</h3>
                <p style={{ color: 'rgba(139,69,19,0.8)', fontSize: '0.95rem' }}>
                  Instant credit scoring, pre-approved loans, and flexible EMI options for growth
                </p>
                <div style={{ 
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(139,69,19,0.2)',
                  borderRadius: '15px',
                  fontSize: '0.875rem'
                }}>
                  24-48hr disbursal
                </div>
              </div>
            </Link>



            <Link to="/vendor/game-center" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                borderRadius: '20px',
                padding: '2rem',
                color: '#8B2635',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                boxShadow: '0 15px 35px rgba(255, 154, 158, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 25px 50px rgba(255, 154, 158, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 15px 35px rgba(255, 154, 158, 0.3)';
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎮</div>
                <h3 style={{ color: '#8B2635', marginBottom: '1rem' }}>Game Center</h3>
                <p style={{ color: 'rgba(139,38,53,0.8)', fontSize: '0.95rem' }}>
                  Achievements, NFT rewards, leaderboards, and daily challenges
                </p>
                <div style={{ 
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(139,38,53,0.2)',
                  borderRadius: '15px',
                  fontSize: '0.875rem'
                }}>
                  Earn NFT rewards
                </div>
              </div>
            </Link>


          </div>
        </div>

        {/* Recent Orders Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '25px',
          padding: '2.5rem',
          boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              📋 Recent Orders
            </h3>
            <Link 
              to="/vendor/orders" 
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '15px',
                textDecoration: 'none',
                fontWeight: '500',
                boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
              }}
            >
              View All Orders
            </Link>
          </div>

          {recentOrders.length > 0 ? (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {recentOrders.map(order => (
                <div key={order.id} style={{ 
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
                }}>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '0.5rem', color: '#333' }}>
                      📦 Order #{order.id.slice(0, 8)}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      📅 {new Date(order.createdAt).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '700', fontSize: '1.3rem', marginBottom: '0.5rem', color: '#11998e' }}>
                      ₹{order.total.toLocaleString()}
                    </div>
                    <span className={`status status-${order.status}`} style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      textTransform: 'capitalize'
                    }}>
                      {order.status === 'pending' && '⏳ '}
                      {order.status === 'delivered' && '✅ '}
                      {order.status === 'processing' && '🔄 '}
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem 0',
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              borderRadius: '15px'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
              <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>No orders yet!</h4>
              <p style={{ color: '#666', marginBottom: '2rem' }}>
                Start your journey by browsing our amazing products
              </p>
              <Link 
                to="/vendor/products" 
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '15px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
                }}
              >
                🛒 Start Shopping Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;