import { useState } from 'react';

export default function ProfileScreen({ user, bookings, onLogout, onExploreClick }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+91 9876543210'
  });

  const handleSave = () => {
    alert('Profile updated successfully!');
  };


  return (
    <div className="profile-screen">
      {/* Avatar & Info */}
      <div className="profile-header">
        <div className="profile-avatar">{(user?.name?.[0] || 'S').toUpperCase()}</div>
        <h2>{user?.name || 'Sam'}</h2>
        <p>{user?.email || 'sam@email.com'}</p>
      </div>

      {/* Edit Profile Form */}
      <div className="profile-section">
        <h3>Edit Profile</h3>
        <div className="profile-form">
          <div className="input-group">
            <input 
              type="text" 
              placeholder=" "
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <label>Full Name</label>
            <span className="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </span>
          </div>

          <div className="input-group">
            <input 
              type="email" 
              placeholder=" "
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <label>Email Address</label>
            <span className="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </span>
          </div>

          <div className="input-group">
            <input 
              type="tel" 
              placeholder=" "
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <label>Phone Number</label>
            <span className="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </span>
          </div>

          <button className="btn-gradient" style={{ marginTop: '12px' }} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>

      <button className="btn-logout" onClick={onLogout} style={{ marginTop: '24px' }}>Logout</button>
    </div>
  );
}
