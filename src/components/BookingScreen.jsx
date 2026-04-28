import { useState, useEffect } from 'react';
import qrImg from '../assets/qr.png';

const STATES = { FORM: 0, LOADING: 1, SUCCESS: 2, FAILURE: 3 };

export default function BookingScreen({ event, seats, totalPrice, onBack, onConfirm }) {
  const [payState, setPayState] = useState(STATES.FORM);
  const [method, setMethod] = useState('card');
  const [saveCard, setSaveCard] = useState(false);
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    let timer;
    if (method === 'upi' && payState === STATES.FORM) {
      // Show payment received notification after 4 seconds of UPI view
      timer = setTimeout(() => {
        setShowNotification(true);
        // Automatically transition to success after notification
        setTimeout(() => {
          setPayState(STATES.SUCCESS);
        }, 2000);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [method, payState]);

  const getSeatLabel = (index) => {
    const row = String.fromCharCode(65 + Math.floor((index - 1) / event.seats.cols));
    const col = ((index - 1) % event.seats.cols) + 1;
    return `${row}${col}`;
  };

  const subtotal = totalPrice;
  const convFee = Math.round(subtotal * 0.05);
  const gst = Math.round(subtotal * 0.02);
  const total = subtotal + convFee + gst;

  const txnId = `TXN${Date.now().toString().slice(-8)}`;

  const handlePay = () => {
    setIsProcessing(true);
    setPayState(STATES.LOADING);
    setTimeout(() => {
      setPayState(STATES.SUCCESS);
      setIsProcessing(false);
    }, 2500);
  };

  if (payState === STATES.LOADING) {
    return (
      <div className="pay-screen screen">
        <div className="pay-loading">
          <div className="pay-loading-spinner"></div>
          <h3>Processing Payment</h3>
          <p>Please wait while we confirm your payment...</p>
        </div>
      </div>
    );
  }

  if (payState === STATES.SUCCESS) {
    return (
      <div className="pay-screen screen">
        <div className="pay-success">
          <div className="success-ring"><span className="success-check">✓</span></div>
          <h2>Payment Successful</h2>
          <p className="sub">Your booking has been confirmed</p>
          <div className="pay-receipt">
            <h4>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Booking Receipt
            </h4>
            <div className="receipt-row"><span>Event</span><span>{event.title}</span></div>
            <div className="receipt-row"><span>Date</span><span>{event.date}</span></div>
            <div className="receipt-row"><span>Seats</span><span>{seats.map((s) => getSeatLabel(s)).join(', ')}</span></div>
            <div className="receipt-divider"></div>
            <div className="receipt-row"><span>Amount Paid</span><span style={{ color: '#10B981', fontWeight: 700 }}>₹{total.toLocaleString()}</span></div>
          </div>
          <button className="btn-pay" onClick={() => onConfirm(total)}>
            Go to My Tickets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pay-screen screen">
      {showNotification && (
        <div className="payment-popup">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" style={{ marginRight: '10px' }}>
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <div>
            <strong style={{ display: 'block' }}>Payment Received!</strong>
            <span style={{ fontSize: '12px', opacity: 0.9 }}>Processing your tickets...</span>
          </div>
        </div>
      )}

      <div className="pay-header">
        <button className="pay-back" onClick={onBack}>←</button>
        <h1>Complete Payment</h1>
      </div>

      <div className="pay-summary">
        <div className="pay-summary-top">
          <img src={event.image} alt={event.title} />
          <div className="pay-summary-info">
            <div style={{ color: 'var(--accent)', fontSize: '11px', fontWeight: 600 }}>{event.artist}</div>
            <h3>{event.title}</h3>
            <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {event.date} · {event.time}
            </p>
          </div>
        </div>
        <div className="pay-summary-seats">
          {seats.map((s) => (
            <span key={s} className="pay-seat-tag">{getSeatLabel(s)}</span>
          ))}
        </div>
        <div className="pay-total-row">
          <span>Total Amount</span>
          <span className="pay-total-amount">₹{total.toLocaleString()}</span>
        </div>
      </div>

      <div className="pay-tabs">
        <button className={`pay-tab ${method === 'card' ? 'active' : ''}`} onClick={() => setMethod('card')}>
          <span className="pay-tab-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
          </span>
          Card
        </button>
        <button className={`pay-tab ${method === 'upi' ? 'active' : ''}`} onClick={() => setMethod('upi')}>
          <span className="pay-tab-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12" y2="18"></line>
            </svg>
          </span>
          UPI QR
        </button>
      </div>

      {method === 'card' ? (
        <div className="pay-form">
          <div className="pay-input-wrapper">
            <span className="pay-input-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </span>
            <input className="pay-input" placeholder="Card Number" maxLength={19} inputMode="numeric" />
          </div>
          <div className="pay-input-wrapper">
            <span className="pay-input-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            <input className="pay-input" placeholder="Card Holder Name" />
          </div>
          <div className="pay-input-row">
            <div className="pay-input-wrapper">
              <span className="pay-input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </span>
              <input className="pay-input" placeholder="MM/YY" maxLength={5} inputMode="numeric" />
            </div>
            <div className="pay-input-wrapper">
              <span className="pay-input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input className="pay-input" placeholder="CVV" maxLength={3} type="password" inputMode="numeric" />
            </div>
          </div>
          <button className="btn-pay" onClick={handlePay} disabled={isProcessing}>
            {isProcessing ? <div className="spinner"></div> : `Pay ₹${total.toLocaleString()}`}
          </button>
        </div>
      ) : (
        <div className="qr-container">
          <div className="qr-image-wrapper">
            <img src={qrImg} alt="UPI QR Code" />
          </div>
          <div className="qr-scan-text">
            <strong>Scan this QR code to pay</strong>
            <p>Open any UPI app like GPay, PhonePe or Paytm</p>
          </div>
          <div className="secure-badge" style={{ marginTop: '10px' }}>
             Waiting for payment...
          </div>
        </div>
      )}

      <div className="secure-badge" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        Secured by SmartEvents • 256-bit encryption
      </div>
    </div>
  );
}
