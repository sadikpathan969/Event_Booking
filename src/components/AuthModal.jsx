export default function AuthModal({ onLogin, onRegister, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/><line x1="13" y1="5" x2="13" y2="19"/></svg>
        </div>
        <h2>Join SmartEvents</h2>
        <p>Please login or create an account to continue booking your tickets.</p>
        
        <div className="modal-btns">
          <button className="btn-gradient" onClick={onLogin}>
            Login to Account
          </button>
          <button className="btn-secondary" onClick={onRegister}>
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
}
