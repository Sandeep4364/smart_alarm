export interface Sound {
  id: string;
  name: string;
  type: 'beep' | 'melody' | 'nature';
  frequency?: number; // For beep sounds
  pattern?: number[]; // For custom patterns
}

export interface SoundSettings {
  volume: number;
  pattern: 'continuous' | 'intermittent';
  interval?: number; // Interval for intermittent sounds in ms
}
