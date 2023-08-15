import "./assets/styles/custom.scss";
import "./index.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ClientHome from "./routes/ClientHome";
import Catalog from "./routes/ClientHome/Catalog";
import ProductDetails from "./routes/ClientHome/ProductDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientHome />}>
            <Route index element={<Navigate to="/catalog" />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="catalog/:categoryId" element={<Catalog />} />
            <Route path="details/:productId" element={<ProductDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
