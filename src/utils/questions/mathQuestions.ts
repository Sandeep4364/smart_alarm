import type { Question } from '../../types';

export const mathQuestions: Question[] = [
  {
    id: 'math1',
    category: 'math',
    difficulty: 'easy',
    question: 'What is 8 + 5?',
    options: ['11', '12', '13', '14'],
    correctAnswer: '13'
  },
  {
    id: 'math2',
    category: 'math',
    difficulty: 'medium',
    question: 'What is 15 × 7?',
    options: ['95', '105', '115', '125'],
    correctAnswer: '105'
  },
  {
    id: 'math3',
    category: 'math',
    difficulty: 'hard',
    question: 'What is the square root of 144?',
    options: ['10', '11', '12', '13'],
    correctAnswer: '12'
  },
  {
    id: 'math4',
    category: 'math',
    difficulty: 'easy',
    question: 'What is 20 - 7?',
    options: ['11', '12', '13', '14'],
    correctAnswer: '13'
  },
  {
    id: 'math5',
    category: 'math',
    difficulty: 'medium',
    question: 'What is 25% of 80?',
    options: ['15', '20', '25', '30'],
    correctAnswer: '20'
  },
  {
    id: 'math6',
    category: 'math',
    difficulty: 'hard',
    question: 'If 3x + 7 = 22, what is x?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  // Add more math questions...
];
