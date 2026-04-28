import { useState, useMemo } from 'react';
import { events, categories, trendingEvent } from '../data/events';

export default function HomeScreen({ user, onEventSelect, onProfileClick }) {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  const featured = useMemo(() => events.filter((e) => e.featured), []);

  const filtered = useMemo(() => {
    let list = activeCat === 'all' ? events : events.filter((e) => e.category === activeCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) => e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q) || e.artist?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCat, search]);
  
  const showHero = activeCat === 'all' && !search;

  return (
    <div className="home">
      {/* Header */}
      <div className="home-header">
        <div className="greeting">
          <h1>Hey {user?.name?.split(' ')[0] || 'Sam'}</h1>
          <p>Let's find your next experience</p>
        </div>
        <div className="avatar" onClick={onProfileClick}>
          {(user?.name?.[0] || 'S').toUpperCase()}
        </div>
      </div>

      {/* Search */}
      <div className="search-bar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          placeholder="Search events, artists, venues..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="filter-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
        </button>
      </div>

      {/* Categories */}
      <div className="categories">
        {categories.map((c) => (
          <div
            key={c.id}
            className={`cat-chip ${activeCat === c.id ? 'active' : ''}`}
            onClick={() => setActiveCat(c.id)}
          >
            {c.label}
          </div>
        ))}
      </div>

      {/* Trending Banner */}
      {showHero && (
        <div className="trending-banner" onClick={() => onEventSelect(trendingEvent)}>
          <img src={trendingEvent.image} alt={trendingEvent.title} />
          <div className="trending-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            Trending Now
          </div>
          <div className="trending-overlay">
            <div className="trending-content">
              <h2>{trendingEvent.title}</h2>
              <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {trendingEvent.venue.split(',')[0]} · Oct 24
              </p>
            </div>
            <div className="trending-footer">
              <span className="trending-price">from ₹{trendingEvent.price}</span>
              <button className="btn-banner">Book Now</button>
            </div>
          </div>
        </div>
      )}

      {/* Featured Carousel */}
      {showHero && featured.length > 0 && (
        <>
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Featured Events
          </h2>
          <div className="featured-carousel">
            {featured.map((ev) => (
              <div key={ev.id} className="featured-card" onClick={() => onEventSelect(ev)}>
                <img src={ev.image} alt={ev.title} />
                <div className="featured-badge">₹{ev.price}</div>
                <div className="featured-overlay">
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {ev.title} 
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#6366F1' }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  </h3>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    {ev.date} · {ev.artist}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Event List */}
      <h2 className="section-title">
        {activeCat === 'all' ? 'All Events' : `${categories.find((c) => c.id === activeCat)?.label} Events`}
      </h2>
      <div className="event-list">
        {filtered.length === 0 && (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '60px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            No events found
          </div>
        )}
        {filtered.map((ev) => (
          <div key={ev.id} className="event-card" onClick={() => onEventSelect(ev)}>
            <img src={ev.image} alt={ev.title} />
            <div className="event-info">
              <div className="event-artist" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {ev.artist} <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#6366F1' }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              </div>
              <h3>{ev.title}</h3>
              <div style={{ margin: '4px 0', display: 'flex', gap: '6px' }}>
                {ev.isTrending && <span className="card-tag tag-trending">Trending</span>}
                {ev.isPopular && <span className="card-tag tag-popular">Popular</span>}
              </div>
              <div className="event-meta">
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {ev.date} · {ev.time}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {ev.venue.split(',')[0]}
                </span>
              </div>
              <div className="event-bottom">
                <span className="price-badge">₹{ev.price}</span>
                <button className="book-btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Book 
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
