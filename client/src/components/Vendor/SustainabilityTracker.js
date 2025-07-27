import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function SustainabilityTracker() {
  const { apiCall } = useAuth();
  const [sustainabilityScore, setSustainabilityScore] = useState(null);
  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const [greenSuppliers, setGreenSuppliers] = useState([]);
  const [ecoFriendlyProducts, setEcoFriendlyProducts] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSustainabilityData();
  }, []);

  const fetchSustainabilityData = async () => {
    // Simulated sustainability data
    const mockSustainabilityScore = {
      overall: 78,
      categories: {
        sourcing: 85,
        packaging: 72,
        waste: 80,
        transport: 75,
        energy: 70
      },
      trend: '+12 points this month',
      ranking: '15th out of 200 vendors in your area'
    };

    const mockCarbonFootprint = {
      monthly: 145,
      target: 120,
      reduction: 18,
      breakdown: {
        transport: 45,
        packaging: 35,
        waste: 25,
        energy: 40
      },
      comparison: 'Your footprint is 23% lower than average vendors'
    };

    const mockGreenSuppliers = [
      {
        id: 1,
        name: 'Eco Fresh Farms',
        sustainabilityScore: 92,
        certifications: ['Organic', 'Carbon Neutral', 'Fair Trade'],
        location: '15 km away',
        specialties: ['Organic Vegetables', 'Pesticide-free produce'],
        carbonSaving: '45% less emissions',
        premium: '8% higher cost'
      },
      {
        id: 2,
        name: 'Green Valley Spices',
        sustainabilityScore: 88,
        certifications: ['Organic', 'Rainforest Alliance'],
        location: '22 km away',
        specialties: ['Organic Spices', 'Sustainable packaging'],
        carbonSaving: '38% less emissions',
        premium: '12% higher cost'
      },
      {
        id: 3,
        name: 'Local Harvest Co-op',
        sustainabilityScore: 85,
        certifications: ['Local Sourcing', 'Zero Waste'],
        location: '8 km away',
        specialties: ['Local produce', 'Minimal packaging'],
        carbonSaving: '52% less emissions',
        premium: '5% higher cost'
      }
    ];

    const mockEcoProducts = [
      {
        id: 1,
        name: 'Biodegradable Food Containers',
        category: 'Packaging',
        sustainabilityScore: 95,
        benefits: ['100% compostable', 'Made from sugarcane pulp', 'Microwave safe'],
        carbonSaving: '70% less CO2 than plastic',
        cost: '₹3.50 per piece'
      },
      {
        id: 2,
        name: 'Organic Coconut Oil',
        category: 'Cooking Oil',
        sustainabilityScore: 90,
        benefits: ['Cold-pressed', 'No chemicals', 'Fair trade certified'],
        carbonSaving: '45% less CO2 than refined oil',
        cost: '₹180 per liter'
      },
      {
        id: 3,
        name: 'Bamboo Cutlery Set',
        category: 'Utensils',
        sustainabilityScore: 88,
        benefits: ['Reusable', 'Biodegradable', 'Lightweight'],
        carbonSaving: '80% less CO2 than plastic',
        cost: '₹25 per set'
      }
    ];

    const mockAchievements = [
      {
        title: 'Green Pioneer',
        description: 'First vendor in your area to achieve 75+ sustainability score',
        icon: '🌱',
        date: '2024-01-15',
        reward: '5% discount on eco-friendly products'
      },
      {
        title: 'Carbon Reducer',
        description: 'Reduced carbon footprint by 20% in 3 months',
        icon: '🌍',
        date: '2024-01-10',
        reward: 'Featured in Green Vendor spotlight'
      },
      {
        title: 'Waste Warrior',
        description: 'Zero food waste for 30 consecutive days',
        icon: '♻️',
        date: '2024-01-05',
        reward: 'Free sustainability consultation'
      }
    ];

    setSustainabilityScore(mockSustainabilityScore);
    setCarbonFootprint(mockCarbonFootprint);
    setGreenSuppliers(mockGreenSuppliers);
    setEcoFriendlyProducts(mockEcoProducts);
    setAchievements(mockAchievements);
    setLoading(false);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745';
    if (score >= 60) return '#ffc107';
    return '#dc3545';
  };

  const getCertificationColor = (cert) => {
    const colors = {
      'Organic': '#28a745',
      'Carbon Neutral': '#17a2b8',
      'Fair Trade': '#6f42c1',
      'Rainforest Alliance': '#20c997',
      'Local Sourcing': '#fd7e14',
      'Zero Waste': '#e83e8c'
    };
    return colors[cert] || '#6c757d';
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🌱 Sustainability Tracker
        </h1>
        <p style={{ color: '#666' }}>
          Track your environmental impact and discover eco-friendly sourcing options
        </p>
      </div>

      {/* Sustainability Score Dashboard */}
      <div className="row" style={{ marginBottom: '2rem' }}>
        <div className="col-2">
          <div className="card" style={{ height: '100%', textAlign: 'center' }}>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '50%', 
              background: `conic-gradient(${getScoreColor(sustainabilityScore.overall)} ${sustainabilityScore.overall}%, #e9ecef 0%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <div style={{ 
                width: '90px', 
                height: '90px', 
                borderRadius: '50%', 
                background: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getScoreColor(sustainabilityScore.overall) }}>
                  {sustainabilityScore.overall}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#666' }}>
                  Sustainability
                </div>
              </div>
            </div>
            <div style={{ color: '#28a745', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
              {sustainabilityScore.trend}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#666' }}>
              {sustainabilityScore.ranking}
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="card" style={{ height: '100%' }}>
            <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📊 Category Breakdown
            </h4>
            {Object.entries(sustainabilityScore.categories).map(([category, score]) => (
              <div key={category} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.875rem', textTransform: 'capitalize' }}>{category}</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{score}%</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '6px', 
                  background: '#e9ecef', 
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${score}%`, 
                    height: '100%', 
                    background: getScoreColor(score)
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carbon Footprint */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🌍 Carbon Footprint Tracker
          </h3>
        </div>
        <div className="row">
          <div className="col-3">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: carbonFootprint.monthly <= carbonFootprint.target ? '#28a745' : '#dc3545' }}>
                {carbonFootprint.monthly} kg
              </div>
              <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                CO2 this month
              </div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>
                Target: {carbonFootprint.target} kg
              </div>
            </div>
          </div>
          <div className="col-3">
            <h5 style={{ marginBottom: '1rem' }}>Emission Sources</h5>
            {Object.entries(carbonFootprint.breakdown).map(([source, amount]) => (
              <div key={source} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '0.5rem',
                fontSize: '0.875rem'
              }}>
                <span style={{ textTransform: 'capitalize' }}>{source}:</span>
                <strong>{amount} kg CO2</strong>
              </div>
            ))}
          </div>
          <div className="col-3">
            <div style={{ 
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                -{carbonFootprint.reduction}%
              </div>
              <div style={{ fontSize: '0.875rem', opacity: '0.9' }}>
                Reduction this quarter
              </div>
            </div>
          </div>
          <div className="col-3">
            <div style={{ 
              background: '#f8f9fa',
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '0.875rem',
              textAlign: 'center'
            }}>
              <div style={{ fontWeight: '500', marginBottom: '0.5rem' }}>🏆 Achievement</div>
              <div>{carbonFootprint.comparison}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Green Suppliers */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🌿 Eco-Friendly Suppliers
          </h3>
        </div>
        <div className="row">
          {greenSuppliers.map(supplier => (
            <div key={supplier.id} className="col-3">
              <div className="card" style={{ height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ color: '#28a745', margin: 0 }}>{supplier.name}</h4>
                  <div style={{ 
                    background: getScoreColor(supplier.sustainabilityScore),
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem'
                  }}>
                    {supplier.sustainabilityScore}
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                    📍 {supplier.location}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                    🌱 {supplier.carbonSaving}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    💰 {supplier.premium}
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <h5 style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>Certifications:</h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {supplier.certifications.map((cert, index) => (
                      <span key={index} style={{ 
                        background: getCertificationColor(cert),
                        color: 'white',
                        padding: '0.125rem 0.375rem',
                        borderRadius: '8px',
                        fontSize: '0.625rem'
                      }}>
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <h5 style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>Specialties:</h5>
                  {supplier.specialties.map((specialty, index) => (
                    <div key={index} style={{ 
                      fontSize: '0.75rem', 
                      color: '#666',
                      marginBottom: '0.25rem'
                    }}>
                      • {specialty}
                    </div>
                  ))}
                </div>

                <button className="btn btn-success btn-small" style={{ width: '100%' }}>
                  Choose Green Option
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Eco-Friendly Products */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ♻️ Sustainable Products
          </h3>
        </div>
        <div className="row">
          {ecoFriendlyProducts.map(product => (
            <div key={product.id} className="col-3">
              <div className="card" style={{ height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem' }}>{product.name}</h4>
                  <div style={{ 
                    background: getScoreColor(product.sustainabilityScore),
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem'
                  }}>
                    {product.sustainabilityScore}
                  </div>
                </div>

                <div style={{ 
                  background: '#f8f9fa',
                  padding: '0.75rem',
                  borderRadius: '5px',
                  marginBottom: '1rem',
                  fontSize: '0.875rem'
                }}>
                  <div style={{ fontWeight: '500', marginBottom: '0.5rem' }}>
                    🌱 {product.carbonSaving}
                  </div>
                  <div style={{ color: '#666' }}>
                    💰 {product.cost}
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <h5 style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>Benefits:</h5>
                  {product.benefits.map((benefit, index) => (
                    <div key={index} style={{ 
                      fontSize: '0.75rem', 
                      color: '#666',
                      marginBottom: '0.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <span style={{ color: '#28a745' }}>✓</span>
                      {benefit}
                    </div>
                  ))}
                </div>

                <button className="btn btn-outline btn-small" style={{ width: '100%' }}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="card">
        <div className="card-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🏆 Sustainability Achievements
          </h3>
        </div>
        <div className="row">
          {achievements.map((achievement, index) => (
            <div key={index} className="col-3">
              <div style={{ 
                border: '2px solid #28a745',
                borderRadius: '10px',
                padding: '1rem',
                textAlign: 'center',
                height: '100%'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {achievement.icon}
                </div>
                <h4 style={{ color: '#28a745', marginBottom: '0.5rem', fontSize: '1rem' }}>
                  {achievement.title}
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
                  {achievement.description}
                </p>
                <div style={{ 
                  background: '#28a745',
                  color: 'white',
                  padding: '0.5rem',
                  borderRadius: '5px',
                  fontSize: '0.75rem'
                }}>
                  🎁 {achievement.reward}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem' }}>
                  Earned: {achievement.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SustainabilityTracker;