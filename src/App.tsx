import React, { useState } from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import Header from './components/Header';
    import AlarmList from './components/AlarmList';
    import QuestionModal from './components/QuestionModal';
    import { useAlarmCheck } from './hooks/useAlarmCheck';
    import { useAlarmSound } from './hooks/useAlarmSound';
    import { useAlarmManager } from './hooks/useAlarmManager';
    import type { Alarm } from './types';
    import SettingsPage from './pages/SettingsPage';
    import HomePage from './pages/HomePage';

    export default function App() {
      const [alarms, setAlarms] = useState<Alarm[]>([]);
      const alarmSound = useAlarmSound();
      const {
        alarmState,
        setAlarmState,
        questions,
        setQuestions,
        handleAnswer,
      } = useAlarmManager(alarmSound);

      useAlarmCheck(alarms, alarmState, alarmSound, setQuestions, setAlarmState);

      const handleAddAlarm = (newAlarm: Omit<Alarm, 'id'>) => {
        const alarm: Alarm = {
          ...newAlarm,
          id: Date.now().toString(),
        };
        setAlarms([...alarms, alarm]);
      };

      const handleDeleteAlarm = (id: string) => {
        setAlarms(alarms.filter((alarm) => alarm.id !== id));
      };

      const handleToggleAlarm = (id: string) => {
        setAlarms(
          alarms.map((alarm) =>
            alarm.id === id ? { ...alarm, isActive: !alarm.isActive } : alarm
          )
        );
      };

      return (
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-20"></div>
            
            <div className="relative max-w-2xl mx-auto p-6">
              <Header />

              <Routes>
                <Route path="/" element={
                  <HomePage
                    alarms={alarms}
                    onDelete={handleDeleteAlarm}
                    onToggle={handleToggleAlarm}
                  />
                } />
                <Route path="/settings" element={
                  <SettingsPage
                    alarms={alarms}
                    onAddAlarm={handleAddAlarm}
                    onDelete={handleDeleteAlarm}
                    onToggle={handleToggleAlarm}
                  />
                } />
              </Routes>

              {alarmState.isRinging && questions.length > 0 && (
                <QuestionModal
                  question={questions[alarmState.currentQuestionIndex]}
                  onAnswer={handleAnswer}
                  totalQuestions={alarmState.currentAlarm?.questionCount || 0}
                  currentQuestion={alarmState.questionsAnswered + 1}
                />
              )}
            </div>
          </div>
        </Router>
      );
    }
