import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import { RootStore } from "./models/root-store";
import { RootStoreProvider } from "./models/store-context";
import { setupRootStore } from "./models/store-setup";
import CategoryPage from './views/CategoryPage';
import NotFound from './views/NotFound';
import WorkshopPage from './views/WorkshopPage';

function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  useEffect(() => {
    async function fetchData() {
      setupRootStore().then(setRootStore)
    }

    fetchData()
  }, []);

  if (!rootStore) return null

  return (
    <RootStoreProvider value={rootStore}>
      <div className="App">
        <Routes>
          <Route index element={<CategoryPage />} />
          <Route path="workshop/:id" element={<WorkshopPage />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
        <Cart />
        <Checkout />
      </div>
    </RootStoreProvider>
  );
}

export default App;
