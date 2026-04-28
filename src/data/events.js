import arijitImg from '../assets/arijit.png';
import shreyaImg from '../assets/shreya.png';
import apDhillonImg from '../assets/ap_dhillon.png';
import diljitImg from '../assets/diljit.png';
import weekndImg from '../assets/weeknd.png';

export const categories = [
  { id: 'all', label: 'All', icon: 'All' },
  { id: 'music', label: 'Music', icon: 'Music' },
  { id: 'tech', label: 'Tech', icon: 'Tech' },
  { id: 'sports', label: 'Sports', icon: 'Sports' },
  { id: 'gaming', label: 'Gaming', icon: 'Gaming' },
  { id: 'comedy', label: 'Comedy', icon: 'Comedy' },
  { id: 'workshop', label: 'Workshop', icon: 'Workshop' },
];

export const trendingEvent = {
  id: 0,
  title: 'The Weeknd Live Concert',
  artist: 'The Weeknd',
  category: 'music',
  date: 'Oct 24, 2026',
  time: '8:00 PM',
  venue: 'Embassy International Riding School, Bangalore',
  price: 4999,
  image: weekndImg,
  isTrending: true,
  description: 'The Weeknd is bringing his global "After Hours Till Dawn" tour to India! Experience the cinematic pop and R&B magic in an electrifying night at Bangalore.',
  seats: { rows: 8, cols: 8, booked: [1, 2, 5, 8, 12, 13, 16, 21, 22, 25, 30, 31, 40, 45, 48, 52, 55, 60] },
};

export const events = [
  {
    id: 1,
    title: 'Arijit Singh Live Concert',
    artist: 'Arijit Singh',
    category: 'music',
    date: 'May 15, 2026',
    time: '7:00 PM',
    venue: 'Jio World Garden, Mumbai',
    price: 2499,
    image: arijitImg,
    featured: true,
    isTrending: true,
    isPopular: true,
    description: 'Join the soulful king of Bollywood, Arijit Singh, for an evening of magic and melodies. Experience his chart-topping hits live under the Mumbai stars.',
    seats: { rows: 8, cols: 8, booked: [3, 4, 7, 10, 11, 15, 18, 19, 22, 25, 28, 30, 35, 38, 42, 44, 50, 55, 58, 62] },
  },
  {
    id: 2,
    title: 'Shreya Ghoshal Live',
    artist: 'Shreya Ghoshal',
    category: 'music',
    date: 'Jun 8, 2026',
    time: '6:30 PM',
    venue: 'Indira Gandhi Arena, Delhi',
    price: 1999,
    image: shreyaImg,
    featured: true,
    isPopular: true,
    description: 'The nightingale of India, Shreya Ghoshal, performs her biggest hits live. A symphonic experience that will touch your soul.',
    seats: { rows: 6, cols: 8, booked: [1, 2, 5, 8, 12, 15, 18, 20, 22, 25, 30, 33, 40, 42, 45] },
  },
  {
    id: 3,
    title: 'AP Dhillon Live',
    artist: 'AP Dhillon',
    category: 'music',
    date: 'May 28, 2026',
    time: '8:00 PM',
    venue: 'Exhibition Ground, Chandigarh',
    price: 1499,
    image: apDhillonImg,
    featured: true,
    isTrending: true,
    description: 'AP Dhillon and the Brown Boys are back! Catch them live in Chandigarh for an unforgettable night of high-octane Punjabi hip-hop. Insane energy, non-stop hits, and the ultimate vibes.',
    seats: { rows: 8, cols: 8, booked: [1, 5, 8, 10, 12, 15, 18, 22, 25, 28, 30, 35, 40, 42, 45, 48, 52, 55, 60, 63] },
  },
  {
    id: 4,
    title: 'Diljit Dosanjh Live',
    artist: 'Diljit Dosanjh',
    category: 'music',
    date: 'Jul 12, 2026',
    time: '7:30 PM',
    venue: 'Bhartiya Mall Ground, Bangalore',
    price: 2999,
    image: diljitImg,
    featured: false,
    isPopular: true,
    description: 'Experience the G.O.A.T Diljit Dosanjh live in action! High energy, bhangra beats, and pure entertainment coming your way in Bangalore.',
    seats: { rows: 8, cols: 8, booked: [2, 4, 6, 8, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60] },
  },
];
