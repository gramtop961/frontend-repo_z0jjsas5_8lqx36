import React, { useMemo } from 'react';
import { User, Link as LinkIcon } from 'lucide-react';

const isValidUrl = (str) => {
  try {
    const u = new URL(str);
    return !!u.protocol && !!u.host;
  } catch {
    return false;
  }
};

const SetupForm = ({ athleteUrl, setAthleteUrl, sheetUrl, setSheetUrl, sheetTab, setSheetTab }) => {
  const athleteValid = useMemo(() => isValidUrl(athleteUrl), [athleteUrl]);
  const sheetValid = useMemo(() => isValidUrl(sheetUrl), [sheetUrl]);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <div className="h-9 w-9 rounded-lg bg-indigo-50 text-indigo-600 grid place-items-center">
          <User className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Configuration</h2>
          <p className="text-sm text-gray-500">Renseignez le profil et la feuille de calcul à mettre à jour</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">URL du profil nageur·euse (Swimrankings)</label>
          <div className="relative">
            <input
              type="url"
              placeholder="https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=..."
              value={athleteUrl}
              onChange={(e) => setAthleteUrl(e.target.value)}
              className={`w-full rounded-lg border px-3 py-2.5 pr-9 text-sm outline-none transition ${
                athleteUrl.length === 0
                  ? 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                  : athleteValid
                  ? 'border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-100'
                  : 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              }`}
            />
            <LinkIcon className="pointer-events-none absolute right-2.5 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-xs text-gray-500">Exemple: https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4982954</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">URL Google Sheets</label>
          <div className="relative">
            <input
              type="url"
              placeholder="https://docs.google.com/spreadsheets/d/..."
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              className={`w-full rounded-lg border px-3 py-2.5 pr-9 text-sm outline-none transition ${
                sheetUrl.length === 0
                  ? 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                  : sheetValid
                  ? 'border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-100'
                  : 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              }`}
            />
            <LinkIcon className="pointer-events-none absolute right-2.5 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-xs text-gray-500">Collez le lien de la feuille à mettre à jour automatiquement.</p>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">Nom de l'onglet dans la feuille</label>
          <input
            type="text"
            placeholder="Ex: MPP Alessia"
            value={sheetTab}
            onChange={(e) => setSheetTab(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>
    </section>
  );
};

export default SetupForm;
