import type { Question } from '../../types';

export const generalQuestions: Question[] = [
  {
    id: 'gen1',
    category: 'general',
    difficulty: 'easy',
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 'Paris'
  },
  {
    id: 'gen2',
    category: 'general',
    difficulty: 'medium',
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars'
  },
  {
    id: 'gen3',
    category: 'general',
    difficulty: 'hard',
    question: 'Who wrote "The Theory of Relativity"?',
    options: ['Newton', 'Einstein', 'Hawking', 'Tesla'],
    correctAnswer: 'Einstein'
  },
  {
    id: 'gen4',
    category: 'general',
    difficulty: 'easy',
    question: 'How many continents are there?',
    options: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'gen5',
    category: 'general',
    difficulty: 'medium',
    question: 'Which element has the symbol Fe?',
    options: ['Gold', 'Silver', 'Iron', 'Copper'],
    correctAnswer: 'Iron'
  },
  {
    id: 'gen6',
    category: 'general',
    difficulty: 'hard',
    question: 'What is the speed of light in kilometers per second?',
    options: ['299,792', '199,792', '399,792', '499,792'],
    correctAnswer: '299,792'
  },
  // Add more general knowledge questions...
];
