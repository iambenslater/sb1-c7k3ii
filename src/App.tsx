import React from 'react';
import { Header } from './components/Header';
import { StaffNameInput } from './components/StaffNameInput';
import { StockForm } from './components/StockForm';
import { StockList } from './components/StockList';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AppState, StockEntry } from './types';

const initialState: AppState = {
  staffName: '',
  entries: [],
  isOffline: !navigator.onLine,
  pendingSync: [],
};

function App() {
  const [state, setState] = useLocalStorage<AppState>('tree-co-stock', initialState);

  React.useEffect(() => {
    const handleOnline = () => setState(s => ({ ...s, isOffline: false }));
    const handleOffline = () => setState(s => ({ ...s, isOffline: true }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setState]);

  const handleStaffNameSubmit = (name: string) => {
    setState(s => ({ ...s, staffName: name }));
  };

  const handleStockSubmit = (entry: Omit<StockEntry, 'id' | 'timestamp'>) => {
    const newEntry: StockEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };

    setState(s => ({
      ...s,
      entries: [...s.entries, newEntry],
      pendingSync: s.isOffline ? [...s.pendingSync, newEntry] : s.pendingSync,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {state.isOffline && (
        <div className="bg-yellow-50 p-2 text-center text-sm text-yellow-800">
          You're currently offline. Data will be synced when connection is restored.
        </div>
      )}

      {!state.staffName ? (
        <StaffNameInput onSubmit={handleStaffNameSubmit} />
      ) : (
        <main className="container mx-auto max-w-lg pb-8">
          <StockForm onSubmit={handleStockSubmit} staffName={state.staffName} />
          <StockList entries={state.entries} />
        </main>
      )}
    </div>
  );
}

export default App;