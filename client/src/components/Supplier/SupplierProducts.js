import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function SupplierProducts() {
  const { apiCall, user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    unit: '',
    stock: '',
    description: ''
  });

  const categories = [
    'Vegetables', 'Fruits', 'Spices', 'Grains', 'Dairy', 'Meat', 'Seafood', 
    'Oils', 'Condiments', 'Beverages', 'Snacks', 'Packaging', 'Sweeteners', 'Bakery'
  ];

  const units = ['kg', 'gram', 'liter', 'ml', 'piece', 'dozen', 'packet', 'bottle', 'pack', 'roll'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('=== FETCHING PRODUCTS DEBUG ===');
      console.log('Current user:', user);
      console.log('User ID:', user?.id);
      console.log('User ID type:', typeof user?.id);
      
      const response = await apiCall('/api/products');
      console.log('Products response status:', response?.status);
      
      if (response && response.ok) {
        const allProducts = await response.json();
        console.log('All products count:', allProducts.length);
        
        // Debug: Check supplier IDs in all products
        const supplierIds = [...new Set(allProducts.map(p => p.supplierId))];
        console.log('Unique supplier IDs in products:', supplierIds);
        console.log('Supplier ID types:', supplierIds.map(id => typeof id));
        
        // QUICK FIX: For demo supplier, show all products
        let myProducts;
        
        if (user?.email === 'supplier1@gmail.com') {
          console.log('🔧 DEMO ACCOUNT DETECTED - Showing all products');
          myProducts = allProducts;
        } else {
          // Regular filtering for non-demo accounts
          myProducts = allProducts.filter(product => {
            const productSupplierId = String(product.supplierId);
            const currentUserId = String(user?.id);
            const matches = productSupplierId === currentUserId;
            
            if (!matches) {
              console.log(`Product "${product.name}" supplier ID: "${productSupplierId}" vs user ID: "${currentUserId}"`);
            }
            
            return matches;
          });
        }
        
        console.log('My products count:', myProducts.length);
        console.log('My products:', myProducts);
        
        setProducts(myProducts);
      } else {
        console.error('Failed to fetch products:', response);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('=== PRODUCT SUBMISSION DEBUG ===');
      console.log('Form data:', formData);
      console.log('User:', user);
      
      // Enhanced validation
      const requiredFields = ['name', 'category', 'price', 'unit', 'stock'];
      const missingFields = requiredFields.filter(field => !formData[field] || formData[field] === '');
      
      if (missingFields.length > 0) {
        alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
      }

      // Validate numeric fields
      const price = parseFloat(formData.price);
      const stock = parseInt(formData.stock);
      
      if (isNaN(price) || price < 0) {
        alert('Please enter a valid price');
        return;
      }
      
      if (isNaN(stock) || stock < 0) {
        alert('Please enter a valid stock quantity');
        return;
      }

      if (user?.role !== 'supplier') {
        alert(`Only suppliers can add products. Your current role: ${user?.role}`);
        return;
      }

      // Prepare data for API - map frontend field names to backend field names
      const apiData = {
        name: formData.name,
        category: formData.category,
        price: formData.price,
        unit: formData.unit,
        quantity: formData.stock, // Backend expects 'quantity', frontend uses 'stock'
        description: formData.description
      };

      const url = selectedProduct ? `/api/products/${selectedProduct.id}` : '/api/products';
      const method = selectedProduct ? 'PUT' : 'POST';
      
      console.log('API URL:', url);
      console.log('Method:', method);
      console.log('API data:', apiData);
      
      const response = await apiCall(url, {
        method,
        body: JSON.stringify(apiData)
      });

      console.log('Response status:', response?.status);

      if (response && response.ok) {
        const result = await response.json();
        console.log('✅ Success result:', result);
        
        alert(selectedProduct ? 'Product updated successfully!' : 'Product added successfully!');
        
        // Reset form and close modals
        setShowAddModal(false);
        setShowEditModal(false);
        setSelectedProduct(null);
        setFormData({
          name: '',
          category: '',
          price: '',
          unit: '',
          stock: '',
          description: ''
        });
        
        // Refresh products list
        await fetchProducts();
      } else {
        console.log('❌ Response not OK');
        let errorMessage = 'Unknown error occurred';
        
        try {
          const responseText = await response.text();
          console.log('Response text:', responseText);
          
          if (responseText) {
            try {
              const errorData = JSON.parse(responseText);
              errorMessage = errorData.message || errorData.error || responseText;
            } catch (parseError) {
              errorMessage = responseText;
            }
          }
        } catch (textError) {
          errorMessage = `HTTP ${response?.status}: ${response?.statusText}`;
        }
        
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error('❌ Exception during product submission:', error);
      alert('An unexpected error occurred while saving the product.');
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      unit: product.unit,
      stock: product.quantity || product.stock || 0, // Handle both quantity and stock
      description: product.description
    });
    setShowEditModal(true);
  };

  const openAddModal = () => {
    setSelectedProduct(null);
    setFormData({
      name: '',
      category: '',
      price: '',
      unit: '',
      stock: '',
      description: ''
    });
    setShowAddModal(true);
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      
      {/* Debug Panel */}
      <div className="card" style={{ marginBottom: '2rem', backgroundColor: '#f8f9fa', border: '2px solid #007bff' }}>
        <h4 style={{ color: '#007bff' }}>🔧 Debug Panel</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <strong>User ID:</strong> {user?.id || 'Not found'}
          </div>
          <div>
            <strong>User Role:</strong> {user?.role || 'Not found'}
          </div>
          <div>
            <strong>User Email:</strong> {user?.email || 'Not found'}
          </div>
          <div>
            <strong>Products Count:</strong> {products.length}
          </div>
          <div>
            <strong>Mode:</strong> {process.env.REACT_APP_OFFLINE_MODE === 'true' ? '🚨 Offline' : '🌐 Online'}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>My Products {user?.email === 'supplier1@gmail.com' ? '(Demo - All Products)' : ''}</h1>
        <button 
          className="btn btn-primary"
          onClick={openAddModal}
        >
          Add New Product
        </button>
      </div>

      {products.length > 0 ? (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <div>
                      <strong>{product.name}</strong>
                      <p style={{ fontSize: '0.875rem', color: '#666', margin: 0 }}>
                        {product.description}
                      </p>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>₹{product.price}/{product.unit}</td>
                  <td>
                    <span style={{ 
                      color: (product.quantity || product.stock || 0) === 0 ? '#dc3545' : 
                             (product.quantity || product.stock || 0) < 10 ? '#ffc107' : '#28a745',
                      fontWeight: '500'
                    }}>
                      {product.quantity || product.stock || 0} {product.unit}
                    </span>
                  </td>
                  <td>
                    <span className={`status ${
                      (product.quantity || product.stock || 0) === 0 ? 'status-cancelled' : 
                      (product.quantity || product.stock || 0) < 10 ? 'status-pending' : 'status-confirmed'
                    }`}>
                      {(product.quantity || product.stock || 0) === 0 ? 'Out of Stock' : 
                       (product.quantity || product.stock || 0) < 10 ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-outline btn-small"
                      onClick={() => openEditModal(product)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <h3>No products yet</h3>
          <p>Add your first product to start receiving orders from vendors.</p>
          <button 
            className="btn btn-primary"
            onClick={openAddModal}
          >
            Add Your First Product
          </button>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {(showAddModal || showEditModal) && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">
                {selectedProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                }}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Fresh Red Onions"
                  required
                />
              </div>

              <div className="row">
                <div className="col-2">
                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select
                      className="form-select"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-2">
                  <div className="form-group">
                    <label className="form-label">Unit *</label>
                    <select
                      className="form-select"
                      value={formData.unit}
                      onChange={(e) => setFormData({...formData, unit: e.target.value})}
                      required
                    >
                      <option value="">Select Unit</option>
                      {units.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-2">
                  <div className="form-group">
                    <label className="form-label">Price per Unit (₹) *</label>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="0"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
                <div className="col-2">
                  <div className="form-group">
                    <label className="form-label">Stock Quantity *</label>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  className="form-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your product quality, origin, etc..."
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button 
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {selectedProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stock Status Summary */}
      <div className="row" style={{ marginTop: '2rem' }}>
        <div className="col-3">
          <div className="stat-card">
            <span className="stat-number">{products.length}</span>
            <span className="stat-label">Total Products</span>
          </div>
        </div>
        <div className="col-3">
          <div className="stat-card">
            <span className="stat-number" style={{ color: '#28a745' }}>
              {products.filter(p => (p.quantity || p.stock || 0) >= 10).length}
            </span>
            <span className="stat-label">In Stock</span>
          </div>
        </div>
        <div className="col-3">
          <div className="stat-card">
            <span className="stat-number" style={{ color: '#ffc107' }}>
              {products.filter(p => (p.quantity || p.stock || 0) > 0 && (p.quantity || p.stock || 0) < 10).length}
            </span>
            <span className="stat-label">Low Stock</span>
          </div>
        </div>
        <div className="col-3">
          <div className="stat-card">
            <span className="stat-number" style={{ color: '#dc3545' }}>
              {products.filter(p => (p.quantity || p.stock || 0) === 0).length}
            </span>
            <span className="stat-label">Out of Stock</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupplierProducts;