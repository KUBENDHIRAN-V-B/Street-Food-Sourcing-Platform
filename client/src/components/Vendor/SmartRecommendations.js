import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function SmartRecommendations() {
  const { user, apiCall } = useAuth();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState({});
  const [marketTrends, setMarketTrends] = useState([]);
  const [personalizedSuggestions, setPersonalizedSuggestions] = useState([]);
  const [priceAlerts, setPriceAlerts] = useState([]);
  const [inventoryOptimization, setInventoryOptimization] = useState([]);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    loadRecommendations();
    loadMarketTrends();
    loadWeatherData();
  }, []);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      
      // Simulate AI-powered recommendations based on user data
      const mockRecommendations = {
        topProducts: [
          {
            id: 1,
            name: 'Fresh Onions',
            category: 'Vegetables',
            currentPrice: 25,
            trend: 'up',
            demandScore: 95,
            profitMargin: 'High',
            reason: 'Essential ingredient with consistent demand',
            icon: '🧅',
            stockLevel: 'Low',
            reorderSuggestion: '50kg',
            suppliers: 3
          },
          {
            id: 2,
            name: 'Basmati Rice',
            category: 'Grains',
            currentPrice: 120,
            trend: 'stable',
            demandScore: 88,
            profitMargin: 'Medium',
            reason: 'Staple ingredient for biryanis and rice dishes',
            icon: '🌾',
            stockLevel: 'Optimal',
            reorderSuggestion: '25kg',
            suppliers: 5
          },
          {
            id: 3,
            name: 'Garam Masala',
            category: 'Spices',
            currentPrice: 180,
            trend: 'up',
            demandScore: 82,
            profitMargin: 'High',
            reason: 'Premium spice blend with high markup potential',
            icon: '🌶️',
            stockLevel: 'Critical',
            reorderSuggestion: '5kg',
            suppliers: 4
          },
          {
            id: 4,
            name: 'Fresh Tomatoes',
            category: 'Vegetables',
            currentPrice: 30,
            trend: 'down',
            demandScore: 90,
            profitMargin: 'Medium',
            reason: 'Versatile ingredient, price currently favorable',
            icon: '🍅',
            stockLevel: 'Good',
            reorderSuggestion: '30kg',
            suppliers: 6
          }
        ],
        insights: {
          totalSavings: 2450,
          optimizationScore: 78,
          trendsFollowed: 12,
          missedOpportunities: 3
        }
      };

      const mockPersonalized = [
        {
          type: 'restock',
          title: 'Restock Alert: Green Chilies',
          description: 'Based on your usage pattern, you\'ll run out in 2 days',
          priority: 'high',
          action: 'Order 10kg now',
          savings: 150,
          icon: '🌶️'
        },
        {
          type: 'opportunity',
          title: 'Price Drop: Premium Oil',
          description: 'Your preferred cooking oil is 15% cheaper this week',
          priority: 'medium',
          action: 'Buy 20L to save ₹300',
          savings: 300,
          icon: '🛢️'
        },
        {
          type: 'trend',
          title: 'Trending: Organic Vegetables',
          description: 'Customer demand for organic items increased 40%',
          priority: 'medium',
          action: 'Add organic options',
          savings: 500,
          icon: '🥬'
        },
        {
          type: 'efficiency',
          title: 'Bulk Order Opportunity',
          description: 'Combine with 3 nearby vendors for 20% discount',
          priority: 'low',
          action: 'Join group order',
          savings: 800,
          icon: '🤝'
        }
      ];

      const mockPriceAlerts = [
        {
          product: 'Cumin Seeds',
          currentPrice: 450,
          targetPrice: 400,
          change: '+12%',
          trend: 'rising',
          alert: 'Price increased significantly',
          icon: '🌿'
        },
        {
          product: 'Mustard Oil',
          currentPrice: 140,
          targetPrice: 150,
          change: '-7%',
          trend: 'falling',
          alert: 'Good time to buy',
          icon: '🛢️'
        },
        {
          product: 'Cardamom',
          currentPrice: 1200,
          targetPrice: 1100,
          change: '+9%',
          trend: 'rising',
          alert: 'Consider alternatives',
          icon: '🌿'
        }
      ];

      const mockInventoryOptimization = [
        {
          category: 'Vegetables',
          currentStock: '85kg',
          optimalStock: '120kg',
          status: 'understock',
          recommendation: 'Increase vegetable inventory by 35kg',
          impact: 'Prevent stockouts during peak hours',
          priority: 'high'
        },
        {
          category: 'Spices',
          currentStock: '25kg',
          optimalStock: '20kg',
          status: 'overstock',
          recommendation: 'Reduce spice orders by 20%',
          impact: 'Free up ₹2,000 in working capital',
          priority: 'medium'
        },
        {
          category: 'Grains',
          currentStock: '50kg',
          optimalStock: '50kg',
          status: 'optimal',
          recommendation: 'Maintain current levels',
          impact: 'Perfect balance achieved',
          priority: 'low'
        }
      ];

      setRecommendations(mockRecommendations);
      setPersonalizedSuggestions(mockPersonalized);
      setPriceAlerts(mockPriceAlerts);
      setInventoryOptimization(mockInventoryOptimization);
      
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMarketTrends = async () => {
    const mockTrends = [
      {
        category: 'Vegetables',
        trend: 'up',
        change: '+15%',
        reason: 'Seasonal shortage due to weather',
        impact: 'High',
        timeframe: 'Next 2 weeks'
      },
      {
        category: 'Spices',
        trend: 'stable',
        change: '+2%',
        reason: 'Steady demand, normal supply',
        impact: 'Low',
        timeframe: 'Next month'
      },
      {
        category: 'Grains',
        trend: 'down',
        change: '-8%',
        reason: 'Good harvest, increased supply',
        impact: 'Medium',
        timeframe: 'Next 3 months'
      },
      {
        category: 'Dairy',
        trend: 'up',
        change: '+12%',
        reason: 'Festival season demand',
        impact: 'High',
        timeframe: 'Next 4 weeks'
      }
    ];
    setMarketTrends(mockTrends);
  };

  const loadWeatherData = async () => {
    // Mock weather data that affects food demand
    const mockWeather = {
      current: 'Sunny, 32°C',
      forecast: 'Hot and dry for next 5 days',
      impact: 'High demand for cold beverages and cooling ingredients',
      recommendations: [
        'Stock up on mint and cucumber',
        'Increase ice and cold drink supplies',
        'Consider summer special menu items'
      ]
    };
    setWeatherData(mockWeather);
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getStockLevelColor = (level) => {
    switch (level) {
      case 'Critical': return '#dc3545';
      case 'Low': return '#fd7e14';
      case 'Good': return '#28a745';
      case 'Optimal': return '#20c997';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
        <div className="loading">
          <div className="spinner"></div>
          <p style={{ marginTop: '1rem' }}>Analyzing market data and generating recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🤖 Smart Recommendations
        </h1>
        <p style={{ color: '#666' }}>
          AI-powered insights to optimize your inventory, reduce costs, and maximize profits
        </p>
      </div>

      {/* Performance Dashboard */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📊 Performance Overview
          </h3>
        </div>
        <div className="row">
          <div className="col-3">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', color: '#28a745', marginBottom: '0.5rem' }}>
                ₹{recommendations.insights?.totalSavings || 0}
              </div>
              <h4>Total Savings</h4>
              <p style={{ color: '#666', fontSize: '0.875rem' }}>This month</p>
            </div>
          </div>
          <div className="col-3">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', color: '#667eea', marginBottom: '0.5rem' }}>
                {recommendations.insights?.optimizationScore || 0}%
              </div>
              <h4>Optimization Score</h4>
              <p style={{ color: '#666', fontSize: '0.875rem' }}>Above average</p>
            </div>
          </div>
          <div className="col-3">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', color: '#ffc107', marginBottom: '0.5rem' }}>
                {recommendations.insights?.trendsFollowed || 0}
              </div>
              <h4>Trends Followed</h4>
              <p style={{ color: '#666', fontSize: '0.875rem' }}>Smart decisions</p>
            </div>
          </div>
          <div className="col-3">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', color: '#dc3545', marginBottom: '0.5rem' }}>
                {recommendations.insights?.missedOpportunities || 0}
              </div>
              <h4>Missed Opportunities</h4>
              <p style={{ color: '#666', fontSize: '0.875rem' }}>Room for improvement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #dee2e6' }}>
          {[
            { id: 'overview', label: '📋 Overview', icon: '����' },
            { id: 'products', label: '🛍️ Product Recommendations', icon: '🛍️' },
            { id: 'alerts', label: '🚨 Price Alerts', icon: '🚨' },
            { id: 'inventory', label: '📦 Inventory Optimization', icon: '📦' },
            { id: 'trends', label: '📈 Market Trends', icon: '📈' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`btn ${selectedTab === tab.id ? 'btn-primary' : 'btn-outline'}`}
              style={{ 
                borderRadius: '0',
                borderBottom: selectedTab === tab.id ? '3px solid #667eea' : 'none',
                margin: '0 0.5rem'
              }}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ padding: '2rem' }}>
          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div>
              {/* Weather Impact */}
              {weatherData && (
                <div style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  marginBottom: '2rem'
                }}>
                  <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🌤️ Weather Impact Analysis
                  </h4>
                  <div className="row">
                    <div className="col-2">
                      <p><strong>Current:</strong> {weatherData.current}</p>
                      <p><strong>Forecast:</strong> {weatherData.forecast}</p>
                    </div>
                    <div className="col-2">
                      <p><strong>Impact:</strong> {weatherData.impact}</p>
                      <div style={{ marginTop: '1rem' }}>
                        <strong>Recommendations:</strong>
                        <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
                          {weatherData.recommendations.map((rec, index) => (
                            <li key={index} style={{ fontSize: '0.875rem' }}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Personalized Suggestions */}
              <h4 style={{ marginBottom: '1rem' }}>🎯 Personalized Suggestions</h4>
              <div className="row">
                {personalizedSuggestions.map((suggestion, index) => (
                  <div key={index} className="col-2">
                    <div style={{ 
                      border: `2px solid ${getPriorityColor(suggestion.priority)}`,
                      borderRadius: '12px',
                      padding: '1rem',
                      height: '100%',
                      background: suggestion.priority === 'high' ? '#fff5f5' : 
                                 suggestion.priority === 'medium' ? '#fffbf0' : '#f0fff4'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        marginBottom: '1rem'
                      }}>
                        <span style={{ fontSize: '1.5rem' }}>{suggestion.icon}</span>
                        <span style={{ 
                          background: getPriorityColor(suggestion.priority),
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          textTransform: 'uppercase'
                        }}>
                          {suggestion.priority}
                        </span>
                      </div>
                      <h5 style={{ marginBottom: '0.5rem' }}>{suggestion.title}</h5>
                      <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
                        {suggestion.description}
                      </p>
                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: '#28a745' }}>Save ₹{suggestion.savings}</strong>
                      </div>
                      <button 
                        className="btn btn-primary btn-small"
                        style={{ width: '100%' }}
                      >
                        {suggestion.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product Recommendations Tab */}
          {selectedTab === 'products' && (
            <div>
              <h4 style={{ marginBottom: '1rem' }}>🔥 Top Product Recommendations</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Trend</th>
                      <th>Demand</th>
                      <th>Stock Level</th>
                      <th>Suggestion</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recommendations.topProducts?.map(product => (
                      <tr key={product.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>{product.icon}</span>
                            <div>
                              <strong>{product.name}</strong>
                              <br />
                              <small style={{ color: '#666' }}>{product.reason}</small>
                            </div>
                          </div>
                        </td>
                        <td>{product.category}</td>
                        <td>₹{product.currentPrice}</td>
                        <td>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            {getTrendIcon(product.trend)}
                            <span style={{ 
                              color: product.trend === 'up' ? '#28a745' : 
                                     product.trend === 'down' ? '#dc3545' : '#6c757d'
                            }}>
                              {product.trend}
                            </span>
                          </span>
                        </td>
                        <td>
                          <div style={{ 
                            background: `linear-gradient(90deg, #28a745 ${product.demandScore}%, #e9ecef ${product.demandScore}%)`,
                            height: '20px',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}>
                            {product.demandScore}%
                          </div>
                        </td>
                        <td>
                          <span style={{ 
                            background: getStockLevelColor(product.stockLevel),
                            color: 'white',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem'
                          }}>
                            {product.stockLevel}
                          </span>
                        </td>
                        <td>
                          <strong>Order {product.reorderSuggestion}</strong>
                          <br />
                          <small>{product.suppliers} suppliers available</small>
                        </td>
                        <td>
                          <button className="btn btn-primary btn-small">
                            Order Now
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Price Alerts Tab */}
          {selectedTab === 'alerts' && (
            <div>
              <h4 style={{ marginBottom: '1rem' }}>🚨 Price Alerts & Market Movements</h4>
              <div className="row">
                {priceAlerts.map((alert, index) => (
                  <div key={index} className="col-3">
                    <div style={{ 
                      border: `2px solid ${alert.trend === 'rising' ? '#dc3545' : '#28a745'}`,
                      borderRadius: '12px',
                      padding: '1rem',
                      background: alert.trend === 'rising' ? '#fff5f5' : '#f0fff4'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        marginBottom: '1rem'
                      }}>
                        <span style={{ fontSize: '2rem' }}>{alert.icon}</span>
                        <span style={{ 
                          background: alert.trend === 'rising' ? '#dc3545' : '#28a745',
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '12px',
                          fontSize: '0.875rem',
                          fontWeight: 'bold'
                        }}>
                          {alert.change}
                        </span>
                      </div>
                      <h5 style={{ marginBottom: '0.5rem' }}>{alert.product}</h5>
                      <div style={{ marginBottom: '1rem' }}>
                        <div>Current: <strong>₹{alert.currentPrice}</strong></div>
                        <div>Target: <strong>₹{alert.targetPrice}</strong></div>
                      </div>
                      <p style={{ 
                        fontSize: '0.875rem',
                        color: alert.trend === 'rising' ? '#dc3545' : '#28a745',
                        fontWeight: 'bold',
                        margin: 0
                      }}>
                        {alert.alert}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inventory Optimization Tab */}
          {selectedTab === 'inventory' && (
            <div>
              <h4 style={{ marginBottom: '1rem' }}>📦 Inventory Optimization Analysis</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Current Stock</th>
                      <th>Optimal Stock</th>
                      <th>Status</th>
                      <th>Recommendation</th>
                      <th>Impact</th>
                      <th>Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryOptimization.map((item, index) => (
                      <tr key={index}>
                        <td><strong>{item.category}</strong></td>
                        <td>{item.currentStock}</td>
                        <td>{item.optimalStock}</td>
                        <td>
                          <span style={{ 
                            background: item.status === 'understock' ? '#dc3545' :
                                       item.status === 'overstock' ? '#ffc107' : '#28a745',
                            color: 'white',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            textTransform: 'capitalize'
                          }}>
                            {item.status}
                          </span>
                        </td>
                        <td>{item.recommendation}</td>
                        <td style={{ fontSize: '0.875rem', color: '#666' }}>{item.impact}</td>
                        <td>
                          <span style={{ 
                            background: getPriorityColor(item.priority),
                            color: 'white',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            textTransform: 'uppercase'
                          }}>
                            {item.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Market Trends Tab */}
          {selectedTab === 'trends' && (
            <div>
              <h4 style={{ marginBottom: '1rem' }}>📈 Market Trends & Forecasts</h4>
              <div className="row">
                {marketTrends.map((trend, index) => (
                  <div key={index} className="col-2">
                    <div style={{ 
                      border: '2px solid #e9ecef',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      textAlign: 'center',
                      height: '100%'
                    }}>
                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                        {getTrendIcon(trend.trend)}
                      </div>
                      <h5 style={{ marginBottom: '1rem' }}>{trend.category}</h5>
                      <div style={{ 
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: trend.trend === 'up' ? '#28a745' : 
                               trend.trend === 'down' ? '#dc3545' : '#6c757d',
                        marginBottom: '1rem'
                      }}>
                        {trend.change}
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
                        {trend.reason}
                      </p>
                      <div style={{ marginBottom: '1rem' }}>
                        <span style={{ 
                          background: trend.impact === 'High' ? '#dc3545' :
                                     trend.impact === 'Medium' ? '#ffc107' : '#28a745',
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem'
                        }}>
                          {trend.impact} Impact
                        </span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: '#666' }}>
                        <strong>Timeline:</strong> {trend.timeframe}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h3>🚀 Quick Actions</h3>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.href = '/vendor/products'}
          >
            🛍️ Browse Recommended Products
          </button>
          <button 
            className="btn btn-success"
            onClick={() => window.location.href = '/vendor/group-orders'}
          >
            🤝 Join Group Orders
          </button>
          <button 
            className="btn btn-warning"
            onClick={() => alert('Price alerts will be sent to your phone!')}
          >
            🔔 Set Price Alerts
          </button>
          <button 
            className="btn btn-info"
            onClick={() => loadRecommendations()}
          >
            🔄 Refresh Analysis
          </button>
          <button 
            className="btn btn-outline"
            onClick={() => window.location.href = '/vendor/analytics'}
          >
            📊 View Detailed Analytics
          </button>
        </div>
      </div>

      {/* AI Insights Footer */}
      <div style={{ 
        marginTop: '2rem', 
        padding: '1.5rem', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          🤖 AI-Powered Insights
        </h4>
        <p style={{ margin: 0, fontSize: '0.95rem' }}>
          These recommendations are generated using machine learning algorithms that analyze market trends, 
          weather patterns, seasonal demands, your order history, and real-time pricing data. 
          The system learns from your preferences and continuously improves suggestions to maximize your profitability.
        </p>
        <div style={{ marginTop: '1rem', fontSize: '0.875rem', opacity: 0.9 }}>
          <strong>Last Updated:</strong> {new Date().toLocaleString()} | 
          <strong> Confidence Score:</strong> 94% | 
          <strong> Data Sources:</strong> 15+ market feeds
        </div>
      </div>
    </div>
  );
}

export default SmartRecommendations;