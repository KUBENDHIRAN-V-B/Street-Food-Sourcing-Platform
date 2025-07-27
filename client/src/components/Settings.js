import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function Settings() {
  const { user, apiCall } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Profile Settings
  const [profileSettings, setProfileSettings] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    businessName: user?.businessName || '',
    location: user?.location || '',
    foodType: user?.foodType || '',
    bio: user?.bio || '',
    website: user?.website || '',
    socialMedia: {
      facebook: user?.socialMedia?.facebook || '',
      instagram: user?.socialMedia?.instagram || '',
      twitter: user?.socialMedia?.twitter || ''
    }
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderUpdates: true,
    priceAlerts: true,
    newProducts: false,
    groupOrderInvites: true,
    marketingEmails: false,
    weeklyReports: true,
    securityAlerts: true
  });

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showContactInfo: true,
    showBusinessDetails: true,
    allowDirectMessages: true,
    shareAnalytics: false,
    dataCollection: true,
    locationTracking: false,
    cookiePreferences: 'essential'
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: '30',
    passwordLastChanged: '2024-01-15',
    trustedDevices: 2
  });

  // Business Settings (for vendors/suppliers)
  const [businessSettings, setBusinessSettings] = useState({
    businessHours: {
      monday: { open: '09:00', close: '18:00', closed: false },
      tuesday: { open: '09:00', close: '18:00', closed: false },
      wednesday: { open: '09:00', close: '18:00', closed: false },
      thursday: { open: '09:00', close: '18:00', closed: false },
      friday: { open: '09:00', close: '18:00', closed: false },
      saturday: { open: '10:00', close: '16:00', closed: false },
      sunday: { open: '10:00', close: '16:00', closed: true }
    },
    autoAcceptOrders: false,
    minimumOrderValue: '',
    deliveryRadius: '10',
    paymentMethods: {
      cash: true,
      upi: true,
      card: false,
      netBanking: false
    },
    taxSettings: {
      gstNumber: '',
      taxRate: '18'
    }
  });

  // App Settings
  const [appSettings, setAppSettings] = useState({
    language: 'english',
    currency: 'INR',
    theme: 'light',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24',
    autoSave: true,
    offlineMode: false,
    dataUsage: 'standard'
  });

  const handleProfileSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Profile settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile settings');
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Notification preferences updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating notification settings');
    } finally {
      setLoading(false);
    }
  };

  const handlePrivacySave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Privacy settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating privacy settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSecuritySave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Security settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating security settings');
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Business settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating business settings');
    } finally {
      setLoading(false);
    }
  };

  const handleAppSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('App settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating app settings');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'privacy', label: 'Privacy', icon: '🔒' },
    { id: 'security', label: 'Security', icon: '🛡️' },
    ...(user?.role !== 'admin' ? [{ id: 'business', label: 'Business', icon: '🏢' }] : []),
    { id: 'app', label: 'App Settings', icon: '⚙️' }
  ];

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          ⚙️ Settings
        </h1>
        <p style={{ color: '#666' }}>
          Manage your account preferences and application settings
        </p>
      </div>

      {message && (
        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}

      <div className="row">
        {/* Sidebar Navigation */}
        <div className="col-3">
          <div className="card">
            <div style={{ padding: '0' }}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    width: '100%',
                    padding: '1rem 1.5rem',
                    border: 'none',
                    background: activeTab === tab.id ? '#667eea' : 'transparent',
                    color: activeTab === tab.id ? 'white' : '#333',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.95rem'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.target.style.background = '#f8f9fa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.target.style.background = 'transparent';
                    }
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-3" style={{ flex: '0 0 75%' }}>
          <div className="card">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div>
                <div className="card-header">
                  <h3>👤 Profile Settings</h3>
                </div>
                
                <div className="row">
                  <div className="col-2">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={profileSettings.name}
                        onChange={(e) => setProfileSettings({...profileSettings, name: e.target.value})}
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-input"
                        value={profileSettings.email}
                        onChange={(e) => setProfileSettings({...profileSettings, email: e.target.value})}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-2">
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-input"
                        value={profileSettings.phone}
                        onChange={(e) => setProfileSettings({...profileSettings, phone: e.target.value})}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-group">
                      <label className="form-label">Business Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={profileSettings.businessName}
                        onChange={(e) => setProfileSettings({...profileSettings, businessName: e.target.value})}
                        placeholder="Enter business name"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-2">
                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-input"
                        value={profileSettings.location}
                        onChange={(e) => setProfileSettings({...profileSettings, location: e.target.value})}
                        placeholder="City, State"
                      />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-group">
                      <label className="form-label">Food Type</label>
                      <select
                        className="form-select"
                        value={profileSettings.foodType}
                        onChange={(e) => setProfileSettings({...profileSettings, foodType: e.target.value})}
                      >
                        <option value="">Select food type</option>
                        <option value="North Indian">North Indian</option>
                        <option value="South Indian">South Indian</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Continental">Continental</option>
                        <option value="Fast Food">Fast Food</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Mixed">Mixed</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Bio</label>
                  <textarea
                    className="form-textarea"
                    value={profileSettings.bio}
                    onChange={(e) => setProfileSettings({...profileSettings, bio: e.target.value})}
                    placeholder="Tell us about yourself and your business..."
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Website</label>
                  <input
                    type="url"
                    className="form-input"
                    value={profileSettings.website}
                    onChange={(e) => setProfileSettings({...profileSettings, website: e.target.value})}
                    placeholder="https://your-website.com"
                  />
                </div>

                <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Social Media</h4>
                <div className="row">
                  <div className="col-3">
                    <div className="form-group">
                      <label className="form-label">Facebook</label>
                      <input
                        type="text"
                        className="form-input"
                        value={profileSettings.socialMedia.facebook}
                        onChange={(e) => setProfileSettings({
                          ...profileSettings,
                          socialMedia: {...profileSettings.socialMedia, facebook: e.target.value}
                        })}
                        placeholder="Facebook username"
                      />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label className="form-label">Instagram</label>
                      <input
                        type="text"
                        className="form-input"
                        value={profileSettings.socialMedia.instagram}
                        onChange={(e) => setProfileSettings({
                          ...profileSettings,
                          socialMedia: {...profileSettings.socialMedia, instagram: e.target.value}
                        })}
                        placeholder="Instagram username"
                      />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <label className="form-label">Twitter</label>
                      <input
                        type="text"
                        className="form-input"
                        value={profileSettings.socialMedia.twitter}
                        onChange={(e) => setProfileSettings({
                          ...profileSettings,
                          socialMedia: {...profileSettings.socialMedia, twitter: e.target.value}
                        })}
                        placeholder="Twitter username"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleProfileSave}
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ marginTop: '1rem' }}
                >
                  {loading ? '💾 Saving...' : '💾 Save Profile'}
                </button>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div>
                <div className="card-header">
                  <h3>🔔 Notification Settings</h3>
                </div>

                <h4 style={{ marginBottom: '1rem' }}>Communication Preferences</h4>
                <div style={{ marginBottom: '2rem' }}>
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                    { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive notifications via SMS' },
                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive browser push notifications' }
                  ].map(item => (
                    <div key={item.key} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '1rem 0',
                      borderBottom: '1px solid #eee'
                    }}>
                      <div>
                        <div style={{ fontWeight: '500' }}>{item.label}</div>
                        <div style={{ fontSize: '0.875rem', color: '#666' }}>{item.desc}</div>
                      </div>
                      <label style={{ 
                        position: 'relative',
                        display: 'inline-block',
                        width: '50px',
                        height: '24px'
                      }}>
                        <input
                          type="checkbox"
                          checked={notificationSettings[item.key]}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            [item.key]: e.target.checked
                          })}
                          style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: notificationSettings[item.key] ? '#667eea' : '#ccc',
                          transition: '0.4s',
                          borderRadius: '24px'
                        }}>
                          <span style={{
                            position: 'absolute',
                            content: '',
                            height: '18px',
                            width: '18px',
                            left: notificationSettings[item.key] ? '26px' : '3px',
                            bottom: '3px',
                            backgroundColor: 'white',
                            transition: '0.4s',
                            borderRadius: '50%'
                          }}></span>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

                <h4 style={{ marginBottom: '1rem' }}>Content Preferences</h4>
                <div style={{ marginBottom: '2rem' }}>
                  {[
                    { key: 'orderUpdates', label: 'Order Updates', desc: 'Get notified about order status changes' },
                    { key: 'priceAlerts', label: 'Price Alerts', desc: 'Notify when prices change for watched items' },
                    { key: 'newProducts', label: 'New Products', desc: 'Get notified about new products from suppliers' },
                    { key: 'groupOrderInvites', label: 'Group Order Invites', desc: 'Receive invitations to join group orders' },
                    { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive promotional offers and updates' },
                    { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Get weekly business performance reports' },
                    { key: 'securityAlerts', label: 'Security Alerts', desc: 'Important security and account notifications' }
                  ].map(item => (
                    <div key={item.key} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '1rem 0',
                      borderBottom: '1px solid #eee'
                    }}>
                      <div>
                        <div style={{ fontWeight: '500' }}>{item.label}</div>
                        <div style={{ fontSize: '0.875rem', color: '#666' }}>{item.desc}</div>
                      </div>
                      <label style={{ 
                        position: 'relative',
                        display: 'inline-block',
                        width: '50px',
                        height: '24px'
                      }}>
                        <input
                          type="checkbox"
                          checked={notificationSettings[item.key]}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            [item.key]: e.target.checked
                          })}
                          style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: notificationSettings[item.key] ? '#667eea' : '#ccc',
                          transition: '0.4s',
                          borderRadius: '24px'
                        }}>
                          <span style={{
                            position: 'absolute',
                            content: '',
                            height: '18px',
                            width: '18px',
                            left: notificationSettings[item.key] ? '26px' : '3px',
                            bottom: '3px',
                            backgroundColor: 'white',
                            transition: '0.4s',
                            borderRadius: '50%'
                          }}></span>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleNotificationSave}
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? '💾 Saving...' : '💾 Save Preferences'}
                </button>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div>
                <div className="card-header">
                  <h3>🔒 Privacy Settings</h3>
                </div>

                <div className="form-group">
                  <label className="form-label">Profile Visibility</label>
                  <select
                    className="form-select"
                    value={privacySettings.profileVisibility}
                    onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.value})}
                  >
                    <option value="public">Public - Anyone can see your profile</option>
                    <option value="business">Business Only - Only other vendors/suppliers</option>
                    <option value="private">Private - Only you can see your profile</option>
                  </select>
                </div>

                <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Information Sharing</h4>
                <div style={{ marginBottom: '2rem' }}>
                  {[
                    { key: 'showContactInfo', label: 'Show Contact Information', desc: 'Display phone and email on profile' },
                    { key: 'showBusinessDetails', label: 'Show Business Details', desc: 'Display business hours and location' },
                    { key: 'allowDirectMessages', label: 'Allow Direct Messages', desc: 'Let other users message you directly' },
                    { key: 'shareAnalytics', label: 'Share Analytics Data', desc: 'Help improve the platform with usage data' },
                    { key: 'dataCollection', label: 'Data Collection', desc: 'Allow collection of usage data for improvements' },
                    { key: 'locationTracking', label: 'Location Tracking', desc: 'Use location for better recommendations' }
                  ].map(item => (
                    <div key={item.key} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '1rem 0',
                      borderBottom: '1px solid #eee'
                    }}>
                      <div>
                        <div style={{ fontWeight: '500' }}>{item.label}</div>
                        <div style={{ fontSize: '0.875rem', color: '#666' }}>{item.desc}</div>
                      </div>
                      <label style={{ 
                        position: 'relative',
                        display: 'inline-block',
                        width: '50px',
                        height: '24px'
                      }}>
                        <input
                          type="checkbox"
                          checked={privacySettings[item.key]}
                          onChange={(e) => setPrivacySettings({
                            ...privacySettings,
                            [item.key]: e.target.checked
                          })}
                          style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: privacySettings[item.key] ? '#667eea' : '#ccc',
                          transition: '0.4s',
                          borderRadius: '24px'
                        }}>
                          <span style={{
                            position: 'absolute',
                            content: '',
                            height: '18px',
                            width: '18px',
                            left: privacySettings[item.key] ? '26px' : '3px',
                            bottom: '3px',
                            backgroundColor: 'white',
                            transition: '0.4s',
                            borderRadius: '50%'
                          }}></span>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="form-group">
                  <label className="form-label">Cookie Preferences</label>
                  <select
                    className="form-select"
                    value={privacySettings.cookiePreferences}
                    onChange={(e) => setPrivacySettings({...privacySettings, cookiePreferences: e.target.value})}
                  >
                    <option value="essential">Essential Only - Required for basic functionality</option>
                    <option value="functional">Functional - Includes preferences and settings</option>
                    <option value="analytics">Analytics - Includes usage tracking</option>
                    <option value="all">All Cookies - Full functionality and personalization</option>
                  </select>
                </div>

                <button 
                  onClick={handlePrivacySave}
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ marginTop: '1rem' }}
                >
                  {loading ? '💾 Saving...' : '💾 Save Privacy Settings'}
                </button>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div>
                <div className="card-header">
                  <h3>🛡️ Security Settings</h3>
                </div>

                <div style={{ 
                  background: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '2rem'
                }}>
                  <h4 style={{ marginBottom: '0.5rem' }}>Account Security Status</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#28a745' }}>✅</span>
                    <span>Strong password</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: securitySettings.twoFactorAuth ? '#28a745' : '#dc3545' }}>
                      {securitySettings.twoFactorAuth ? '✅' : '❌'}
                    </span>
                    <span>Two-factor authentication</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#28a745' }}>✅</span>
                    <span>Email verified</span>
                  </div>
                </div>

                <h4 style={{ marginBottom: '1rem' }}>Authentication</h4>
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '1rem 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    <div>
                      <div style={{ fontWeight: '500' }}>Two-Factor Authentication</div>
                      <div style={{ fontSize: '0.875rem', color: '#666' }}>
                        Add an extra layer of security to your account
                      </div>
                    </div>
                    <button 
                      className={`btn ${securitySettings.twoFactorAuth ? 'btn-danger' : 'btn-success'} btn-small`}
                      onClick={() => setSecuritySettings({
                        ...securitySettings,
                        twoFactorAuth: !securitySettings.twoFactorAuth
                      })}
                    >
                      {securitySettings.twoFactorAuth ? 'Disable' : 'Enable'}
                    </button>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '1rem 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    <div>
                      <div style={{ fontWeight: '500' }}>Login Alerts</div>
                      <div style={{ fontSize: '0.875rem', color: '#666' }}>
                        Get notified of new login attempts
                      </div>
                    </div>
                    <label style={{ 
                      position: 'relative',
                      display: 'inline-block',
                      width: '50px',
                      height: '24px'
                    }}>
                      <input
                        type="checkbox"
                        checked={securitySettings.loginAlerts}
                        onChange={(e) => setSecuritySettings({
                          ...securitySettings,
                          loginAlerts: e.target.checked
                        })}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: securitySettings.loginAlerts ? '#667eea' : '#ccc',
                        transition: '0.4s',
                        borderRadius: '24px'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: '18px',
                          width: '18px',
                          left: securitySettings.loginAlerts ? '26px' : '3px',
                          bottom: '3px',
                          backgroundColor: 'white',
                          transition: '0.4s',
                          borderRadius: '50%'
                        }}></span>
                      </span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Session Timeout (minutes)</label>
                  <select
                    className="form-select"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                    <option value="never">Never</option>
                  </select>
                </div>

                <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Password & Recovery</h4>
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '1rem 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    <div>
                      <div style={{ fontWeight: '500' }}>Change Password</div>
                      <div style={{ fontSize: '0.875rem', color: '#666' }}>
                        Last changed: {securitySettings.passwordLastChanged}
                      </div>
                    </div>
                    <button className="btn btn-outline btn-small">
                      Change Password
                    </button>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '1rem 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    <div>
                      <div style={{ fontWeight: '500' }}>Trusted Devices</div>
                      <div style={{ fontSize: '0.875rem', color: '#666' }}>
                        {securitySettings.trustedDevices} devices currently trusted
                      </div>
                    </div>
                    <button className="btn btn-outline btn-small">
                      Manage Devices
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleSecuritySave}
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? '💾 Saving...' : '💾 Save Security Settings'}
                </button>
              </div>
            )}

            {/* Business Settings */}
            {activeTab === 'business' && (
              <div>
                <div className="card-header">
                  <h3>🏢 Business Settings</h3>
                </div>

                <h4 style={{ marginBottom: '1rem' }}>Business Hours</h4>
                <div style={{ marginBottom: '2rem' }}>
                  {Object.entries(businessSettings.businessHours).map(([day, hours]) => (
                    <div key={day} style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.75rem 0',
                      borderBottom: '1px solid #eee'
                    }}>
                      <div style={{ width: '100px', fontWeight: '500', textTransform: 'capitalize' }}>
                        {day}
                      </div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          checked={!hours.closed}
                          onChange={(e) => setBusinessSettings({
                            ...businessSettings,
                            businessHours: {
                              ...businessSettings.businessHours,
                              [day]: { ...hours, closed: !e.target.checked }
                            }
                          })}
                        />
                        Open
                      </label>
                      {!hours.closed && (
                        <>
                          <input
                            type="time"
                            value={hours.open}
                            onChange={(e) => setBusinessSettings({
                              ...businessSettings,
                              businessHours: {
                                ...businessSettings.businessHours,
                                [day]: { ...hours, open: e.target.value }
                              }
                            })}
                            style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                          />
                          <span>to</span>
                          <input
                            type="time"
                            value={hours.close}
                            onChange={(e) => setBusinessSettings({
                              ...businessSettings,
                              businessHours: {
                                ...businessSettings.businessHours,
                                [day]: { ...hours, close: e.target.value }
                              }
                            })}
                            style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="row">
                  <div className="col-2">
                    <div className="form-group">
                      <label className="form-label">Minimum Order Value (₹)</label>
                      <input
                        type="number"
                        className="form-input"
                        value={businessSettings.minimumOrderValue}
                        onChange={(e) => setBusinessSettings({...businessSettings, minimumOrderValue: e.target.value})}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-group">
                      <label className="form-label">Delivery Radius (km)</label>
                      <input
                        type="number"
                        className="form-input"
                        value={businessSettings.deliveryRadius}
                        onChange={(e) => setBusinessSettings({...businessSettings, deliveryRadius: e.target.value})}
                        placeholder="10"
                      />
                    </div>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1rem 0',
                  borderBottom: '1px solid #eee',
                  marginBottom: '2rem'
                }}>
                  <div>
                    <div style={{ fontWeight: '500' }}>Auto-Accept Orders</div>
                    <div style={{ fontSize: '0.875rem', color: '#666' }}>
                      Automatically accept orders without manual approval
                    </div>
                  </div>
                  <label style={{ 
                    position: 'relative',
                    display: 'inline-block',
                    width: '50px',
                    height: '24px'
                  }}>
                    <input
                      type="checkbox"
                      checked={businessSettings.autoAcceptOrders}
                      onChange={(e) => setBusinessSettings({
                        ...businessSettings,
                        autoAcceptOrders: e.target.checked
                      })}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: businessSettings.autoAcceptOrders ? '#667eea' : '#ccc',
                      transition: '0.4s',
                      borderRadius: '24px'
                    }}>
                      <span style={{
                        position: 'absolute',
                        content: '',
                        height: '18px',
                        width: '18px',
                        left: businessSettings.autoAcceptOrders ? '26px' : '3px',
                        bottom: '3px',
                        backgroundColor: 'white',
                        transition: '0.4s',
                        borderRadius: '50%'
                      }}></span>
                    </span>
                  </label>
                </div>

                <h4 style={{ marginBottom: '1rem' }}>Payment Methods</h4>
                <div style={{ marginBottom: '2rem' }}>
                  {Object.entries(businessSettings.paymentMethods).map(([method, enabled]) => (
                    <div key={method} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '1rem 0',
                      borderBottom: '1px solid #eee'
                    }}>
                      <div style={{ fontWeight: '500', textTransform: 'capitalize' }}>
                        {method === 'upi' ? 'UPI' : method === 'netBanking' ? 'Net Banking' : method}
                      </div>
                      <label style={{ 
                        position: 'relative',
                        display: 'inline-block',
                        width: '50px',
                        height: '24px'
                      }}>
                        <input
                          type="checkbox"
                          checked={enabled}
                          onChange={(e) => setBusinessSettings({
                            ...businessSettings,
                            paymentMethods: {
                              ...businessSettings.paymentMethods,
                              [method]: e.target.checked
                            }
                          })}
                          style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: enabled ? '#667eea' : '#ccc',
                          transition: '0.4s',
                          borderRadius: '24px'
                        }}>
                          <span style={{
                            position: 'absolute',
                            content: '',
                            height: '18px',
                            width: '18px',
                            left: enabled ? '26px' : '3px',
                            bottom: '3px',
                            backgroundColor: 'white',
                            transition: '0.4s',
                            borderRadius: '50%'
                          }}></span>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

                <h4 style={{ marginBottom: '1rem' }}>Tax Settings</h4>
                <div className="row">
                  <div className="col-2">
                    <div className="form-group">
                      <label className="form-label">GST Number</label>
                      <input
                        type="text"
                        className="form-input"
                        value={businessSettings.taxSettings.gstNumber}
                        onChange={(e) => setBusinessSettings({
                          ...businessSettings,
                          taxSettings: {
                            ...businessSettings.taxSettings,
                            gstNumber: e.target.value
                          }
                        })}
                        placeholder="Enter GST number"
                      />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-group">
                      <label className="form-label">Tax Rate (%)</label>
                      <input
                        type="number"
                        className="form-input"
                        value={businessSettings.taxSettings.taxRate}
                        onChange={(e) => setBusinessSettings({
                          ...businessSettings,
                          taxSettings: {
                            ...businessSettings.taxSettings,
                            taxRate: e.target.value
                          }
                        })}
                        placeholder="18"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleBusinessSave}
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ marginTop: '1rem' }}
                >
                  {loading ? '💾 Saving...' : '💾 Save Business Settings'}
                </button>
              </div>
            )}

            {/* App Settings */}
            {activeTab === 'app' && (
              <div>
                <div className="card-header">
                  <h3>⚙️ App Settings</h3>
                </div>

                <div className="row">
                  <div className="col-2">
                    <div className="form-group">
                      <label className="form-label">Language</label>
                      <select
                        className="form-select"
                        value={appSettings.language}
                        onChange={(e) => setAppSettings({...appSettings, language: e.target.value})}
                      >
                        <option value="english">English</option>
                        <option value="hindi">हिंदी (Hindi)</option>
                        <option value="bengali">বাংলা (Bengali)</option>
                        <option value="tamil">தமிழ் (Tamil)</option>
                        <option value="telugu">తెలుగు (Telugu)</option>
                        <option value="marathi">मराठी (Marathi)</option>
                        <option value="gujarati">ગુજરાતી (Gujarati)</option>
                        <option value="kannada">ಕನ್ನಡ (Kannada)</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-group">
                      <label className="form-label">Currency</label>
                      <select
                        className="form-select"
                        value={appSettings.currency}
                        onChange={(e) => setAppSettings({...appSettings, currency: e.target.value})}
                      >
                        <option value="INR">₹ Indian Rupee (INR)</option>
                        <option value="USD">$ US Dollar (USD)</option>
                        <option value="EUR">€ Euro (EUR)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-2">
                    <div className="form-group">
                      <label className="form-label">Theme</label>
                      <select
                        className="form-select"
                        value={appSettings.theme}
                        onChange={(e) => setAppSettings({...appSettings, theme: e.target.value})}
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto (System)</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-group">
                      <label className="form-label">Date Format</label>
                      <select
                        className="form-select"
                        value={appSettings.dateFormat}
                        onChange={(e) => setAppSettings({...appSettings, dateFormat: e.target.value})}
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-2">
                    <div className="form-group">
                      <label className="form-label">Time Format</label>
                      <select
                        className="form-select"
                        value={appSettings.timeFormat}
                        onChange={(e) => setAppSettings({...appSettings, timeFormat: e.target.value})}
                      >
                        <option value="24">24 Hour</option>
                        <option value="12">12 Hour (AM/PM)</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-group">
                      <label className="form-label">Data Usage</label>
                      <select
                        className="form-select"
                        value={appSettings.dataUsage}
                        onChange={(e) => setAppSettings({...appSettings, dataUsage: e.target.value})}
                      >
                        <option value="low">Low - Minimal data usage</option>
                        <option value="standard">Standard - Balanced experience</option>
                        <option value="high">High - Full features and quality</option>
                      </select>
                    </div>
                  </div>
                </div>

                <h4 style={{ marginTop: '2rem', marginBottom: '1rem' }}>App Behavior</h4>
                <div style={{ marginBottom: '2rem' }}>
                  {[
                    { key: 'autoSave', label: 'Auto-Save', desc: 'Automatically save your work as you type' },
                    { key: 'offlineMode', label: 'Offline Mode', desc: 'Enable offline functionality when available' }
                  ].map(item => (
                    <div key={item.key} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '1rem 0',
                      borderBottom: '1px solid #eee'
                    }}>
                      <div>
                        <div style={{ fontWeight: '500' }}>{item.label}</div>
                        <div style={{ fontSize: '0.875rem', color: '#666' }}>{item.desc}</div>
                      </div>
                      <label style={{ 
                        position: 'relative',
                        display: 'inline-block',
                        width: '50px',
                        height: '24px'
                      }}>
                        <input
                          type="checkbox"
                          checked={appSettings[item.key]}
                          onChange={(e) => setAppSettings({
                            ...appSettings,
                            [item.key]: e.target.checked
                          })}
                          style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: appSettings[item.key] ? '#667eea' : '#ccc',
                          transition: '0.4s',
                          borderRadius: '24px'
                        }}>
                          <span style={{
                            position: 'absolute',
                            content: '',
                            height: '18px',
                            width: '18px',
                            left: appSettings[item.key] ? '26px' : '3px',
                            bottom: '3px',
                            backgroundColor: 'white',
                            transition: '0.4s',
                            borderRadius: '50%'
                          }}></span>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleAppSave}
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? '💾 Saving...' : '💾 Save App Settings'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;