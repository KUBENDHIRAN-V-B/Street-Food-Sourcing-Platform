import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function CommunityMarketplace() {
  const { apiCall } = useAuth();
  const [activeTab, setActiveTab] = useState('marketplace');
  const [communityPosts, setCommunityPosts] = useState([]);
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [events, setEvents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '', image: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommunityData();
  }, []);

  const fetchCommunityData = async () => {
    // Simulated community data
    const mockPosts = [
      {
        id: 1,
        author: 'Raj Kumar',
        authorType: 'Vendor',
        location: 'Mumbai',
        title: 'Best Spice Suppliers in Mumbai',
        content: 'I\'ve been working with Spice Masters for 2 years. Great quality and competitive prices. They also offer bulk discounts for group orders.',
        category: 'Supplier Review',
        likes: 24,
        comments: 8,
        timestamp: '2 hours ago',
        tags: ['spices', 'mumbai', 'bulk-orders'],
        helpful: true
      },
      {
        id: 2,
        author: 'Priya Sharma',
        authorType: 'Vendor',
        location: 'Delhi',
        title: 'Monsoon Menu Ideas',
        content: 'During monsoon, hot snacks sell really well. I\'ve increased my samosa and pakora sales by 40%. Here are some tips...',
        category: 'Business Tips',
        likes: 31,
        comments: 12,
        timestamp: '5 hours ago',
        tags: ['monsoon', 'menu', 'sales'],
        helpful: true
      },
      {
        id: 3,
        author: 'Fresh Vegetables Co.',
        authorType: 'Supplier',
        location: 'Pune',
        title: 'New Organic Vegetable Line Available',
        content: 'We\'re excited to announce our new organic vegetable line. Special launch prices for the first 50 vendors!',
        category: 'Product Launch',
        likes: 18,
        comments: 6,
        timestamp: '1 day ago',
        tags: ['organic', 'vegetables', 'launch'],
        helpful: false
      }
    ];

    const mockKnowledge = [
      {
        id: 1,
        title: 'Food Safety Guidelines for Street Vendors',
        author: 'Dr. Anjali Mehta',
        category: 'Food Safety',
        readTime: '8 min read',
        rating: 4.8,
        downloads: 1250,
        content: 'Complete guide to maintaining food safety standards...',
        tags: ['food-safety', 'guidelines', 'health']
      },
      {
        id: 2,
        title: 'Seasonal Ingredient Planning',
        author: 'Chef Ramesh',
        category: 'Business Strategy',
        readTime: '12 min read',
        rating: 4.6,
        downloads: 890,
        content: 'How to plan your ingredient purchases based on seasons...',
        tags: ['planning', 'seasonal', 'ingredients']
      },
      {
        id: 3,
        title: 'Digital Payment Integration',
        author: 'Tech Guru Suresh',
        category: 'Technology',
        readTime: '6 min read',
        rating: 4.7,
        downloads: 670,
        content: 'Step-by-step guide to accepting digital payments...',
        tags: ['digital-payments', 'technology', 'business']
      }
    ];

    const mockEvents = [
      {
        id: 1,
        title: 'Street Food Vendor Meetup - Mumbai',
        date: '2024-02-15',
        time: '6:00 PM',
        location: 'Community Hall, Andheri',
        organizer: 'Mumbai Vendor Association',
        attendees: 45,
        maxAttendees: 100,
        type: 'Networking',
        description: 'Monthly meetup to discuss challenges, share experiences, and network with fellow vendors.',
        tags: ['networking', 'mumbai', 'meetup']
      },
      {
        id: 2,
        title: 'Food Safety Workshop',
        date: '2024-02-20',
        time: '10:00 AM',
        location: 'Online',
        organizer: 'Food Safety Authority',
        attendees: 120,
        maxAttendees: 200,
        type: 'Workshop',
        description: 'Learn about latest food safety regulations and best practices.',
        tags: ['food-safety', 'workshop', 'online']
      },
      {
        id: 3,
        title: 'Supplier Expo 2024',
        date: '2024-03-05',
        time: '9:00 AM',
        location: 'Exhibition Center, Delhi',
        organizer: 'Supplier Network India',
        attendees: 280,
        maxAttendees: 500,
        type: 'Exhibition',
        description: 'Meet suppliers, discover new products, and negotiate better deals.',
        tags: ['suppliers', 'expo', 'delhi']
      }
    ];

    const mockMentors = [
      {
        id: 1,
        name: 'Rajesh Gupta',
        expertise: 'Business Growth',
        experience: '15 years',
        location: 'Mumbai',
        rating: 4.9,
        sessions: 150,
        specialties: ['Scaling Business', 'Financial Planning', 'Market Expansion'],
        availability: 'Available',
        price: '₹500/hour',
        image: '👨‍💼'
      },
      {
        id: 2,
        name: 'Sunita Devi',
        expertise: 'Food Innovation',
        experience: '12 years',
        location: 'Delhi',
        rating: 4.8,
        sessions: 120,
        specialties: ['Menu Development', 'Recipe Innovation', 'Customer Preferences'],
        availability: 'Available',
        price: '₹400/hour',
        image: '👩‍🍳'
      },
      {
        id: 3,
        name: 'Amit Sharma',
        expertise: 'Digital Marketing',
        experience: '8 years',
        location: 'Bangalore',
        rating: 4.7,
        sessions: 95,
        specialties: ['Social Media', 'Online Presence', 'Customer Acquisition'],
        availability: 'Busy',
        price: '₹600/hour',
        image: '👨‍💻'
      }
    ];

    setCommunityPosts(mockPosts);
    setKnowledgeBase(mockKnowledge);
    setEvents(mockEvents);
    setMentors(mockMentors);
    setLoading(false);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const post = {
      id: Date.now(),
      author: 'You',
      authorType: 'Vendor',
      location: 'Your Location',
      ...newPost,
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
      tags: newPost.content.match(/#\w+/g) || [],
      helpful: false
    };
    setCommunityPosts([post, ...communityPosts]);
    setNewPost({ title: '', content: '', category: '', image: null });
  };

  const likePost = (postId) => {
    setCommunityPosts(communityPosts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const joinEvent = (eventId) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, attendees: event.attendees + 1 } : event
    ));
    alert('Successfully registered for the event!');
  };

  const bookMentor = (mentorId) => {
    alert('Mentor booking request sent! You will receive a confirmation shortly.');
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🤝 Community Marketplace
        </h1>
        <p style={{ color: '#666' }}>
          Connect, learn, and grow with the street food vendor community
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem',
        borderBottom: '2px solid #e9ecef',
        paddingBottom: '1rem'
      }}>
        {[
          { id: 'marketplace', label: '🏪 Community Posts', icon: '💬' },
          { id: 'knowledge', label: '📚 Knowledge Base', icon: '📖' },
          { id: 'events', label: '📅 Events & Meetups', icon: '🎉' },
          { id: 'mentors', label: '👨‍🏫 Find Mentors', icon: '🎓' }
        ].map(tab => (
          <button
            key={tab.id}
            className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Community Posts */}
      {activeTab === 'marketplace' && (
        <div>
          {/* Create New Post */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <div className="card-header">
              <h3>✍️ Share with Community</h3>
            </div>
            <form onSubmit={handlePostSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Post title..."
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <select
                  className="form-select"
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Supplier Review">Supplier Review</option>
                  <option value="Business Tips">Business Tips</option>
                  <option value="Recipe Share">Recipe Share</option>
                  <option value="Question">Question</option>
                  <option value="Success Story">Success Story</option>
                </select>
              </div>
              <div className="form-group">
                <textarea
                  className="form-textarea"
                  placeholder="Share your experience, tips, or ask questions... Use #tags for better visibility"
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                📤 Share Post
              </button>
            </form>
          </div>

          {/* Community Posts List */}
          {communityPosts.map(post => (
            <div key={post.id} className="card" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ margin: 0, color: '#333' }}>{post.title}</h4>
                  <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.25rem' }}>
                    By {post.author} ({post.authorType}) • {post.location} • {post.timestamp}
                  </div>
                </div>
                <span style={{ 
                  background: post.category === 'Supplier Review' ? '#28a745' : 
                             post.category === 'Business Tips' ? '#17a2b8' : '#6f42c1',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem'
                }}>
                  {post.category}
                </span>
              </div>

              <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>{post.content}</p>

              {post.tags.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  {post.tags.map((tag, index) => (
                    <span key={index} style={{ 
                      background: '#f8f9fa',
                      color: '#667eea',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      marginRight: '0.5rem'
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button 
                  className="btn btn-outline btn-small"
                  onClick={() => likePost(post.id)}
                >
                  👍 {post.likes} Likes
                </button>
                <button className="btn btn-outline btn-small">
                  💬 {post.comments} Comments
                </button>
                <button className="btn btn-outline btn-small">
                  📤 Share
                </button>
                {post.helpful && (
                  <span style={{ 
                    background: '#28a745',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem'
                  }}>
                    ✅ Helpful
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Knowledge Base */}
      {activeTab === 'knowledge' && (
        <div>
          <div className="row">
            {knowledgeBase.map(article => (
              <div key={article.id} className="col-3">
                <div className="card" style={{ height: '100%' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>{article.title}</h4>
                    <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                      By {article.author} • {article.readTime}
                    </div>
                    <span style={{ 
                      background: '#f8f9fa',
                      color: '#667eea',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem'
                    }}>
                      {article.category}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
                    {article.content}
                  </p>

                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span>⭐ {article.rating}</span>
                      <span>📥 {article.downloads} downloads</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {article.tags.map((tag, index) => (
                        <span key={index} style={{ 
                          background: '#e9ecef',
                          color: '#666',
                          padding: '0.125rem 0.375rem',
                          borderRadius: '8px',
                          fontSize: '0.625rem'
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="btn btn-primary btn-small" style={{ width: '100%' }}>
                    📖 Read Article
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Events & Meetups */}
      {activeTab === 'events' && (
        <div>
          <div className="row">
            {events.map(event => (
              <div key={event.id} className="col-3">
                <div className="card" style={{ height: '100%' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>{event.title}</h4>
                    <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                      📅 {event.date} at {event.time}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                      📍 {event.location}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
                      👥 Organized by {event.organizer}
                    </div>
                    <span style={{ 
                      background: event.type === 'Workshop' ? '#28a745' : 
                                 event.type === 'Networking' ? '#17a2b8' : '#6f42c1',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem'
                    }}>
                      {event.type}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
                    {event.description}
                  </p>

                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span>👥 {event.attendees}/{event.maxAttendees}</span>
                      <span style={{ color: event.attendees >= event.maxAttendees ? '#dc3545' : '#28a745' }}>
                        {event.attendees >= event.maxAttendees ? 'Full' : 'Available'}
                      </span>
                    </div>
                    <div style={{ 
                      width: '100%', 
                      height: '6px', 
                      background: '#e9ecef', 
                      borderRadius: '3px',
                      overflow: 'hidden',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ 
                        width: `${(event.attendees / event.maxAttendees) * 100}%`, 
                        height: '100%', 
                        background: event.attendees >= event.maxAttendees ? '#dc3545' : '#28a745'
                      }}></div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {event.tags.map((tag, index) => (
                        <span key={index} style={{ 
                          background: '#e9ecef',
                          color: '#666',
                          padding: '0.125rem 0.375rem',
                          borderRadius: '8px',
                          fontSize: '0.625rem'
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    className="btn btn-success btn-small" 
                    style={{ width: '100%' }}
                    onClick={() => joinEvent(event.id)}
                    disabled={event.attendees >= event.maxAttendees}
                  >
                    {event.attendees >= event.maxAttendees ? '❌ Event Full' : '✅ Join Event'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mentors */}
      {activeTab === 'mentors' && (
        <div>
          <div className="row">
            {mentors.map(mentor => (
              <div key={mentor.id} className="col-3">
                <div className="card" style={{ height: '100%', textAlign: 'center' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                    {mentor.image}
                  </div>
                  
                  <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>{mentor.name}</h4>
                  <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                    {mentor.expertise} • {mentor.experience}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
                    📍 {mentor.location}
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span>⭐ {mentor.rating}</span>
                      <span>👥 {mentor.sessions} sessions</span>
                    </div>
                    <div style={{ 
                      background: mentor.availability === 'Available' ? '#d4edda' : '#f8d7da',
                      color: mentor.availability === 'Available' ? '#155724' : '#721c24',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      marginBottom: '0.5rem'
                    }}>
                      {mentor.availability}
                    </div>
                    <div style={{ fontWeight: '500', color: '#333' }}>
                      {mentor.price}
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <h5 style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>Specialties:</h5>
                    {mentor.specialties.map((specialty, index) => (
                      <div key={index} style={{ 
                        background: '#f8f9fa',
                        color: '#667eea',
                        padding: '0.125rem 0.5rem',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        marginBottom: '0.25rem'
                      }}>
                        {specialty}
                      </div>
                    ))}
                  </div>

                  <button 
                    className="btn btn-primary btn-small" 
                    style={{ width: '100%' }}
                    onClick={() => bookMentor(mentor.id)}
                    disabled={mentor.availability !== 'Available'}
                  >
                    {mentor.availability === 'Available' ? '📅 Book Session' : '⏰ Not Available'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunityMarketplace;