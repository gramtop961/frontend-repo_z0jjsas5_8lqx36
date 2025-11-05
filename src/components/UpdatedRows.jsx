import React from 'react';
import { Check, ArrowDownRight } from 'lucide-react';

const UpdatedRows = ({ rows = [] }) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-9 w-9 rounded-lg bg-green-50 text-green-600 grid place-items-center">
          <Check className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Lignes mises à jour</h2>
          <p className="text-sm text-gray-500">Dernières améliorations détectées</p>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
          Aucune ligne modifiée pour l'instant. Lancez une mise à jour pour voir les résultats ici.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-gray-500">#</th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Épreuve</th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Ancien</th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Nouveau</th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Écart</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {rows.map((r) => (
                <tr key={r.row_number}>
                  <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-600">{r.row_number}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-900">{r.event}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-700">{r.date}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-700">{r.old_time || '—'}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-900">{r.new_time}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-sm font-medium text-green-700 flex items-center gap-1">
                    <ArrowDownRight className="h-4 w-4" />
                    {r.delta || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default UpdatedRows;
