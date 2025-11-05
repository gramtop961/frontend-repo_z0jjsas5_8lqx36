import React, { useMemo } from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

const SchedulerPanel = ({ enabled, setEnabled, weekday, setWeekday, time, setTime, athleteValid, sheetValid }) => {
  const canActivate = useMemo(() => enabled ? athleteValid && sheetValid : true, [enabled, athleteValid, sheetValid]);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <div className="h-9 w-9 rounded-lg bg-indigo-50 text-indigo-600 grid place-items-center">
          <Clock className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Planification</h2>
          <p className="text-sm text-gray-500">Contrôle et mise à jour hebdomadaire automatiques</p>
        </div>
      </div>

      <div className="flex flex-col gap-5 md:flex-row md:items-end">
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">Jour</label>
          <select
            value={weekday}
            onChange={(e) => setWeekday(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="monday">Lundi</option>
            <option value="tuesday">Mardi</option>
            <option value="wednesday">Mercredi</option>
            <option value="thursday">Jeudi</option>
            <option value="friday">Vendredi</option>
            <option value="saturday">Samedi</option>
            <option value="sunday">Dimanche</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Heure</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-40 rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            disabled={!canActivate}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium shadow-sm transition ${
              enabled
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            } ${!canActivate ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {enabled ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
            {enabled ? 'Planification activée' : 'Activer la planification'}
          </button>
          {!canActivate && (
            <div className="flex items-center gap-1 text-xs text-amber-600">
              <AlertCircle className="h-4 w-4" />
              Complétez d'abord les URLs valides
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
        Astuce: le service vérifiera chaque semaine si de nouveaux meilleurs temps sont disponibles, mettra à jour la feuille et mettra en surbrillance les nouvelles performances pendant 4 semaines.
      </div>
    </section>
  );
};

export default SchedulerPanel;
