import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import AuthScreen from './components/AuthScreen';
import HomeScreen from './components/HomeScreen';
import EventDetails from './components/EventDetails';
import BookingScreen from './components/BookingScreen';
import ProfileScreen from './components/ProfileScreen';
import TicketsScreen from './components/TicketsScreen';
import AuthModal from './components/AuthModal';
import ExploreScreen from './components/ExploreScreen';

const SCREENS = { SPLASH: 0, AUTH: 1, HOME: 2, DETAIL: 3, BOOKING: 4, PROFILE: 5, TICKETS: 6 };

export default function App() {
  const [screen, setScreen] = useState(SCREENS.SPLASH);
  const [user, setUser] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingSeats, setBookingSeats] = useState([]);
  const [bookingTotalPrice, setBookingTotalPrice] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:5000/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          if (response.ok) {
            setUser(data.user);
          } else {
            localStorage.removeItem('token');
          }
        } catch (err) {
          console.error('Auth initialization failed:', err);
        }
      }
      setIsInitializing(false);
    };
    checkAuth();
  }, []);

  const handleLogin = (u) => { 
    setUser(u); 
    setShowAuthModal(false);
    if (selectedEvent && bookingSeats.length > 0) {
      setScreen(SCREENS.BOOKING);
    } else {
      setScreen(SCREENS.HOME); 
    }
  };

  const handleLogout = () => { 
    setUser(null); 
    localStorage.removeItem('token');
    setScreen(SCREENS.AUTH); 
    setActiveTab('home'); 
  };

  const handleEventSelect = (ev) => { setSelectedEvent(ev); setScreen(SCREENS.DETAIL); };

  const handleBook = (ev, seats, totalPrice) => {
    setBookingTotalPrice(totalPrice);
    if (!user) {
      setSelectedEvent(ev);
      setBookingSeats(seats);
      setShowAuthModal(true);
      return;
    }
    setSelectedEvent(ev);
    setBookingSeats(seats);
    setScreen(SCREENS.BOOKING);
  };

  const handleConfirmBooking = () => {
    setBookings((prev) => [{ event: selectedEvent, seats: bookingSeats, date: new Date().toLocaleDateString() }, ...prev]);
    setSelectedEvent(null);
    setBookingSeats([]);
    setScreen(SCREENS.TICKETS);
    setActiveTab('tickets');
  };

  const navTo = (tab) => {
    setActiveTab(tab);
    if (tab === 'home' || tab === 'explore') setScreen(SCREENS.HOME);
    else if (tab === 'tickets') setScreen(SCREENS.TICKETS);
    else if (tab === 'profile') setScreen(SCREENS.PROFILE);
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setScreen(SCREENS.AUTH);
    setShowAuthModal(false);
  };

  const renderScreen = () => {
    if (isInitializing) return <SplashScreen onFinish={() => {}} />;

    switch (screen) {
      case SCREENS.SPLASH:
        return <SplashScreen onFinish={() => setScreen(user ? SCREENS.HOME : SCREENS.AUTH)} />;
      case SCREENS.AUTH:
        return <div className="screen"><AuthScreen onLogin={handleLogin} initialMode={authMode} /></div>;
      case SCREENS.HOME:
        if (activeTab === 'explore') {
          return (
            <div className="screen">
              <ExploreScreen onEventSelect={handleEventSelect} />
            </div>
          );
        }
        return (
          <div className="screen">
            <HomeScreen 
              user={user} 
              onEventSelect={handleEventSelect} 
              onProfileClick={() => navTo('profile')} 
            />
          </div>
        );
      case SCREENS.DETAIL:
        return (
          <div className="screen">
            <EventDetails event={selectedEvent} onBack={() => setScreen(SCREENS.HOME)} onBook={handleBook} />
          </div>
        );
      case SCREENS.BOOKING:
        return (
          <div className="screen">
            <BookingScreen
              event={selectedEvent}
              seats={bookingSeats}
              totalPrice={bookingTotalPrice}
              onBack={() => setScreen(SCREENS.DETAIL)}
              onConfirm={handleConfirmBooking}
            />
          </div>
        );
      case SCREENS.TICKETS:
        return (
          <div className="screen">
            <TicketsScreen bookings={bookings} />
          </div>
        );
      case SCREENS.PROFILE:
        return (
          <div className="screen">
            <ProfileScreen 
              user={user} 
              bookings={bookings} 
              onLogout={handleLogout} 
              onExploreClick={() => navTo('explore')}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const showNav = [SCREENS.HOME, SCREENS.PROFILE, SCREENS.TICKETS].includes(screen);

  return (
    <div className="app-shell">
      {renderScreen()}

      {showAuthModal && (
        <AuthModal 
          onLogin={() => openAuth('login')} 
          onRegister={() => openAuth('register')} 
          onClose={() => setShowAuthModal(false)} 
        />
      )}

      {showNav && (
        <div className="bottom-nav">
          <div className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => navTo('home')}>
            <span className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </span>
            <span>Home</span>
          </div>
          <div className={`nav-item ${activeTab === 'explore' ? 'active' : ''}`} onClick={() => navTo('home')}>
            <span className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <span>Explore</span>
          </div>
          <div className={`nav-item ${activeTab === 'tickets' ? 'active' : ''}`} onClick={() => navTo('tickets')}>
            <span className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/><line x1="13" y1="5" x2="13" y2="19"/></svg>
            </span>
            <span>Tickets</span>
          </div>
          <div className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => navTo('profile')}>
            <span className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </span>
            <span>Profile</span>
          </div>
        </div>
      )}
    </div>
  );
}
