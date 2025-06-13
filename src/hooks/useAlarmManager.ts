import { useState } from 'react';
    import type { Alarm, AlarmState, Question } from '../types';
    import { AlarmSound } from '../utils/audio';

    export function useAlarmManager(alarmSound: AlarmSound) {
      const [alarmState, setAlarmState] = useState<AlarmState>({
        isRinging: false,
        currentAlarm: null,
        currentQuestionIndex: 0,
        questionsAnswered: 0,
      });
      const [questions, setQuestions] = useState<Question[]>([]);

      const handleAnswer = (isCorrect: boolean) => {
        if (!alarmState.currentAlarm) return;

        const newQuestionsAnswered = alarmState.questionsAnswered + 1;

        if (newQuestionsAnswered >= alarmState.currentAlarm.questionCount) {
          alarmSound.stop();
          setAlarmState({
            isRinging: false,
            currentAlarm: null,
            currentQuestionIndex: 0,
            questionsAnswered: 0,
          });
          setQuestions([]);
        } else {
          setAlarmState({
            ...alarmState,
            currentQuestionIndex: newQuestionsAnswered, //Corrected index update
            questionsAnswered: newQuestionsAnswered,
          });
        }
      };

      return {
        alarmState,
        setAlarmState,
        questions,
        setQuestions,
        handleAnswer,
      };
    }
