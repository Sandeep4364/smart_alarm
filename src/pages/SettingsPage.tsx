import React from 'react';
    import type { Alarm } from '../types';
    import AlarmForm from '../components/AlarmForm';
    import AlarmList from '../components/AlarmList';
    import { useNavigate } from 'react-router-dom';

    interface SettingsPageProps {
      alarms?: Alarm[];
      onAddAlarm: (alarm: Omit<Alarm, 'id'>) => void;
      onDelete: (id: string) => void;
      onToggle: (id: string) => void;
    }

    export default function SettingsPage({
      alarms = [],
      onAddAlarm,
      onDelete,
      onToggle,
    }: SettingsPageProps) {
      const navigate = useNavigate();

      return (
        <div className="space-y-6">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md mb-4"
          >
            Back to Alarms
          </button>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Add New Alarm</h2>
            <AlarmForm onSubmit={onAddAlarm} />
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Your Alarms</h2>
            <AlarmList
              alarms={alarms}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          </div>
        </div>
      );
    }
