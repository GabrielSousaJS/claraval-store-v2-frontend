import "./assets/styles/custom.scss";
import "./index.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ContextSearch } from "./utils/context-search";
import { useEffect, useState } from "react";
import { AccessTokenPayloadDTO } from "./models/auth";
import { ContextToken } from "./utils/context-token";
import { ContextCartCount } from "./utils/context-cart";
import ClientHome from "./routes/ClientHome";
import Catalog from "./routes/ClientHome/Catalog";
import ProductDetails from "./routes/ClientHome/ProductDetails";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import UserProfile from "./routes/ClientHome/UserProfile";
import UserPanel from "./routes/ClientHome/UserProfile/UserPanel";
import UserOrder from "./routes/ClientHome/UserProfile/UserOrder";
import UserAddress from "./routes/ClientHome/UserProfile/UserAddress";
import UserAccount from "./routes/ClientHome/UserProfile/UserAccount";
import Cart from "./routes/ClientHome/Cart";
import PrivateRoute from "./components/PrivateRoute";
import * as authService from "./services/auth-service";

function App() {
  const [contextTokenPayload, setContextTokenPayload] =
    useState<AccessTokenPayloadDTO>();

  useEffect(() => {
    if (authService.isAuthenticated())
      setContextTokenPayload(authService.getAccessTokenPayload());
  }, []);

  const [contextCartCount, setContextCartCount] = useState<number>(0);

  const [contextSearch, setContextSearch] = useState<string>("");

  return (
    <ContextToken.Provider
      value={{ contextTokenPayload, setContextTokenPayload }}
    >
      <ContextCartCount.Provider
        value={{ contextCartCount, setContextCartCount }}
      >
        <ContextSearch.Provider value={{ contextSearch, setContextSearch }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ClientHome />}>
                <Route index element={<Navigate to="/catalog" />} />
                <Route path="catalog" element={<Catalog />} />
                <Route path="catalog/:categoryId" element={<Catalog />} />
                <Route path="details/:productId" element={<ProductDetails />} />
                <Route
                  path="profile"
                  element={
                    <PrivateRoute>
                      <UserProfile />
                    </PrivateRoute>
                  }
                >
                  <Route index element={<Navigate to="panel" />} />
                  <Route path="panel" element={<UserPanel />} />
                  <Route path="orders" element={<UserOrder />} />
                  <Route path="address" element={<UserAddress />} />
                  <Route path="account" element={<UserAccount />} />
                </Route>
                <Route
                  path="cart"
                  element={
                    <PrivateRoute>
                      <Cart />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </BrowserRouter>
        </ContextSearch.Provider>
      </ContextCartCount.Provider>
    </ContextToken.Provider>
  );
}

export default App;
