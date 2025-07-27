import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function ProductCatalog() {
  const { apiCall } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, sortBy]);

  const fetchProducts = async () => {
    try {
      const response = await apiCall('/api/products');
      if (response && response.ok) {
        const data = await response.json();
        setProducts(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.supplier?.rating || 0) - (a.supplier?.rating || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Vegetables': return '🥬';
      case 'Spices': return '🌶️';
      case 'Grains': return '🌾';
      case 'Dairy': return '🥛';
      case 'Meat': return '🥩';
      case 'Seafood': return '🐟';
      default: return '🛒';
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
          <p style={{ fontSize: '1.2rem', color: '#667eea' }}>Loading products...</p>
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
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '25px',
          padding: '2.5rem',
          marginBottom: '2rem',
          boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.3)',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            🛒 Product Catalog
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#666', margin: 0 }}>
            Browse and order from our wide selection of fresh ingredients and premium supplies
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem', 
            marginTop: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚚</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Free Delivery</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Quality Assured</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Best Prices</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤝</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Trusted Suppliers</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem',
            alignItems: 'end'
          }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600', 
                color: '#333',
                fontSize: '0.9rem'
              }}>
                🔍 Search Products
              </label>
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  borderRadius: '15px',
                  border: '2px solid #e9ecef',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background: 'white'
                }}
                placeholder="Search for ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
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
                color: '#333',
                fontSize: '0.9rem'
              }}>
                📂 Category
              </label>
              <select
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  borderRadius: '15px',
                  border: '2px solid #e9ecef',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background: 'white'
                }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {getCategoryIcon(category)} {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600', 
                color: '#333',
                fontSize: '0.9rem'
              }}>
                🔄 Sort By
              </label>
              <select
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  borderRadius: '15px',
                  border: '2px solid #e9ecef',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background: 'white'
                }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="name">📝 Sort by Name</option>
                <option value="price-low">💰 Price: Low to High</option>
                <option value="price-high">💎 Price: High to Low</option>
                <option value="rating">⭐ Highest Rated</option>
              </select>
            </div>
            
            <div>
              <button 
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  borderRadius: '15px',
                  border: '2px solid #667eea',
                  background: 'transparent',
                  color: '#667eea',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSortBy('name');
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#667eea';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#667eea';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                🗑️ Clear Filters
              </button>
            </div>
          </div>

          {/* Results Summary */}
          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem', 
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '1rem', color: '#667eea', fontWeight: '600' }}>
              📊 Showing {filteredProducts.length} products
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory && ` in ${selectedCategory}`}
            </span>
          </div>
        </div>

        {/* Shopping Cart Summary */}
        {cart.length > 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(20px)',
            border: '2px solid #11998e'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '1.2rem', fontWeight: '600', color: '#11998e' }}>
                  🛒 Cart: {cart.length} items
                </span>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#11998e', marginLeft: '1rem' }}>
                  Total: ₹{getTotalPrice().toLocaleString()}
                </span>
              </div>
              <button
                style={{
                  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '15px',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 15px 35px rgba(17, 153, 142, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                🚀 Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '2rem'
        }}>
          {filteredProducts.map(product => {
            const cartItem = cart.find(item => item.id === product.id);
            const isInCart = !!cartItem;
            
            return (
              <div key={product.id} style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: '0',
                boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.3)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-8px)';
                e.target.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
              }}>
                {/* Product Image */}
                <div style={{
                  height: '200px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  position: 'relative'
                }}>
                  {getCategoryIcon(product.category)}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255,255,255,0.9)',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#667eea'
                  }}>
                    {product.category}
                  </div>
                  {product.stock < 10 && (
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      background: '#dc3545',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      Low Stock
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div style={{ padding: '2rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 'bold', 
                      color: '#333',
                      marginBottom: '0.5rem',
                      lineHeight: '1.3'
                    }}>
                      {product.name}
                    </h3>
                    <p style={{ 
                      color: '#666', 
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      margin: 0
                    }}>
                      {product.description}
                    </p>
                  </div>

                  {/* Supplier Info */}
                  {product.supplier && (
                    <div style={{
                      background: '#f8f9fa',
                      padding: '1rem',
                      borderRadius: '15px',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#333' }}>
                            🏪 {product.supplier.businessName}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#666' }}>
                            📍 {product.supplier.location}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.875rem', color: '#ffc107' }}>
                            ⭐ {product.supplier.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Price and Stock */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <div>
                      <div style={{ 
                        fontSize: '2rem', 
                        fontWeight: 'bold', 
                        color: '#11998e',
                        lineHeight: '1'
                      }}>
                        ₹{product.price}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#666' }}>
                        per {product.unit}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ 
                        fontSize: '1rem', 
                        fontWeight: '600',
                        color: product.stock > 10 ? '#28a745' : '#dc3545'
                      }}>
                        📦 {product.stock} {product.unit}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#666' }}>
                        in stock
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart / Quantity Controls */}
                  {!isInCart ? (
                    <button
                      style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '15px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => addToCart(product)}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      🛒 Add to Cart
                    </button>
                  ) : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      background: '#f8f9fa',
                      padding: '1rem',
                      borderRadius: '15px'
                    }}>
                      <button
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          border: '2px solid #dc3545',
                          background: 'white',
                          color: '#dc3545',
                          fontSize: '1.2rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#dc3545';
                          e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'white';
                          e.target.style.color = '#dc3545';
                        }}
                      >
                        −
                      </button>
                      <span style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold',
                        minWidth: '60px',
                        textAlign: 'center'
                      }}>
                        {cartItem.quantity} {product.unit}
                      </span>
                      <button
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          border: '2px solid #28a745',
                          background: 'white',
                          color: '#28a745',
                          fontSize: '1.2rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => addToCart(product)}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#28a745';
                          e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'white';
                          e.target.style.color = '#28a745';
                        }}
                      >
                        +
                      </button>
                      <button
                        style={{
                          marginLeft: 'auto',
                          padding: '0.5rem',
                          borderRadius: '10px',
                          border: '2px solid #6c757d',
                          background: 'white',
                          color: '#6c757d',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => removeFromCart(product.id)}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#6c757d';
                          e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'white';
                          e.target.style.color = '#6c757d';
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '4rem 2rem',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>No products found</h3>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '15px',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSortBy('name');
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              🔄 Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCatalog;