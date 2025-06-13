import React from 'react';
import type { Sound, SoundSettings } from '../types/sounds';
import { availableSounds } from '../utils/sounds';

interface SoundSelectorProps {
  selectedSound: Sound;
  settings: SoundSettings;
  onSoundChange: (sound: Sound) => void;
  onSettingsChange: (settings: Partial<SoundSettings>) => void;
}

export default function SoundSelector({
  selectedSound,
  settings,
  onSoundChange,
  onSettingsChange,
}: SoundSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alarm Sound
        </label>
        <select
          value={selectedSound.id}
          onChange={(e) => {
            const sound = availableSounds.find((s) => s.id === e.target.value);
            if (sound) onSoundChange(sound);
          }}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {availableSounds.map((sound) => (
            <option key={sound.id} value={sound.id}>
              {sound.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Volume
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={settings.volume}
          onChange={(e) =>
            onSettingsChange({ volume: parseFloat(e.target.value) })
          }
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pattern
        </label>
        <select
          value={settings.pattern}
          onChange={(e) =>
            onSettingsChange({
              pattern: e.target.value as SoundSettings['pattern'],
            })
          }
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="continuous">Continuous</option>
          <option value="intermittent">Intermittent</option>
        </select>
      </div>
    </div>
  );
}
