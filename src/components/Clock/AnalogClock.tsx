import React from 'react';

interface AnalogClockProps {
  time: Date;
}

export default function AnalogClock({ time }: AnalogClockProps) {
  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDegrees = (hours * 30) + (minutes / 2);
  const minuteDegrees = (minutes * 6) + (seconds / 10);
  const secondDegrees = seconds * 6;

  return (
    <div className="w-40 h-40 relative rounded-full border-4 border-blue-500 mb-4">
      {/* Clock numbers */}
      {[...Array(12)].map((_, i) => {
        const rotation = i * 30;
        return (
          <div
            key={i}
            className="absolute w-full h-full text-sm font-semibold"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <span
              className="absolute left-1/2 -translate-x-1/2"
              style={{ transform: `rotate(-${rotation}deg)`, top: '0.5rem' }}
            >
              {i === 0 ? '12' : i}
            </span>
          </div>
        );
      })}

      {/* Hour hand */}
      <div
        className="absolute w-1 h-16 bg-gray-800 rounded-full origin-bottom left-1/2 -translate-x-1/2 bottom-1/2"
        style={{ transform: `rotate(${hourDegrees}deg)` }}
      />

      {/* Minute hand */}
      <div
        className="absolute w-0.5 h-20 bg-gray-600 rounded-full origin-bottom left-1/2 -translate-x-1/2 bottom-1/2"
        style={{ transform: `rotate(${minuteDegrees}deg)` }}
      />

      {/* Second hand */}
      <div
        className="absolute w-0.5 h-20 bg-red-500 rounded-full origin-bottom left-1/2 -translate-x-1/2 bottom-1/2"
        style={{ transform: `rotate(${secondDegrees}deg)` }}
      />

      {/* Center dot */}
      <div className="absolute w-3 h-3 bg-blue-500 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
