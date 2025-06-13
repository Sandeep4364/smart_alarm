import { useEffect, useRef } from 'react';
    import type { Alarm, AlarmState, Question } from '../types';
    import { getRandomQuestions } from '../utils/questions';
    import { AlarmSound } from '../utils/audio';

    export function useAlarmCheck(
      alarms: Alarm[],
      alarmState: AlarmState,
      alarmSound: AlarmSound,
      setQuestions: React.Dispatch<React.SetStateAction<Question[]>>,
      setAlarmState: React.Dispatch<React.SetStateAction<AlarmState>>
    ) {
      const lastCheckRef = useRef<string>('');

      useEffect(() => {
        const checkAlarms = () => {
          if (alarmState.isRinging) return;

          const now = new Date();
          const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(
            now.getMinutes()
          ).padStart(2, '0')}`;

          if (currentTime === lastCheckRef.current) return;
          lastCheckRef.current = currentTime;

          const ringingAlarm = alarms.find(
            (alarm) => alarm.isActive && alarm.time === currentTime
          );

          if (ringingAlarm) {
            console.log('Alarm triggered:', ringingAlarm);
            try {
              const newQuestions = getRandomQuestions(
                ringingAlarm.categories,
                ringingAlarm.difficulty,
                ringingAlarm.questionCount
              );
              setQuestions(newQuestions);
              setAlarmState({
                isRinging: true,
                currentAlarm: ringingAlarm,
                currentQuestionIndex: 0,
                questionsAnswered: 0,
              });
              alarmSound.setSound(ringingAlarm.sound);
              alarmSound.setSettings(ringingAlarm.soundSettings);
              alarmSound.start();
            } catch (error) {
              //Improved error handling: Show alert to the user
              alert('Error starting alarm: ' + error);
              console.error('Error starting alarm:', error);
            }
          }
        };

        const interval = setInterval(checkAlarms, 1000);
        return () => clearInterval(interval);
      }, [alarms, alarmState.isRinging, alarmSound, setQuestions, setAlarmState]);
    }
