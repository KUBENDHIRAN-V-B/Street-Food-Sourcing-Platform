import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function MicroLending() {
  const { apiCall } = useAuth();
  const [creditScore, setCreditScore] = useState(null);
  const [loanOffers, setLoanOffers] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [activeLoans, setActiveLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreditData();
  }, []);

  const fetchCreditData = async () => {
    // Simulated credit scoring based on order history, payment behavior, etc.
    const mockCreditScore = {
      score: 742,
      rating: 'Good',
      factors: {
        paymentHistory: 85,
        orderFrequency: 78,
        businessStability: 82,
        supplierRatings: 90
      },
      improvement: '+15 points this month'
    };

    const mockLoanOffers = [
      {
        id: 1,
        lender: 'Street Food Finance',
        amount: 25000,
        interestRate: 12,
        tenure: 6,
        emi: 4500,
        purpose: 'Inventory Purchase',
        approval: 'Pre-approved',
        features: ['No collateral', 'Quick disbursal', 'Flexible repayment']
      },
      {
        id: 2,
        lender: 'Vendor Credit Union',
        amount: 15000,
        interestRate: 10,
        tenure: 4,
        emi: 4100,
        purpose: 'Equipment Upgrade',
        approval: 'Instant',
        features: ['Community backed', 'Lower interest', 'Peer support']
      },
      {
        id: 3,
        lender: 'Digital Micro Finance',
        amount: 50000,
        interestRate: 15,
        tenure: 12,
        emi: 4800,
        purpose: 'Business Expansion',
        approval: 'Under Review',
        features: ['Higher amount', 'Longer tenure', 'Business growth']
      }
    ];

    const mockPaymentHistory = [
      { date: '2024-01-15', amount: 4500, status: 'Paid', loan: 'Equipment Loan' },
      { date: '2024-01-01', amount: 3200, status: 'Paid', loan: 'Inventory Loan' },
      { date: '2023-12-15', amount: 4500, status: 'Paid', loan: 'Equipment Loan' },
      { date: '2023-12-01', amount: 3200, status: 'Paid', loan: 'Inventory Loan' }
    ];

    const mockActiveLoans = [
      {
        id: 1,
        type: 'Equipment Loan',
        principal: 30000,
        outstanding: 18000,
        nextEmi: 4500,
        dueDate: '2024-02-15',
        tenure: '6 months',
        interestRate: 12
      }
    ];

    setCreditScore(mockCreditScore);
    setLoanOffers(mockLoanOffers);
    setPaymentHistory(mockPaymentHistory);
    setActiveLoans(mockActiveLoans);
    setLoading(false);
  };

  const applyForLoan = (loanId) => {
    alert(`Loan application submitted for Loan ID: ${loanId}. You will receive a confirmation shortly.`);
  };

  const getCreditRatingColor = (rating) => {
    switch (rating) {
      case 'Excellent': return '#28a745';
      case 'Good': return '#17a2b8';
      case 'Fair': return '#ffc107';
      case 'Poor': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          💳 Micro-Lending & Credit
        </h1>
        <p style={{ color: '#666' }}>
          Access instant credit for inventory and business growth
        </p>
      </div>

      {/* Credit Score Dashboard */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📊 Your Credit Profile
          </h3>
        </div>
        <div className="row">
          <div className="col-2">
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '50%', 
                background: `conic-gradient(${getCreditRatingColor(creditScore.rating)} ${creditScore.score/10}%, #e9ecef 0%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                position: 'relative'
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
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getCreditRatingColor(creditScore.rating) }}>
                    {creditScore.score}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>
                    {creditScore.rating}
                  </div>
                </div>
              </div>
              <div style={{ color: '#28a745', fontSize: '0.875rem', fontWeight: '500' }}>
                {creditScore.improvement}
              </div>
            </div>
          </div>
          <div className="col-2">
            <h4 style={{ marginBottom: '1rem' }}>Credit Factors</h4>
            {Object.entries(creditScore.factors).map(([factor, score]) => (
              <div key={factor} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.875rem', textTransform: 'capitalize' }}>
                    {factor.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
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
                    background: score >= 80 ? '#28a745' : score >= 60 ? '#ffc107' : '#dc3545',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loan Offers */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            💰 Available Loan Offers
          </h3>
        </div>
        <div className="row">
          {loanOffers.map(offer => (
            <div key={offer.id} className="col-3">
              <div className="card" style={{ height: '100%', position: 'relative' }}>
                <div style={{ 
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: offer.approval === 'Pre-approved' ? '#28a745' : offer.approval === 'Instant' ? '#17a2b8' : '#ffc107',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem'
                }}>
                  {offer.approval}
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>{offer.lender}</h4>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
                    ₹{offer.amount.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    {offer.purpose}
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Interest Rate:</span>
                    <strong>{offer.interestRate}% p.a.</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Tenure:</span>
                    <strong>{offer.tenure} months</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>EMI:</span>
                    <strong>₹{offer.emi.toLocaleString()}</strong>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <h5 style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>Features:</h5>
                  {offer.features.map((feature, index) => (
                    <div key={index} style={{ 
                      fontSize: '0.75rem', 
                      color: '#666',
                      marginBottom: '0.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <span style={{ color: '#28a745' }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                <button 
                  className="btn btn-primary btn-small"
                  style={{ width: '100%' }}
                  onClick={() => applyForLoan(offer.id)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Loans */}
      {activeLoans.length > 0 && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-header">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📋 Active Loans
            </h3>
          </div>
          {activeLoans.map(loan => (
            <div key={loan.id} style={{ 
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <div className="row">
                <div className="col-4">
                  <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>{loan.type}</h4>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    Tenure: {loan.tenure} | Rate: {loan.interestRate}%
                  </div>
                </div>
                <div className="col-4">
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#666' }}>Outstanding Amount</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#dc3545' }}>
                      ₹{loan.outstanding.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#666' }}>Next EMI</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#333' }}>
                      ₹{loan.nextEmi.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>
                      Due: {loan.dueDate}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <div style={{ 
                  width: '100%', 
                  height: '8px', 
                  background: '#e9ecef', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${((loan.principal - loan.outstanding) / loan.principal) * 100}%`, 
                    height: '100%', 
                    background: '#28a745'
                  }}></div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>
                  {Math.round(((loan.principal - loan.outstanding) / loan.principal) * 100)}% repaid
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment History */}
      <div className="card">
        <div className="card-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📈 Payment History
          </h3>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Loan Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.date}</td>
                  <td>{payment.loan}</td>
                  <td>₹{payment.amount.toLocaleString()}</td>
                  <td>
                    <span className={`status status-${payment.status.toLowerCase()}`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MicroLending;