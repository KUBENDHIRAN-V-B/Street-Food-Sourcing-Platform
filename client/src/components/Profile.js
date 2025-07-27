import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user, apiCall, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user && !authLoading) {
      fetchProfile();
    } else if (!authLoading && !user) {
      setLoading(false);
    }
  }, [user, authLoading]);

  // Show loading while auth is loading
  if (authLoading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  // Show error if no user
  if (!user) {
    return (
      <div className="container" style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <div className="card">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h3>Authentication Required</h3>
            <p>Please log in to view your profile.</p>
            <a href="/login" className="btn btn-primary">Go to Login</a>
          </div>
        </div>
      </div>
    );
  }

  const fetchProfile = async () => {
    try {
      // For now, use the user data from auth context
      // In a real app, you might fetch additional profile data from the server
      setProfile(user);
      setFormData(user);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const response = await apiCall('/api/profile', {
        method: 'PUT',
        body: JSON.stringify(formData)
      });

      if (response && response.ok) {
        const data = await response.json();
        setProfile(data.user);
        setEditing(false);
        setMessage('Profile updated successfully!');
      } else {
        setMessage('Failed to update profile');
      }
    } catch (error) {
      setMessage('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  const foodTypes = [
    'North Indian', 'South Indian', 'Chinese', 'Continental', 
    'Street Snacks', 'Beverages', 'Desserts', 'Mixed Cuisine'
  ];

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Profile</h2>
          {!editing && (
            <button 
              className="btn btn-primary btn-small"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>

        {message && (
          <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
            {message}
          </div>
        )}

        {editing ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email || ''}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                value={formData.phone || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                className="form-input"
                value={formData.location || ''}
                onChange={handleChange}
              />
            </div>

            {user.role === 'vendor' && (
              <>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    value={formData.name || ''}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Business Name</label>
                  <input
                    type="text"
                    name="businessName"
                    className="form-input"
                    value={formData.businessName || ''}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Food Type</label>
                  <select
                    name="foodType"
                    className="form-select"
                    value={formData.foodType || ''}
                    onChange={handleChange}
                  >
                    <option value="">Select Food Type</option>
                    {foodTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {user.role === 'supplier' && (
              <>
                <div className="form-group">
                  <label className="form-label">Business Name</label>
                  <input
                    type="text"
                    name="businessName"
                    className="form-input"
                    value={formData.businessName || ''}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Business Description</label>
                  <textarea
                    name="description"
                    className="form-textarea"
                    value={formData.description || ''}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => {
                  setEditing(false);
                  setFormData(profile);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <p>{profile?.email || 'Not available'}</p>
            </div>

            <div className="form-group">
              <label className="form-label">Role</label>
              <p style={{ textTransform: 'capitalize' }}>{profile?.role || 'Not available'}</p>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <p>{profile?.phone || 'Not provided'}</p>
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <p>{profile?.location || 'Not provided'}</p>
            </div>

            {user.role === 'vendor' && (
              <>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <p>{profile?.name || 'Not provided'}</p>
                </div>

                <div className="form-group">
                  <label className="form-label">Business Name</label>
                  <p>{profile?.businessName || 'Not provided'}</p>
                </div>

                <div className="form-group">
                  <label className="form-label">Food Type</label>
                  <p>{profile?.foodType || 'Not provided'}</p>
                </div>
              </>
            )}

            {user.role === 'supplier' && (
              <>
                <div className="form-group">
                  <label className="form-label">Business Name</label>
                  <p>{profile?.businessName || 'Not provided'}</p>
                </div>

                <div className="form-group">
                  <label className="form-label">Business Description</label>
                  <p>{profile?.description || 'Not provided'}</p>
                </div>

                <div className="form-group">
                  <label className="form-label">Verification Status</label>
                  <span className={`status ${profile?.verified ? 'status-confirmed' : 'status-pending'}`}>
                    {profile?.verified ? 'Verified' : 'Pending Verification'}
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">Rating</label>
                  <p>{profile?.rating ? `${profile.rating}/5` : 'No ratings yet'}</p>
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Member Since</label>
              <p>{profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Unknown'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;