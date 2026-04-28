import { useState, useMemo } from 'react';

export default function EventDetails({ event, onBack, onBook }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const getPriceForRow = (rowChar) => {
    const rowIndex = rowChar.charCodeAt(0) - 65; // A=0, B=1...
    const totalRows = event.seats.rows;
    if (totalRows <= 1) return 19999;
    
    // Linearly interpolate between 19999 (Row A) and 4999 (Last Row)
    const price = 19999 - (rowIndex * (19999 - 4999) / (totalRows - 1));
    return Math.round(price);
  };

  const getSeatInfo = (index) => {
    const rowChar = String.fromCharCode(65 + Math.floor((index - 1) / event.seats.cols));
    const col = ((index - 1) % event.seats.cols) + 1;
    const price = getPriceForRow(rowChar);
    return { label: `${rowChar}${col}`, price };
  };

  const toggleSeat = (id) => {
    if (event.seats.booked.includes(id)) return;
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((sum, id) => sum + getSeatInfo(id).price, 0);
  }, [selectedSeats]);

  return (
    <div className="detail-screen">
      {/* Banner */}
      <div className="detail-banner">
        <img src={event.image} alt={event.title} />
        <div className="detail-banner-overlay"></div>
        <button className="detail-back" onClick={onBack}>←</button>
      </div>

      {/* Body */}
      <div className="detail-body">
        <div style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '14px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {event.artist} 
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#6366F1' }}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h1>{event.title}</h1>

        <div className="detail-chips">
          <div className="detail-chip">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {event.date}
          </div>
          <div className="detail-chip">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {event.time}
          </div>
          <div className="detail-chip">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {event.venue.split(',')[0]}
          </div>
        </div>

        <p className="detail-desc">{event.description}</p>

        <div className="seats-section">
          <h2>Select Your Seats</h2>
          <div className="seats-legend">
            <div><span className="legend-dot legend-available"></span> Available</div>
            <div><span className="legend-dot legend-selected"></span> Selected</div>
            <div><span className="legend-dot legend-booked"></span> Booked</div>
          </div>

          <div className="screen-indicator">———— STAGE ————</div>

          <div className="seat-grid" style={{ gridTemplateColumns: `repeat(${event.seats.cols}, 1fr)` }}>
            {Array.from({ length: event.seats.rows * event.seats.cols }, (_, i) => {
              const id = i + 1;
              const isBooked = event.seats.booked.includes(id);
              const isSelected = selectedSeats.includes(id);
              const { label, price } = getSeatInfo(id);

              return (
                <div
                  key={id}
                  className={`seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleSeat(id)}
                  title={`Seat ${label} - ₹${price}`}
                >
                  {label}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Booking */}
      <div className="detail-footer">
        <div className="footer-info">
          <p>{selectedSeats.length} seat(s) selected</p>
          <h3>₹{totalPrice.toLocaleString()}</h3>
        </div>
        <button
          className="btn-book"
          disabled={selectedSeats.length === 0}
          onClick={() => onBook(event, selectedSeats, totalPrice)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
