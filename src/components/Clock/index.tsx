import React, { useState } from 'react';
import AnalogClock from './AnalogClock';
import TimeDisplay from './TimeDisplay';
import FormatToggle from './FormatToggle';

interface ClockProps {
  time: Date;
}

export default function Clock({ time }: ClockProps) {
  const [is24Hour, setIs24Hour] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <AnalogClock time={time} />
      <TimeDisplay time={time} is24Hour={is24Hour} />
      <div className="mt-2">
        <FormatToggle
          is24Hour={is24Hour}
          onToggle={() => setIs24Hour(!is24Hour)}
        />
      </div>
    </div>
  );
}
