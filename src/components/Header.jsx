import React from 'react';
import { Rocket, Settings } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full border-b border-gray-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-indigo-600 text-white grid place-items-center shadow-sm">
            <Rocket className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">SwimRank Updater</h1>
            <p className="text-sm text-gray-500">Automatisez la mise à jour hebdomadaire de vos meilleurs temps</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
          <Settings className="h-4 w-4" />
          Préférences
        </button>
      </div>
    </header>
  );
};

export default Header;
