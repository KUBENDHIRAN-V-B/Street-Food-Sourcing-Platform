import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';

function ARScanner() {
  const { apiCall } = useAuth();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [cameraSupported, setCameraSupported] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkCameraSupport();
    fetchScanHistory();
  }, []);

  const checkCameraSupport = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraSupported(true);
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Camera not supported:', error);
      setCameraSupported(false);
    }
    setLoading(false);
  };

  const fetchScanHistory = async () => {
    // Simulated scan history
    const mockHistory = [
      {
        id: 1,
        timestamp: '2024-01-15 10:30 AM',
        ingredient: 'Tomatoes',
        quality: 'Excellent',
        freshness: 95,
        ripeness: 'Perfect',
        defects: 'None detected',
        recommendation: 'Great for immediate use',
        supplier: 'Fresh Vegetables Co.',
        price: '₹30/kg'
      },
      {
        id: 2,
        timestamp: '2024-01-15 09:15 AM',
        ingredient: 'Onions',
        quality: 'Good',
        freshness: 78,
        ripeness: 'Slightly overripe',
        defects: 'Minor spots detected',
        recommendation: 'Use within 2 days',
        supplier: 'Local Farm Direct',
        price: '₹25/kg'
      },
      {
        id: 3,
        timestamp: '2024-01-14 04:20 PM',
        ingredient: 'Green Chilies',
        quality: 'Excellent',
        freshness: 92,
        ripeness: 'Fresh',
        defects: 'None detected',
        recommendation: 'Perfect for cooking',
        supplier: 'Spice Masters',
        price: '₹80/kg'
      }
    ];
    setScanHistory(mockHistory);
  };

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      videoRef.current.srcObject = stream;
      setIsScanning(true);
    } catch (error) {
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsScanning(false);
  };

  const captureAndAnalyze = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        ingredient: 'Tomatoes',
        quality: 'Excellent',
        freshness: 94,
        ripeness: 'Perfect',
        color: 'Deep Red',
        size: 'Medium-Large',
        defects: 'None detected',
        pesticides: 'Not detected',
        nutritionalValue: {
          vitamin_c: 'High',
          lycopene: 'Very High',
          fiber: 'Good'
        },
        recommendation: 'Excellent quality! Perfect for immediate use in cooking.',
        shelfLife: '5-7 days',
        bestUse: 'Curry, Salad, Sauce',
        priceComparison: [
          { supplier: 'Fresh Vegetables Co.', price: '₹30/kg', rating: 4.5 },
          { supplier: 'Local Farm Direct', price: '₹28/kg', rating: 4.2 },
          { supplier: 'Organic Harvest', price: '₹45/kg', rating: 4.8 }
        ],
        sustainabilityScore: 85,
        carbonFootprint: 'Low',
        organicCertified: false
      };

      setScanResults(mockAnalysis);
      
      // Add to history
      const newScan = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        ingredient: mockAnalysis.ingredient,
        quality: mockAnalysis.quality,
        freshness: mockAnalysis.freshness,
        ripeness: mockAnalysis.ripeness,
        defects: mockAnalysis.defects,
        recommendation: mockAnalysis.recommendation,
        supplier: 'Scanned Item',
        price: 'Market Rate'
      };
      setScanHistory([newScan, ...scanHistory]);
      
      stopScanning();
    }, 2000);
  };

  const getQualityColor = (quality) => {
    switch (quality.toLowerCase()) {
      case 'excellent': return '#28a745';
      case 'good': return '#ffc107';
      case 'fair': return '#fd7e14';
      case 'poor': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getFreshnessColor = (freshness) => {
    if (freshness >= 90) return '#28a745';
    if (freshness >= 70) return '#ffc107';
    if (freshness >= 50) return '#fd7e14';
    return '#dc3545';
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  if (!cameraSupported) {
    return (
      <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
        <div className="card">
          <h2>📱 AR Scanner Not Available</h2>
          <p>Your device doesn't support camera access or AR scanning. Please use a modern mobile device with camera support.</p>
          <div style={{ marginTop: '2rem' }}>
            <h3>Alternative: Manual Quality Check</h3>
            <p>Use our quality guidelines to manually assess ingredients:</p>
            <div className="row">
              <div className="col-3">
                <div className="card">
                  <h4>🍅 Tomatoes</h4>
                  <p>Look for: Deep red color, firm texture, no soft spots</p>
                </div>
              </div>
              <div className="col-3">
                <div className="card">
                  <h4>🧅 Onions</h4>
                  <p>Look for: Dry outer skin, firm feel, no sprouting</p>
                </div>
              </div>
              <div className="col-3">
                <div className="card">
                  <h4>🌶️ Chilies</h4>
                  <p>Look for: Bright color, crisp texture, no wrinkles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          📱 AR Ingredient Quality Scanner
        </h1>
        <p style={{ color: '#666' }}>
          Use AI-powered computer vision to instantly assess ingredient quality, freshness, and value
        </p>
      </div>

      {/* Scanner Interface */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🔍 Live Scanner
          </h3>
        </div>
        
        {!isScanning ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>📸</div>
            <h3 style={{ marginBottom: '1rem' }}>Ready to Scan Ingredients</h3>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Point your camera at any ingredient to get instant quality analysis
            </p>
            <button 
              className="btn btn-primary btn-large"
              onClick={startScanning}
            >
              📱 Start AR Scanner
            </button>
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{ 
                width: '100%', 
                maxHeight: '400px', 
                borderRadius: '10px',
                objectFit: 'cover'
              }}
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            
            {/* AR Overlay */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: '3px solid #667eea',
              borderRadius: '15px',
              width: '200px',
              height: '200px',
              background: 'rgba(102, 126, 234, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
              <div style={{ fontSize: '0.875rem', textAlign: 'center' }}>
                Position ingredient<br />in this frame
              </div>
            </div>

            <div style={{ 
              position: 'absolute',
              bottom: '1rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '1rem'
            }}>
              <button 
                className="btn btn-success"
                onClick={captureAndAnalyze}
              >
                📸 Analyze Quality
              </button>
              <button 
                className="btn btn-secondary"
                onClick={stopScanning}
              >
                ❌ Stop Scanner
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Scan Results */}
      {scanResults && (
        <div className="card" style={{ marginBottom: '2rem', border: '3px solid #28a745' }}>
          <div className="card-header" style={{ background: '#d4edda' }}>
            <h3 style={{ color: '#155724', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ✅ Analysis Complete: {scanResults.ingredient}
            </h3>
          </div>
          
          <div className="row">
            <div className="col-3">
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍅</div>
                <h4 style={{ color: getQualityColor(scanResults.quality) }}>
                  {scanResults.quality} Quality
                </h4>
                <div style={{ 
                  background: getFreshnessColor(scanResults.freshness),
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  display: 'inline-block',
                  marginTop: '0.5rem'
                }}>
                  {scanResults.freshness}% Fresh
                </div>
              </div>
            </div>
            
            <div className="col-3">
              <h4 style={{ marginBottom: '1rem' }}>Quality Metrics</h4>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Ripeness:</strong> {scanResults.ripeness}
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Color:</strong> {scanResults.color}
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Size:</strong> {scanResults.size}
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Defects:</strong> {scanResults.defects}
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Pesticides:</strong> {scanResults.pesticides}
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Shelf Life:</strong> {scanResults.shelfLife}
              </div>
            </div>
            
            <div className="col-3">
              <h4 style={{ marginBottom: '1rem' }}>Nutritional Analysis</h4>
              {Object.entries(scanResults.nutritionalValue).map(([key, value]) => (
                <div key={key} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '0.5rem',
                  padding: '0.25rem 0.5rem',
                  background: '#f8f9fa',
                  borderRadius: '5px'
                }}>
                  <span style={{ textTransform: 'capitalize' }}>{key.replace('_', ' ')}:</span>
                  <strong style={{ color: value === 'High' || value === 'Very High' ? '#28a745' : '#667eea' }}>
                    {value}
                  </strong>
                </div>
              ))}
              
              <div style={{ marginTop: '1rem' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Best Use:</strong> {scanResults.bestUse}
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Sustainability:</strong> {scanResults.sustainabilityScore}/100
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Carbon Footprint:</strong> {scanResults.carbonFootprint}
                </div>
              </div>
            </div>
            
            <div className="col-3">
              <h4 style={{ marginBottom: '1rem' }}>Price Comparison</h4>
              {scanResults.priceComparison.map((supplier, index) => (
                <div key={index} style={{ 
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                    {supplier.supplier}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#28a745' }}>
                      {supplier.price}
                    </span>
                    <span style={{ fontSize: '0.875rem' }}>
                      ⭐ {supplier.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ 
            background: '#e7f3ff',
            padding: '1rem',
            borderRadius: '8px',
            marginTop: '1rem'
          }}>
            <h4 style={{ color: '#0066cc', marginBottom: '0.5rem' }}>🤖 AI Recommendation:</h4>
            <p style={{ color: '#0066cc', margin: 0 }}>{scanResults.recommendation}</p>
          </div>
        </div>
      )}

      {/* Scan History */}
      <div className="card">
        <div className="card-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📋 Scan History
          </h3>
        </div>
        
        {scanHistory.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Ingredient</th>
                  <th>Quality</th>
                  <th>Freshness</th>
                  <th>Recommendation</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {scanHistory.map(scan => (
                  <tr key={scan.id}>
                    <td style={{ fontSize: '0.875rem' }}>{scan.timestamp}</td>
                    <td>
                      <div style={{ fontWeight: '500' }}>{scan.ingredient}</div>
                      <div style={{ fontSize: '0.75rem', color: '#666' }}>{scan.ripeness}</div>
                    </td>
                    <td>
                      <span style={{ 
                        background: getQualityColor(scan.quality),
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem'
                      }}>
                        {scan.quality}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ 
                          width: '40px', 
                          height: '6px', 
                          background: '#e9ecef', 
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div style={{ 
                            width: `${scan.freshness}%`, 
                            height: '100%', 
                            background: getFreshnessColor(scan.freshness)
                          }}></div>
                        </div>
                        <span style={{ fontSize: '0.875rem' }}>{scan.freshness}%</span>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.875rem', maxWidth: '200px' }}>
                      {scan.recommendation}
                    </td>
                    <td>
                      <button className="btn btn-outline btn-small">
                        📊 View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <p style={{ color: '#666' }}>No scans yet. Start scanning ingredients to build your history!</p>
          </div>
        )}
      </div>

      {/* Scanner Tips */}
      <div className="card" style={{ marginTop: '2rem', background: '#f8f9fa' }}>
        <div className="card-header">
          <h3>💡 Scanner Tips</h3>
        </div>
        <div className="row">
          <div className="col-4">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💡</div>
              <h4>Good Lighting</h4>
              <p style={{ fontSize: '0.875rem', color: '#666' }}>
                Use natural light or bright indoor lighting for best results
              </p>
            </div>
          </div>
          <div className="col-4">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📏</div>
              <h4>Proper Distance</h4>
              <p style={{ fontSize: '0.875rem', color: '#666' }}>
                Hold camera 6-12 inches away from the ingredient
              </p>
            </div>
          </div>
          <div className="col-4">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎯</div>
              <h4>Clear Focus</h4>
              <p style={{ fontSize: '0.875rem', color: '#666' }}>
                Ensure the ingredient fills most of the scanning frame
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ARScanner;