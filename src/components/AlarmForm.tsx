import React, { useState } from 'react';
import type { Alarm, Sound, SoundSettings } from '../types';
import { availableSounds } from '../utils/sounds';
import SoundSelector from './SoundSelector';

interface AlarmFormProps {
  onSubmit: (alarm: Omit<Alarm, 'id'>) => void;
}

export default function AlarmForm({ onSubmit }: AlarmFormProps) {
  const [time, setTime] = useState('');
  const [questionCount, setQuestionCount] = useState(3);
  const [difficulty, setDifficulty] = useState<Alarm['difficulty']>('medium');
  const [categories, setCategories] = useState<Alarm['categories']>(['math']);
  const [isCustomCount, setIsCustomCount] = useState(false);
  const [sound, setSound] = useState<Sound>(availableSounds[0]);
  const [soundSettings, setSoundSettings] = useState<SoundSettings>({
    volume: 0.5,
    pattern: 'intermittent',
    interval: 500,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      time,
      questionCount,
      difficulty,
      categories,
      isActive: true,
      sound,
      soundSettings,
    });
    setTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Time</label>
        <input
          type="time"
          required
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Number of Questions</label>
        <div className="mt-1 space-y-2">
          <select
            value={isCustomCount ? 'custom' : questionCount}
            onChange={(e) => {
              const value = e.target.value;
              if (value === 'custom') {
                setIsCustomCount(true);
              } else {
                setIsCustomCount(false);
                setQuestionCount(Number(value));
              }
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="1">1 Question</option>
            <option value="3">3 Questions</option>
            <option value="5">5 Questions</option>
            <option value="custom">Custom</option>
          </select>
          
          {isCustomCount && (
            <input
              type="number"
              min="1"
              max="10"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter number of questions (1-10)"
            />
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Alarm['difficulty'])}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categories</label>
        <div className="mt-2 space-y-2">
          {(['math', 'general', 'puzzle'] as const).map((category) => (
            <label key={category} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                checked={categories.includes(category)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCategories([...categories, category]);
                  } else {
                    setCategories(categories.filter((c) => c !== category));
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sound Settings</h3>
        <SoundSelector
          selectedSound={sound}
          settings={soundSettings}
          onSoundChange={setSound}
          onSettingsChange={(newSettings) =>
            setSoundSettings({ ...soundSettings, ...newSettings })
          }
        />
      </div>

      <button
        type="submit"
        disabled={categories.length === 0}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Add Alarm
      </button>
    </form>
  );
}
