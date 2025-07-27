import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function GroupOrders() {
  const { apiCall } = useAuth();
  const [groupOrders, setGroupOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedGroupOrder, setSelectedGroupOrder] = useState(null);
  const [createForm, setCreateForm] = useState({
    productId: '',
    targetQuantity: '',
    maxPrice: '',
    description: '',
    endDate: ''
  });
  const [joinForm, setJoinForm] = useState({
    quantity: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [groupOrdersResponse, productsResponse] = await Promise.all([
        apiCall('/api/group-orders'),
        apiCall('/api/products')
      ]);

      if (groupOrdersResponse && groupOrdersResponse.ok) {
        const groupOrdersData = await groupOrdersResponse.json();
        setGroupOrders(groupOrdersData);
      }

      if (productsResponse && productsResponse.ok) {
        const productsData = await productsResponse.json();
        setProducts(productsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await apiCall('/api/group-orders', {
        method: 'POST',
        body: JSON.stringify(createForm)
      });

      if (response && response.ok) {
        alert('Group order created successfully!');
        setShowCreateModal(false);
        setCreateForm({
          productId: '',
          targetQuantity: '',
          maxPrice: '',
          description: '',
          endDate: ''
        });
        fetchData();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      alert('Error creating group order');
    }
  };

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await apiCall(`/api/group-orders/${selectedGroupOrder.id}/join`, {
        method: 'POST',
        body: JSON.stringify(joinForm)
      });

      if (response && response.ok) {
        alert('Successfully joined group order!');
        setShowJoinModal(false);
        setJoinForm({ quantity: '' });
        setSelectedGroupOrder(null);
        fetchData();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      alert('Error joining group order');
    }
  };

  const openJoinModal = (groupOrder) => {
    setSelectedGroupOrder(groupOrder);
    setShowJoinModal(true);
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Group Orders</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          Create Group Order
        </button>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <h3 className="card-title">How Group Orders Work</h3>
        </div>
        <div className="row">
          <div className="col-3">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>1. Create or Join</h4>
              <p>Start a group order for items you need or join existing ones.</p>
            </div>
          </div>
          <div className="col-3">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>2. Reach Target</h4>
              <p>Wait for enough vendors to join to reach the minimum quantity.</p>
            </div>
          </div>
          <div className="col-3">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>3. Get Discounts</h4>
              <p>Enjoy bulk pricing and shared delivery costs.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Group Orders */}
      <div className="row">
        {groupOrders.map(groupOrder => {
          const progress = (groupOrder.currentQuantity / groupOrder.targetQuantity) * 100;
          const daysLeft = Math.ceil((new Date(groupOrder.endDate) - new Date()) / (1000 * 60 * 60 * 24));
          
          return (
            <div key={groupOrder.id} className="col-3">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">{groupOrder.productName}</h4>
                  <span className={`status ${groupOrder.status === 'active' ? 'status-pending' : 'status-confirmed'}`}>
                    {groupOrder.status}
                  </span>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                    {groupOrder.description}
                  </p>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span>Progress:</span>
                      <span>{groupOrder.currentQuantity}/{groupOrder.targetQuantity}</span>
                    </div>
                    <div style={{ 
                      width: '100%', 
                      height: '8px', 
                      backgroundColor: '#e0e0e0', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        width: `${Math.min(progress, 100)}%`, 
                        height: '100%', 
                        backgroundColor: progress >= 100 ? '#28a745' : '#667eea',
                        transition: 'width 0.3s'
                      }}></div>
                    </div>
                  </div>
                  
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    <p>Max Price: ₹{groupOrder.maxPrice}</p>
                    <p>Participants: {groupOrder.participants.length}</p>
                    <p>Days Left: {daysLeft > 0 ? daysLeft : 'Expired'}</p>
                  </div>
                </div>
                
                {groupOrder.status === 'active' && daysLeft > 0 && (
                  <button 
                    className="btn btn-primary btn-small"
                    onClick={() => openJoinModal(groupOrder)}
                    style={{ width: '100%' }}
                  >
                    Join Group Order
                  </button>
                )}
                
                {groupOrder.status === 'completed' && (
                  <div className="alert alert-success">
                    <strong>Target Reached!</strong> This group order is ready for processing.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {groupOrders.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <h3>No active group orders</h3>
          <p>Be the first to create a group order and save on bulk purchases!</p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            Create Group Order
          </button>
        </div>
      )}

      {/* Create Group Order Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Create Group Order</h3>
              <button 
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleCreateSubmit}>
              <div className="form-group">
                <label className="form-label">Product</label>
                <select
                  className="form-select"
                  value={createForm.productId}
                  onChange={(e) => setCreateForm({...createForm, productId: e.target.value})}
                  required
                >
                  <option value="">Select Product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} - ₹{product.price}/{product.unit}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Target Quantity</label>
                <input
                  type="number"
                  className="form-input"
                  value={createForm.targetQuantity}
                  onChange={(e) => setCreateForm({...createForm, targetQuantity: e.target.value})}
                  placeholder="Minimum quantity needed"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Maximum Price per Unit</label>
                <input
                  type="number"
                  className="form-input"
                  value={createForm.maxPrice}
                  onChange={(e) => setCreateForm({...createForm, maxPrice: e.target.value})}
                  placeholder="Maximum price you're willing to pay"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  value={createForm.description}
                  onChange={(e) => setCreateForm({...createForm, description: e.target.value})}
                  placeholder="Describe the group order purpose..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={createForm.endDate}
                  onChange={(e) => setCreateForm({...createForm, endDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button 
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Group Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Group Order Modal */}
      {showJoinModal && selectedGroupOrder && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Join Group Order</h3>
              <button 
                className="modal-close"
                onClick={() => setShowJoinModal(false)}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <h4>{selectedGroupOrder.productName}</h4>
              <p style={{ color: '#666' }}>{selectedGroupOrder.description}</p>
              <p><strong>Max Price:</strong> ₹{selectedGroupOrder.maxPrice}</p>
              <p><strong>Current Progress:</strong> {selectedGroupOrder.currentQuantity}/{selectedGroupOrder.targetQuantity}</p>
            </div>

            <form onSubmit={handleJoinSubmit}>
              <div className="form-group">
                <label className="form-label">Quantity You Need</label>
                <input
                  type="number"
                  className="form-input"
                  value={joinForm.quantity}
                  onChange={(e) => setJoinForm({...joinForm, quantity: e.target.value})}
                  placeholder="How much do you need?"
                  min="1"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button 
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowJoinModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Join Group Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupOrders;