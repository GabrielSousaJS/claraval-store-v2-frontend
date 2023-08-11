import "./assets/styles/custom.scss";
import "./index.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ClientHome from "./routes/ClientHome";
import Catalog from "./routes/ClientHome/Catalog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientHome />}>
            <Route index element={<Navigate to="/catalog" />} />
            <Route path="catalog" element={<Catalog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
