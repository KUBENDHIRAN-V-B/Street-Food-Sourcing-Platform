import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function SupplierDashboard() {
  const { apiCall } = useAuth();
  const [stats, setStats] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [ordersResponse, productsResponse] = await Promise.all([
        apiCall('/api/orders'),
        apiCall('/api/products')
      ]);

      if (ordersResponse && ordersResponse.ok) {
        const orders = await ordersResponse.json();
        setRecentOrders(orders.slice(0, 5));
        
        // Calculate stats
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const pendingOrders = orders.filter(order => order.status === 'pending').length;
        const completedOrders = orders.filter(order => order.status === 'delivered').length;

        setStats({
          totalOrders,
          totalRevenue,
          pendingOrders,
          completedOrders
        });
      }

      if (productsResponse && productsResponse.ok) {
        const productsData = await productsResponse.json();
        setProducts(productsData.slice(0, 6));
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
        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
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
          <p style={{ fontSize: '1.2rem', color: '#11998e' }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
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
                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem',
                lineHeight: '1.2'
              }}>
                Supplier Dashboard 🏪
              </h1>
              <p style={{ fontSize: '1.2rem', color: '#666', margin: 0, lineHeight: '1.5' }}>
                Manage your products, track orders, and grow your business with our platform.
              </p>
              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                marginTop: '1.5rem',
                flexWrap: 'wrap'
              }}>
                <Link 
                  to="/supplier/products" 
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
                  📦 Manage Products
                </Link>
                <Link 
                  to="/supplier/orders" 
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
                  📋 View Orders
                </Link>
              </div>
            </div>
            <div style={{ 
              background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
              borderRadius: '50%',
              width: '120px',
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              boxShadow: '0 15px 35px rgba(17, 153, 142, 0.3)',
              marginTop: '1rem'
            }}>
              🏪
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
            <div style={{ fontSize: '1.1rem', opacity: '0.9' }}>Orders Received</div>
            <div style={{ 
              marginTop: '1rem',
              padding: '0.75rem',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '10px',
              fontSize: '0.9rem'
            }}>
              📈 +18% from last month
            </div>
          </div>

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
              ₹{(stats.totalRevenue || 0).toLocaleString()}
            </div>
            <div style={{ fontSize: '1.1rem', opacity: '0.9' }}>Sales Revenue</div>
            <div style={{ 
              marginTop: '1rem',
              padding: '0.75rem',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '10px',
              fontSize: '0.9rem'
            }}>
              💹 +32% profit growth
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
                Processing
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
              🚚 Ready for processing
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
            <div style={{ fontSize: '1.1rem', opacity: '0.8' }}>Delivered Orders</div>
            <div style={{ 
              marginTop: '1rem',
              padding: '0.75rem',
              background: 'rgba(45,90,135,0.1)',
              borderRadius: '10px',
              fontSize: '0.9rem'
            }}>
              🎉 98% satisfaction rate
            </div>
          </div>
        </div>

        {/* Quick Actions */}
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
              background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}>
              🚀 Quick Actions
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>
              Manage your business efficiently with these quick tools
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem'
          }}>
            <Link to="/supplier/products" style={{ textDecoration: 'none' }}>
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
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
                <h3 style={{ color: 'white', marginBottom: '1rem' }}>Manage Products</h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>
                  Add, edit, and manage your product inventory with real-time stock tracking
                </p>
                <div style={{ 
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '15px',
                  fontSize: '0.875rem'
                }}>
                  {products.length} products listed
                </div>
              </div>
            </Link>

            <Link to="/supplier/orders" style={{ textDecoration: 'none' }}>
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
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
                <h3 style={{ color: 'white', marginBottom: '1rem' }}>Process Orders</h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>
                  View and process incoming orders with real-time status updates
                </p>
                <div style={{ 
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '15px',
                  fontSize: '0.875rem'
                }}>
                  {stats.pendingOrders || 0} pending orders
                </div>
              </div>
            </Link>

            <div style={{
              background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
              borderRadius: '20px',
              padding: '2rem',
              color: '#8B4513',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              boxShadow: '0 15px 35px rgba(252, 182, 159, 0.3)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 25px 50px rgba(252, 182, 159, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 15px 35px rgba(252, 182, 159, 0.3)';
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <h3 style={{ color: '#8B4513', marginBottom: '1rem' }}>Analytics</h3>
              <p style={{ color: 'rgba(139,69,19,0.8)', fontSize: '0.95rem' }}>
                View detailed analytics and insights about your business performance
              </p>
              <div style={{ 
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: 'rgba(139,69,19,0.2)',
                borderRadius: '15px',
                fontSize: '0.875rem'
              }}>
                Coming soon
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
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
              background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              📋 Recent Orders
            </h3>
            <Link 
              to="/supplier/orders" 
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
                    <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem' }}>
                      📋 {order.items?.length || 0} items
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
                      {order.status === 'pending' && '��� '}
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
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
              <h4 style={{ color: '#11998e', marginBottom: '1rem' }}>No orders yet!</h4>
              <p style={{ color: '#666', marginBottom: '2rem' }}>
                Orders from vendors will appear here once they start purchasing your products
              </p>
              <Link 
                to="/supplier/products" 
                style={{
                  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                  color: 'white',
                  padding: '1rem 2rem',
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
                📦 Add Products Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SupplierDashboard;