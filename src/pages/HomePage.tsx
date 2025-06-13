import React from 'react';
    import type { Alarm } from '../types';
    import AlarmList from '../components/AlarmList';

    interface HomePageProps {
      alarms: Alarm[];
      onDelete: (id: string) => void;
      onToggle: (id: string) => void;
    }

    export default function HomePage({ alarms, onDelete, onToggle }: HomePageProps) {
      return (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Your Alarms</h2>
          <AlarmList
            alarms={alarms}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        </div>
      );
    }
