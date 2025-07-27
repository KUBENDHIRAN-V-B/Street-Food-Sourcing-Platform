import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function SupplierOrders() {
  const { apiCall, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiCall('/api/orders');
      if (response && response.ok) {
        const allOrders = await response.json();
        // Filter orders that contain products from this supplier
        const myOrders = allOrders.filter(order => 
          order.items.some(item => {
            // This would need to be enhanced to properly check supplier ownership
            return true; // For now, showing all orders
          })
        );
        setOrders(myOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await apiCall(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });

      if (response && response.ok) {
        alert('Order status updated successfully!');
        fetchOrders();
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      } else {
        alert('Error updating order status');
      }
    } catch (error) {
      alert('Error updating order status');
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'confirmed': return '#17a2b8';
      case 'processing': return '#6f42c1';
      case 'shipped': return '#fd7e14';
      case 'delivered': return '#28a745';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'pending': return 'confirmed';
      case 'confirmed': return 'processing';
      case 'processing': return 'shipped';
      case 'shipped': return 'delivered';
      default: return null;
    }
  };

  const getStatusAction = (currentStatus) => {
    switch (currentStatus) {
      case 'pending': return 'Accept Order';
      case 'confirmed': return 'Start Processing';
      case 'processing': return 'Mark as Shipped';
      case 'shipped': return 'Mark as Delivered';
      default: return null;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '2rem' }}>Order Management</h1>

      {/* Order Status Filter */}
      <div className="filters" style={{ marginBottom: '2rem' }}>
        <div className="filters-row">
          <div className="filter-group">
            <label className="form-label">Filter by Status</label>
            <select
              className="form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <span className="stat-number">{orders.filter(o => o.status === 'pending').length}</span>
          <span className="stat-label">Pending Orders</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{orders.filter(o => o.status === 'processing').length}</span>
          <span className="stat-label">Processing</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{orders.filter(o => o.status === 'shipped').length}</span>
          <span className="stat-label">Shipped</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{orders.filter(o => o.status === 'delivered').length}</span>
          <span className="stat-label">Delivered</span>
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id.slice(0, 8)}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>Vendor #{order.vendorId.slice(0, 8)}</td>
                  <td>{order.items.length} item(s)</td>
                  <td>₹{order.total}</td>
                  <td>
                    <span 
                      className="status"
                      style={{ 
                        backgroundColor: getStatusColor(order.status) + '20',
                        color: getStatusColor(order.status),
                        border: `1px solid ${getStatusColor(order.status)}`
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button 
                        className="btn btn-outline btn-small"
                        onClick={() => viewOrderDetails(order)}
                      >
                        View Details
                      </button>
                      {getNextStatus(order.status) && (
                        <button 
                          className="btn btn-primary btn-small"
                          onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}
                        >
                          {getStatusAction(order.status)}
                        </button>
                      )}
                      {order.status === 'pending' && (
                        <button 
                          className="btn btn-danger btn-small"
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                        >
                          Decline
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <h3>No orders found</h3>
          <p>
            {filter === 'all' 
              ? 'No orders yet. Add products to start receiving orders!'
              : `No ${filter} orders found.`
            }
          </p>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: '700px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Order Details</h3>
              <button 
                className="modal-close"
                onClick={() => setShowOrderModal(false)}
              >
                ×
              </button>
            </div>
            
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4>Order #{selectedOrder.id.slice(0, 8)}</h4>
                <p style={{ color: '#666' }}>
                  Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()} at {new Date(selectedOrder.createdAt).toLocaleTimeString()}
                </p>
                <span 
                  className="status"
                  style={{ 
                    backgroundColor: getStatusColor(selectedOrder.status) + '20',
                    color: getStatusColor(selectedOrder.status),
                    border: `1px solid ${getStatusColor(selectedOrder.status)}`
                  }}
                >
                  {selectedOrder.status}
                </span>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h5>Customer Information</h5>
                <p><strong>Vendor ID:</strong> #{selectedOrder.vendorId.slice(0, 8)}</p>
                <p><strong>Delivery Address:</strong> {selectedOrder.deliveryAddress}</p>
                <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h5>Order Items</h5>
                <div style={{ border: '1px solid #eee', borderRadius: '5px' }}>
                  {selectedOrder.items.map((item, index) => (
                    <div 
                      key={index}
                      style={{ 
                        padding: '1rem',
                        borderBottom: index < selectedOrder.items.length - 1 ? '1px solid #eee' : 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <h6 style={{ marginBottom: '0.25rem' }}>{item.productName}</h6>
                        <p style={{ color: '#666', fontSize: '0.875rem', margin: 0 }}>
                          ₹{item.unitPrice} × {item.quantity}
                        </p>
                      </div>
                      <div style={{ fontWeight: '500' }}>
                        ₹{item.total}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h5>Order Summary</h5>
                <div style={{ 
                  padding: '1rem', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '5px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>Total Amount:</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>₹{selectedOrder.total}</span>
                </div>
              </div>

              {/* Order Actions */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                {getNextStatus(selectedOrder.status) && (
                  <button 
                    className="btn btn-primary"
                    onClick={() => updateOrderStatus(selectedOrder.id, getNextStatus(selectedOrder.status))}
                  >
                    {getStatusAction(selectedOrder.status)}
                  </button>
                )}
                {selectedOrder.status === 'pending' && (
                  <button 
                    className="btn btn-danger"
                    onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                  >
                    Decline Order
                  </button>
                )}
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowOrderModal(false)}
                >
                  Close
                </button>
              </div>

              {/* Status Timeline */}
              <div style={{ marginTop: '2rem' }}>
                <h5>Order Timeline</h5>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  {['pending', 'confirmed', 'processing', 'shipped', 'delivered'].map((status, index) => (
                    <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: getStatusColor(selectedOrder.status) === getStatusColor(status) || 
                                        ['pending', 'confirmed', 'processing', 'shipped', 'delivered'].indexOf(selectedOrder.status) > index
                          ? getStatusColor(status) : '#e0e0e0'
                      }}></div>
                      <span style={{ 
                        fontSize: '0.875rem',
                        textTransform: 'capitalize',
                        color: getStatusColor(selectedOrder.status) === getStatusColor(status) ? getStatusColor(status) : '#666'
                      }}>
                        {status}
                      </span>
                      {index < 4 && <span style={{ color: '#ccc' }}>→</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SupplierOrders;