import React, { useState, useCallback } from 'react';
    import { Mic, MicOff } from 'lucide-react';
    import type { Question } from '../types';
    import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

    interface QuestionModalProps {
      question: Question;
      onAnswer: (isCorrect: boolean) => void;
      totalQuestions: number;
      currentQuestion: number;
    }

    export default function QuestionModal({
      question,
      onAnswer,
      totalQuestions,
      currentQuestion
    }: QuestionModalProps) {
      const [selectedAnswer, setSelectedAnswer] = useState('');
      const [showError, setShowError] = useState(false);
      const [voiceError, setVoiceError] = useState('');

      const handleVoiceResult = useCallback((transcript: string) => {
        const matchedOption = question.options.find(option =>
          option.toLowerCase().includes(transcript) ||
          transcript.includes(option.toLowerCase())
        );

        if (matchedOption) {
          setSelectedAnswer(matchedOption);
          setTimeout(() => {
            const isCorrect = matchedOption === question.correctAnswer;
            if (!isCorrect) {
              setShowError(true);
              setTimeout(() => setShowError(false), 1000);
            }
            onAnswer(isCorrect);
            setSelectedAnswer('');
          }, 1000);
        } else {
          setVoiceError("Didn't catch that. Please try again or use the buttons.");
          setTimeout(() => setVoiceError(''), 3000);
        }
      }, [question.options, question.correctAnswer, onAnswer]);

      const { isListening, startListening, stopListening, isSupported } = useSpeechRecognition({
        onResult: handleVoiceResult,
        onError: (error) => {
          //Improved error handling: Show alert to the user
          alert(`Microphone error: ${error}`);
          console.error('Microphone error:', error);
        }
      });

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isCorrect = selectedAnswer === question.correctAnswer;

        if (!isCorrect) {
          setShowError(true);
          setTimeout(() => setShowError(false), 1000);
        }

        onAnswer(isCorrect);
        setSelectedAnswer('');
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Wake Up Challenge!</h2>
                {isSupported && (
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`p-2 rounded-full transition-colors ${
                      isListening
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                    title={isListening ? 'Stop voice input' : 'Start voice input'}
                  >
                    {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Question {currentQuestion} of {totalQuestions}
              </p>
              {isListening && (
                <p className="text-sm text-blue-600 mt-2 animate-pulse">
                  Listening... Speak your answer
                </p>
              )}
              {voiceError && (
                <p className="text-sm text-red-500 mt-2">{voiceError}</p>
              )}
            </div>

            <p className="text-gray-700 mb-4">{question.question}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {question.options.map((option) => (
                <label
                  key={option}
                  className={`block p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors
                    ${selectedAnswer === option ? 'border-blue-500 bg-blue-50' : ''}
                    ${showError && selectedAnswer === option ? 'bg-red-50 border-red-300' : ''}`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}

              <button
                type="submit"
                disabled={!selectedAnswer}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
              >
                Submit Answer
              </button>
            </form>
          </div>
        </div>
      );
    }
