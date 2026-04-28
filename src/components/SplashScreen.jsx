import { useEffect } from 'react';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash">
      <div className="splash-logo">SmartEvents</div>
      <p className="splash-tagline">Discover. Book. Experience.</p>
    </div>
  );
}
