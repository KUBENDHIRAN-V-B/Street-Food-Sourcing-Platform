import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function OrderHistory() {
  const { apiCall } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiCall('/api/orders');
      if (response && response.ok) {
        const data = await response.json();
        setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '2rem' }}>Order History</h1>

      {orders.length > 0 ? (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id.slice(0, 8)}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
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
                    <button 
                      className="btn btn-outline btn-small"
                      onClick={() => viewOrderDetails(order)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <h3>No orders yet</h3>
          <p>Start shopping to see your order history here.</p>
          <a href="/vendor/products" className="btn btn-primary">
            Browse Products
          </a>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: '600px' }}>
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

              <div style={{ marginBottom: '1.5rem' }}>
                <h5>Payment & Delivery</h5>
                <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                <p><strong>Delivery Address:</strong> {selectedOrder.deliveryAddress}</p>
              </div>

              {selectedOrder.status === 'delivered' && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h5>Order Completed</h5>
                  <p style={{ color: '#28a745' }}>
                    ✓ Your order has been delivered successfully!
                  </p>
                  <button className="btn btn-outline btn-small">
                    Rate & Review
                  </button>
                </div>
              )}

              {selectedOrder.status === 'pending' && (
                <div className="alert alert-info">
                  <strong>Order Status:</strong> Your order is being processed by the supplier.
                </div>
              )}

              {selectedOrder.status === 'confirmed' && (
                <div className="alert alert-success">
                  <strong>Order Confirmed:</strong> Your order has been confirmed and is being prepared.
                </div>
              )}

              {selectedOrder.status === 'shipped' && (
                <div className="alert alert-info">
                  <strong>Order Shipped:</strong> Your order is on the way!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;