import { useState, useMemo } from 'react';
import { events, categories } from '../data/events';

export default function ExploreScreen({ onEventSelect }) {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  const filtered = useMemo(() => {
    let list = events;
    if (activeCat !== 'all') {
      list = list.filter((e) => e.category === activeCat);
    }
    if (search) {
      list = list.filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.artist.toLowerCase().includes(search.toLowerCase())
      );
    }
    return list;
  }, [activeCat, search]);

  return (
    <div className="explore-screen">
      <div className="explore-header">
        <h1>Explore</h1>
        <p>Find the best events around you</p>
      </div>

      <div className="search-bar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input 
          type="text" 
          placeholder="Search artists, events..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="filter-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
        </button>
      </div>

      <div className="explore-categories">
        <h3>Categories</h3>
        <div className="cat-grid">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className={`cat-item ${activeCat === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCat(cat.id)}
            >
              <div className="cat-icon-box">
                {cat.label === 'Music' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>}
                {cat.label === 'Tech' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>}
                {cat.label === 'Sports' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>}
                {cat.label === 'Gaming' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/></svg>}
                {cat.label === 'Comedy' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z"/><path d="M8 10a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/><path d="M16 10a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/><path d="M7 15a6 6 0 0 0 10 0"/></svg>}
                {cat.label === 'Workshop' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>}
                {cat.label === 'All' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>}
              </div>
              <span>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="explore-results">
        <h2 className="section-title">
          {search ? `Search results for "${search}"` : (activeCat === 'all' ? 'All Events' : `${categories.find(c => c.id === activeCat)?.label} Events`)}
        </h2>
        <div className="event-list">
          {filtered.length === 0 && (
            <div className="no-results">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="11"/><line x1="11" y1="14" x2="11.01" y2="14"/></svg>
              <p>No events found matching your criteria</p>
            </div>
          )}
          {filtered.map((ev) => (
            <div key={ev.id} className="event-card" onClick={() => onEventSelect(ev)}>
              <img src={ev.image} alt={ev.title} />
              <div className="event-info">
                <div>
                  <div className="event-artist">
                    {ev.artist}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#38BDF8" style={{ marginLeft: '4px' }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  </div>
                  <h3>{ev.title}</h3>
                  <div className="event-meta">
                    <span>{ev.date} · {ev.venue.split(',')[0]}</span>
                  </div>
                </div>
                <div className="event-bottom">
                  <span className="price-badge">₹{ev.price.toLocaleString()}</span>
                  <button className="book-btn">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
