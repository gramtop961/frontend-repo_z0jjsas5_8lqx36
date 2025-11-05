import React from 'react';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const IconByType = ({ type }) => {
  if (type === 'success') return <CheckCircle2 className="h-4 w-4 text-green-600" />;
  if (type === 'warning') return <AlertCircle className="h-4 w-4 text-amber-600" />;
  return <Clock className="h-4 w-4 text-gray-500" />;
};

const StatusLog = ({ logs = [] }) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <div className="h-9 w-9 rounded-lg bg-indigo-50 text-indigo-600 grid place-items-center">
          <Clock className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Historique des exécutions</h2>
          <p className="text-sm text-gray-500">Un aperçu des dernières vérifications</p>
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
          Aucune exécution pour l'instant. Lancez une « Mise à jour en direct » pour simuler une mise à jour.
        </div>
      ) : (
        <ul className="space-y-3">
          {logs.map((log) => (
            <li key={log.id} className="flex items-start gap-3 rounded-lg border border-gray-200 p-3">
              <IconByType type={log.type} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{log.date}</span>
                  <span className={`text-xs ${
                    log.type === 'success' ? 'text-green-700' : log.type === 'warning' ? 'text-amber-700' : 'text-gray-600'
                  }`}>
                    {log.type === 'success' ? 'Succès' : log.type === 'warning' ? 'Avertissement' : 'Info'}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-800">{log.message}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default StatusLog;
