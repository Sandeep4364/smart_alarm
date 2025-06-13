import type { Sound, SoundSettings } from './sounds';

export interface Question {
  id: string;
  category: 'math' | 'general' | 'puzzle';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Alarm {
  id: string;
  time: string;
  isActive: boolean;
  questionCount: number;
  categories: ('math' | 'general' | 'puzzle')[];
  difficulty: 'easy' | 'medium' | 'hard';
  sound: Sound;
  soundSettings: SoundSettings;
}

export interface AlarmState {
  isRinging: boolean;
  currentAlarm: Alarm | null;
  currentQuestionIndex: number;
  questionsAnswered: number;
}
