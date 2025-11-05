import React, { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import SetupForm from './components/SetupForm.jsx';
import StatusLog from './components/StatusLog.jsx';
import UpdatedRows from './components/UpdatedRows.jsx';
import { Play, ExternalLink } from 'lucide-react';

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

  const [logs, setLogs] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const athleteValid = useMemo(() => isValidUrl(athleteUrl), [athleteUrl]);
  const sheetValid = useMemo(() => isValidUrl(sheetUrl), [sheetUrl]);

  const addLog = (type, message) => {
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setLogs((prev) => [
      { id: `${now.getTime()}-${Math.random().toString(36).slice(2, 6)}`, type, date, message },
      ...prev,
    ]);
  };

  const handleLiveRun = async () => {
    if (!athleteValid || !sheetValid) {
      addLog('warning', "Action bloquée: fournissez des URLs valides pour le profil et la feuille.");
      return;
    }

    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/live-update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          athlete_url: athleteUrl,
          sheet_url: sheetUrl,
          sheet_tab: sheetTab || 'Feuille',
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const detail = errorData?.detail || res.statusText;
        addLog('warning', `Échec de la mise à jour: ${detail}`);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setRows(data.rows || []);
      if (data.updated_count > 0) {
        addLog('success', data.message || 'Mise à jour effectuée avec succès.');
      } else {
        addLog('info', 'Aucun changement détecté lors de cette exécution.');
      }
    } catch (e) {
      addLog('warning', `Erreur réseau: ${(e && e.message) || 'inconnue'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenFile = () => {
    if (!sheetValid) {
      addLog('warning', 'URL Google Sheets invalide ou absente.');
      return;
    }
    try {
      window.open(sheetUrl, '_blank', 'noopener,noreferrer');
      addLog('info', 'Ouverture de la feuille Google dans un nouvel onglet.');
    } catch (e) {
      addLog('warning', "Impossible d'ouvrir la feuille. Vérifiez votre navigateur ou le lien.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-50">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="mb-8 rounded-2xl border border-indigo-100 bg-white/70 p-6 shadow-sm backdrop-blur">
          <h2 className="text-lg font-semibold text-gray-900">Automatisation hebdomadaire des meilleurs temps</h2>
          <p className="mt-1 text-sm text-gray-600">
            Configurez la source Swimrankings et la feuille Google à tenir à jour. Lancez une « Mise à jour en direct » pour synchroniser.
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

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Actions rapides</h3>
                  <p className="text-sm text-gray-500">Exécutez une synchronisation à la demande ou ouvrez la feuille</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleLiveRun}
                    disabled={!athleteValid || !sheetValid || loading}
                    className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium shadow-sm transition ${
                      athleteValid && sheetValid && !loading
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-indigo-200 text-white cursor-not-allowed'
                    }`}
                  >
                    <Play className="h-4 w-4" />
                    {loading ? 'Exécution…' : 'Mise à jour en direct'}
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenFile}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Ouvrir la feuille
                  </button>
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-3 text-xs text-gray-600">
                {loading ? 'Exécution en cours…' : "Astuce: vous pouvez lancer une exécution manuelle à tout moment pour vérifier les dernières performances et mettre à jour la feuille."}
              </div>
            </section>

            <UpdatedRows rows={rows} />
          </div>

          <div className="space-y-6">
            <StatusLog logs={logs} />
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
              </ul>
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
