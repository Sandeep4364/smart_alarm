import type { Question } from '../../types';

export const puzzleQuestions: Question[] = [
  {
    id: 'puz1',
    category: 'puzzle',
    difficulty: 'easy',
    question: 'Complete the sequence: 2, 4, 6, __',
    options: ['7', '8', '9', '10'],
    correctAnswer: '8'
  },
  {
    id: 'puz2',
    category: 'puzzle',
    difficulty: 'medium',
    question: 'If a = 1 and b = 2, what is a + b × 3?',
    options: ['5', '7', '9', '11'],
    correctAnswer: '7'
  },
  {
    id: 'puz3',
    category: 'puzzle',
    difficulty: 'hard',
    question: 'If today is Tuesday, what day will it be after 100 days?',
    options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    correctAnswer: 'Thursday'
  },
  {
    id: 'puz4',
    category: 'puzzle',
    difficulty: 'easy',
    question: 'What comes next: Triangle, Square, Pentagon, __?',
    options: ['Circle', 'Hexagon', 'Rectangle', 'Octagon'],
    correctAnswer: 'Hexagon'
  },
  {
    id: 'puz5',
    category: 'puzzle',
    difficulty: 'medium',
    question: 'If APPLE is coded as 12234, how is PAPER coded?',
    options: ['21245', '21254', '21534', '21453'],
    correctAnswer: '21245'
  },
  {
    id: 'puz6',
    category: 'puzzle',
    difficulty: 'hard',
    question: 'A clock shows 3:00. What is the angle between the hour and minute hands?',
    options: ['60°', '75°', '90°', '120°'],
    correctAnswer: '90°'
  },
  // Add more puzzle questions...
];
