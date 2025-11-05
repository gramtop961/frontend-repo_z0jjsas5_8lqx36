import React, { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import SetupForm from './components/SetupForm.jsx';
import SchedulerPanel from './components/SchedulerPanel.jsx';
import StatusLog from './components/StatusLog.jsx';

const isValidUrl = (str) => {
  try {
    const u = new URL(str);
    return !!u.protocol && !!u.host;
  } catch {
    return false;
  }
};

function App() {
  const [athleteUrl, setAthleteUrl] = useState('https://www.swimrankings.net/index.php?page=athleteDetail&athleteId=4982954');
  const [sheetUrl, setSheetUrl] = useState('https://docs.google.com/spreadsheets/d/16eshLmn_ZI06iqt4mPQs1PPmRBMI2eWUrPr_OHnK7Gg/edit?gid=2117770580');
  const [sheetTab, setSheetTab] = useState('MPP Alessia');

  const [enabled, setEnabled] = useState(false);
  const [weekday, setWeekday] = useState('monday');
  const [time, setTime] = useState('06:00');

  const athleteValid = useMemo(() => isValidUrl(athleteUrl), [athleteUrl]);
  const sheetValid = useMemo(() => isValidUrl(sheetUrl), [sheetUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-50">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="mb-8 rounded-2xl border border-indigo-100 bg-white/70 p-6 shadow-sm backdrop-blur">
          <h2 className="text-lg font-semibold text-gray-900">Automatisation hebdomadaire des meilleurs temps</h2>
          <p className="mt-1 text-sm text-gray-600">
            Cette interface vous permet de configurer une tâche qui vérifie chaque semaine les meilleures performances sur Swimrankings
            et met à jour votre feuille Google, en mettant en évidence les nouveaux temps pendant 4 semaines.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <SetupForm
              athleteUrl={athleteUrl}
              setAthleteUrl={setAthleteUrl}
              sheetUrl={sheetUrl}
              setSheetUrl={setSheetUrl}
              sheetTab={sheetTab}
              setSheetTab={setSheetTab}
            />

            <SchedulerPanel
              enabled={enabled}
              setEnabled={setEnabled}
              weekday={weekday}
              setWeekday={setWeekday}
              time={time}
              setTime={setTime}
              athleteValid={athleteValid}
              sheetValid={sheetValid}
            />
          </div>

          <div className="space-y-6">
            <StatusLog />
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-gray-900">Résumé</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>
                  Profil: {athleteValid ? (
                    <a className="text-indigo-600 hover:underline" href={athleteUrl} target="_blank" rel="noreferrer">valide</a>
                  ) : (
                    <span className="text-amber-700">non défini</span>
                  )}
                </li>
                <li>
                  Feuille: {sheetValid ? (
                    <a className="text-indigo-600 hover:underline" href={sheetUrl} target="_blank" rel="noreferrer">valide</a>
                  ) : (
                    <span className="text-amber-700">non définie</span>
                  )}
                </li>
                <li>Onglet: <span className="font-medium">{sheetTab || '—'}</span></li>
                <li>
                  Planification: {enabled ? (
                    <span className="text-green-700">activée ({weekday}, {time})</span>
                  ) : (
                    <span className="text-gray-600">désactivée</span>
                  )}
                </li>
              </ul>
              <div className="mt-4 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-3 text-xs text-gray-600">
                Remarque: cette démo présente l'interface. L'exécution réelle s'appuiera sur un service côté serveur pour lire Swimrankings et écrire dans Google Sheets de manière sécurisée.
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-4 text-center text-xs text-gray-500">
        Construite pour automatiser la mise à jour des meilleurs temps de natation – hebdomadaire.
      </footer>
    </div>
  );
}

export default App;
