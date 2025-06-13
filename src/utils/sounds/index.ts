import type { Sound } from '../../types/sounds';

export const availableSounds: Sound[] = [
  { id: 'default-beep', name: 'Default Beep', type: 'beep', frequency: 440 },
  { id: 'high-beep', name: 'High Beep', type: 'beep', frequency: 880 },
  { id: 'low-beep', name: 'Low Beep', type: 'beep', frequency: 220 },
  { id: 'melody-1', name: 'Simple Melody', type: 'melody', pattern: [440, 554, 659, 880] },
  { id: 'melody-2', name: 'Gentle Wake', type: 'melody', pattern: [330, 392, 440, 523] },
  { id: 'nature-1', name: 'Birds', type: 'nature', frequency: 1200 },
];
