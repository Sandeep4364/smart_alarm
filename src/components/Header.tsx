import React from 'react';
    import { Bell } from 'lucide-react';
    import LiveTime from './LiveTime';
    import { Link } from 'react-router-dom';

    export default function Header() {
      return (
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-between w-full px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg mb-4">
            <div className="flex items-center">
              <Bell className="text-blue-500 w-8 h-8 mr-2" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Smart Wake
              </h1>
            </div>
            <Link to="/settings" className="text-blue-500 hover:text-blue-700">
              Settings
            </Link>
          </div>
          <LiveTime />
        </div>
      );
    }
