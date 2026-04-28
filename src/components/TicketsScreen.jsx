export default function TicketsScreen({ bookings }) {
  const getSeatLabel = (index, cols) => {
    const row = String.fromCharCode(65 + Math.floor((index - 1) / cols));
    const col = ((index - 1) % cols) + 1;
    return `${row}${col}`;
  };

  return (
    <div className="tickets-screen screen">
      <div className="home-header">
        <div className="greeting">
          <h1>My Tickets</h1>
          <p>Your upcoming experiences</p>
        </div>
      </div>

      <div className="tickets-list">
        {bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/><line x1="13" y1="5" x2="13" y2="19"/></svg>
            <h3>No tickets yet</h3>
            <p>Once you book an event, your tickets will appear here.</p>
          </div>
        ) : (
          bookings.map((booking, i) => (
            <div key={i} className="ticket-card" style={{ animation: `fadeUp 0.4s ease ${i * 0.1}s both` }}>
              <div className="ticket-main">
                <img src={booking.event.image} alt={booking.event.title} />
                <div className="ticket-info">
                  <span className="ticket-artist">{booking.event.artist}</span>
                  <h4>{booking.event.title}</h4>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    {booking.event.date} · {booking.event.time}
                  </p>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {booking.event.venue.split(',')[0]}
                  </p>
                </div>
              </div>
              <div className="ticket-divider"></div>
              <div className="ticket-footer">
                <div className="ticket-seats">
                  <span>SEATS</span>
                  <strong>{booking.seats.map(s => getSeatLabel(s, booking.event.seats.cols)).join(', ')}</strong>
                </div>
                <div className="ticket-id">
                  <span>TICKET ID</span>
                  <strong>#SE{Math.random().toString(36).substr(2, 6).toUpperCase()}</strong>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
