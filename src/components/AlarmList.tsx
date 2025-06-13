import React from 'react';
    import { Clock, Trash2 } from 'lucide-react';
    import type { Alarm } from '../types';

    interface AlarmListProps {
      alarms: Alarm[];
      onDelete: (id: string) => void;
      onToggle: (id: string) => void;
    }

    export default function AlarmList({ alarms, onDelete, onToggle }: AlarmListProps) {
      return (
        <div className="space-y-4">
          {Array.isArray(alarms) && alarms.map((alarm) => (
            <div
              key={alarm.id}
              className="bg-white rounded-lg p-4 shadow-md flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <Clock className={alarm.isActive ? 'text-blue-500' : 'text-gray-400'} />
                <div>
                  <p className="text-lg font-semibold">{alarm.time}</p>
                  <p className="text-sm text-gray-500">
                    {alarm.questionCount} questions • {alarm.difficulty}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={alarm.isActive}
                    onChange={() => onToggle(alarm.id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
                <button
                  onClick={() => onDelete(alarm.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }
