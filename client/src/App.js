import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import VendorDashboard from './components/Vendor/VendorDashboard';
import SupplierDashboard from './components/Supplier/SupplierDashboard';
import ProductCatalog from './components/Vendor/ProductCatalog';
import GroupOrders from './components/Vendor/GroupOrders';
import OrderHistory from './components/Vendor/OrderHistory';
import SupplierProducts from './components/Supplier/SupplierProducts';
import SupplierOrders from './components/Supplier/SupplierOrders';
import Profile from './components/Profile';
import Settings from './components/Settings';
import SmartRecommendations from './components/Vendor/SmartRecommendations';
import VoiceOrdering from './components/Vendor/VoiceOrdering';
import MicroLending from './components/Vendor/MicroLending';
import SustainabilityTracker from './components/Vendor/SustainabilityTracker';
import CommunityMarketplace from './components/Vendor/CommunityMarketplace';
import GameCenter from './components/Vendor/GameCenter';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              
              {/* Vendor Routes */}
              <Route path="/vendor/dashboard" element={<ProtectedRoute role="vendor"><VendorDashboard /></ProtectedRoute>} />
              <Route path="/vendor/products" element={<ProtectedRoute role="vendor"><ProductCatalog /></ProtectedRoute>} />
              <Route path="/vendor/group-orders" element={<ProtectedRoute role="vendor"><GroupOrders /></ProtectedRoute>} />
              <Route path="/vendor/orders" element={<ProtectedRoute role="vendor"><OrderHistory /></ProtectedRoute>} />
              <Route path="/vendor/smart-recommendations" element={<ProtectedRoute role="vendor"><SmartRecommendations /></ProtectedRoute>} />
              <Route path="/vendor/voice-ordering" element={<ProtectedRoute role="vendor"><VoiceOrdering /></ProtectedRoute>} />
              <Route path="/vendor/micro-lending" element={<ProtectedRoute role="vendor"><MicroLending /></ProtectedRoute>} />
              <Route path="/vendor/sustainability" element={<ProtectedRoute role="vendor"><SustainabilityTracker /></ProtectedRoute>} />
              <Route path="/vendor/community" element={<ProtectedRoute role="vendor"><CommunityMarketplace /></ProtectedRoute>} />
              <Route path="/vendor/game-center" element={<ProtectedRoute role="vendor"><GameCenter /></ProtectedRoute>} />
              
              {/* Supplier Routes */}
              <Route path="/supplier/dashboard" element={<ProtectedRoute role="supplier"><SupplierDashboard /></ProtectedRoute>} />
              <Route path="/supplier/products" element={<ProtectedRoute role="supplier"><SupplierProducts /></ProtectedRoute>} />
              <Route path="/supplier/orders" element={<ProtectedRoute role="supplier"><SupplierOrders /></ProtectedRoute>} />
              
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  </ErrorBoundary>
  );
}

function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to={`/${user.role}/dashboard`} />;
  }

  return children;
}

function Home() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={`/${user.role}/dashboard`} />;
  }

  return (
    <div className="container">
      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '4rem 0 2rem 0' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '3rem 2rem',
          borderRadius: '15px',
          marginBottom: '3rem'
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
            🍜 Street Food Sourcing Platform
          </h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '2rem', opacity: '0.9' }}>
            Solving Raw Material Sourcing for India's Street Food Vendors
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: '0.8' }}>
            Connect with trusted suppliers • Compare prices • Join group orders • Track deliveries
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/register" className="btn btn-primary btn-large" style={{ background: 'white', color: '#667eea' }}>
              Get Started Free
            </a>
            <a href="/login" className="btn btn-outline btn-large" style={{ borderColor: 'white', color: 'white' }}>
              Sign In
            </a>
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>
          The Problem We're Solving
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
          Street food vendors in India struggle with raw material sourcing - no structured system, 
          difficulty finding trusted suppliers, price comparison challenges, and lack of bulk purchasing power.
        </p>
        <div className="row" style={{ marginTop: '2rem' }}>
          <div className="col-3">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
              <h4 style={{ color: '#dc3545' }}>No Structured System</h4>
              <p>Vendors rely on word-of-mouth and random suppliers</p>
            </div>
          </div>
          <div className="col-3">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
              <h4 style={{ color: '#dc3545' }}>Price Uncertainty</h4>
              <p>No way to compare prices or ensure fair deals</p>
            </div>
          </div>
          <div className="col-3">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤝</div>
              <h4 style={{ color: '#dc3545' }}>Trust Issues</h4>
              <p>Difficulty finding reliable, quality suppliers</p>
            </div>
          </div>
          <div className="col-3">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
              <h4 style={{ color: '#dc3545' }}>No Bulk Power</h4>
              <p>Individual vendors can't negotiate bulk discounts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Features */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: '#333' }}>
          Our Complete Solution
        </h2>
        <div className="row">
          <div className="col-2">
            <div className="card" style={{ height: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
                <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>For Vendors</h3>
                <ul style={{ textAlign: 'left', paddingLeft: '1rem' }}>
                  <li>Browse verified suppliers</li>
                  <li>Compare prices & ratings</li>
                  <li>Join group orders for discounts</li>
                  <li>Track orders in real-time</li>
                  <li>Rate & review suppliers</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="card" style={{ height: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏪</div>
                <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>For Suppliers</h3>
                <ul style={{ textAlign: 'left', paddingLeft: '1rem' }}>
                  <li>Manage product inventory</li>
                  <li>Process orders efficiently</li>
                  <li>Real-time notifications</li>
                  <li>Business analytics</li>
                  <li>Build customer relationships</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="row" style={{ marginBottom: '4rem' }}>
        <div className="col-3">
          <div className="card" style={{ textAlign: 'center', height: '100%' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🤝</div>
            <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Group Orders</h3>
            <p>Join forces with other vendors to get bulk discounts and shared delivery costs.</p>
          </div>
        </div>
        <div className="col-3">
          <div className="card" style={{ textAlign: 'center', height: '100%' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚡</div>
            <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Real-time Updates</h3>
            <p>Get instant notifications on order status, new products, and price changes.</p>
          </div>
        </div>
        <div className="col-3">
          <div className="card" style={{ textAlign: 'center', height: '100%' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Smart Search</h3>
            <p>Advanced filtering by location, price, category, and supplier ratings.</p>
          </div>
        </div>
        <div className="col-3">
          <div className="card" style={{ textAlign: 'center', height: '100%' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⭐</div>
            <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Trust System</h3>
            <p>Verified suppliers with ratings, reviews, and quality guarantees.</p>
          </div>
        </div>
      </div>

      {/* Demo Accounts */}
      <div className="card" style={{ background: '#f8f9fa', marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '2rem', color: '#333' }}>Try Our Demo</h3>
          <div className="row">
            <div className="col-2">
              <div style={{ padding: '1rem' }}>
                <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>👨‍🍳 Vendor Demo</h4>
                <p><strong>Email:</strong> vendor1@example.com</p>
                <p><strong>Password:</strong> password123</p>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Experience browsing products, placing orders, and joining group purchases</p>
              </div>
            </div>
            <div className="col-2">
              <div style={{ padding: '1rem' }}>
                <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>🏪 Supplier Demo</h4>
                <p><strong>Email:</strong> supplier1@example.com</p>
                <p><strong>Password:</strong> password123</p>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Manage inventory, process orders, and track business analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '2rem', color: '#333' }}>Built with Modern Technology</h3>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '2rem', 
          flexWrap: 'wrap',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          <span>⚛️ React 18</span>
          <span>🟢 Node.js</span>
          <span>🔌 Socket.io</span>
          <span>🔐 JWT Auth</span>
          <span>📱 Responsive Design</span>
          <span>🚀 Production Ready</span>
        </div>
      </div>

      {/* CTA */}
      <div style={{ 
        textAlign: 'center', 
        padding: '3rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '15px',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to Transform Your Business?</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: '0.9' }}>
          Join hundreds of vendors and suppliers already using our platform
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/register" className="btn btn-primary btn-large" style={{ background: 'white', color: '#667eea' }}>
            Start Free Today
          </a>
          <a href="/login" className="btn btn-outline btn-large" style={{ borderColor: 'white', color: 'white' }}>
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;