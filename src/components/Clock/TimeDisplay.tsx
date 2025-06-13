import React from 'react';

interface TimeDisplayProps {
  time: Date;
  is24Hour: boolean;
}

export default function TimeDisplay({ time, is24Hour }: TimeDisplayProps) {
  const formatTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: !is24Hour
    };
    return time.toLocaleTimeString([], options);
  };

  return (
    <div className="text-2xl font-bold text-gray-800 font-mono">
      {formatTime()}
    </div>
  );
}
