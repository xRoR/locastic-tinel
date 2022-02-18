import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Checkout from './components/checkout/Checkout';
import { RootStore } from './models/root-store';
import { RootStoreProvider } from './models/store-context';
import { setupRootStore } from './models/store-setup';
import { WindowWidthProvider } from './utils/useWindowWidth';
import CategoryPage from './views/CategoryPage';
import NotFound from './views/NotFound';
import WorkshopPage from './views/WorkshopPage';

function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      setupRootStore().then(setRootStore);
    }

    fetchData();
  }, []);

  if (!rootStore) return null;

  return (
    <RootStoreProvider value={rootStore}>
      <WindowWidthProvider>
        <div className="App">
          <Routes>
            <Route index element={<CategoryPage />} />
            <Route path="workshop/:id" element={<WorkshopPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Checkout />
        </div>
      </WindowWidthProvider>
    </RootStoreProvider>
  );
}

export default App;
