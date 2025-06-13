import { useState, useEffect } from 'react';
import { AlarmSound } from '../utils/audio';
import { availableSounds } from '../utils/sounds';

export function useAlarmSound() {
  const [alarmSound] = useState(() => new AlarmSound(availableSounds[0]));

  useEffect(() => {
    const handleFirstInteraction = () => {
      alarmSound.start();
      alarmSound.stop();
      document.removeEventListener('click', handleFirstInteraction);
    };
    document.addEventListener('click', handleFirstInteraction);
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, [alarmSound]);

  return alarmSound;
}
