import React, { useState, useEffect, useRef } from 'react';
import Clock from './Clock';

export default function LiveTime() {
  const [time, setTime] = useState(new Date());
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Update time immediately
    setTime(new Date());

    // Set up the interval
    timerRef.current = window.setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup function
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <Clock time={time} />
    </div>
  );
}
