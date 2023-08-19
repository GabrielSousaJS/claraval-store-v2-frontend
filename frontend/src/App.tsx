import "./assets/styles/custom.scss";
import "./index.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ClientHome from "./routes/ClientHome";
import Catalog from "./routes/ClientHome/Catalog";
import ProductDetails from "./routes/ClientHome/ProductDetails";
import { ContextSearch } from "./utils/context-search";
import { useState } from "react";
import Login from "./routes/Login";

function App() {
  const [contextSearch, setContextSearch] = useState<string>("");

  return (
    <ContextSearch.Provider value={{ contextSearch, setContextSearch }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientHome />}>
            <Route index element={<Navigate to="/catalog" />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="catalog/:categoryId" element={<Catalog />} />
            <Route path="details/:productId" element={<ProductDetails />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </ContextSearch.Provider>
  );
}

export default App;
