import type { Question } from '../../types';
    import { mathQuestions } from './mathQuestions';
    import { generalQuestions } from './generalQuestions';
    import { puzzleQuestions } from './puzzleQuestions';

    const questionBank: Record<Question['category'], Question[]> = {
      math: mathQuestions,
      general: generalQuestions,
      puzzle: puzzleQuestions
    };

    //Improved question selection for better distribution
    export function getRandomQuestions(
      categories: Question['category'][],
      difficulty: Question['difficulty'],
      count: number
    ): Question[] {
      const questions: Question[] = [];
      const categoryCounts = {};

      while (questions.length < count) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        const newQuestion = generateQuestion(category, difficulty);

        if (!questions.some(q => q.id === newQuestion.id)) {
          questions.push(newQuestion);
        }
      }

      return questions;
    }

    export function generateQuestion(category: Question['category'], difficulty: Question['difficulty']): Question {
      const categoryQuestions = questionBank[category].filter(q => q.difficulty === difficulty);
      const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
      return categoryQuestions[randomIndex];
    }
