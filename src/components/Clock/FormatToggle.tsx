import React from 'react';
import { Clock } from 'lucide-react';

interface FormatToggleProps {
  is24Hour: boolean;
  onToggle: () => void;
}

export default function FormatToggle({ is24Hour, onToggle }: FormatToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
    >
      <Clock size={16} />
      <span className="text-sm font-medium">
        {is24Hour ? '24h' : '12h'}
      </span>
    </button>
  );
}
