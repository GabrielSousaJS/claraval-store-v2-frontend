import "./assets/styles/custom.scss";
import "./index.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ContextSearch } from "./utils/context-search";
import { useEffect, useState } from "react";
import { AccessTokenPayloadDTO } from "./models/auth";
import { ContextToken } from "./utils/context-token";
import { ContextCartCount } from "./utils/context-cart";
import { OrderDetails } from "./routes/ClientHome/UserProfile/OrderDetails";
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
import Admin from "./routes/Admin";
import AdminHome from "./routes/Admin/AdminHome";
import Resources from "./routes/Admin/Resources";
import Products from "./routes/Admin/Resources/Products";
import ProductListing from "./routes/Admin/Resources/Products/ProductListing";
import * as authService from "./services/auth-service";
import ProductForm from "./routes/Admin/Resources/Products/ProductForm";
import Categories from "./routes/Admin/Resources/Categories";
import CategoryListing from "./routes/Admin/Resources/Categories/CategoryListing";
import CategoryForm from "./routes/Admin/Resources/Categories/CategoryForm";
import Orders from "./routes/Admin/Resources/Orders";
import OrderListing from "./routes/Admin/Resources/Orders/OrderListing";

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
                  <Route path="orders/:orderId" element={<OrderDetails />} />
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
              <Route path="admin" element={<Admin />}>
                <Route index element={<Navigate to={"/admin/home"} />} />
                <Route path="home" element={<AdminHome />} />
                <Route path="resources" element={<Resources />}>
                  <Route index element={<Navigate to="products" />} />
                  <Route path="products" element={<Products />}>
                    <Route index element={<Navigate to="list" />} />
                    <Route path="list" element={<ProductListing />} />
                    <Route
                      path="/admin/resources/products/:productId"
                      element={<ProductForm />}
                    />
                  </Route>
                  <Route path="categories" element={<Categories />}>
                    <Route index element={<Navigate to="list" />} />
                    <Route path="list" element={<CategoryListing />} />
                    <Route
                      path="/admin/resources/categories/:categoryId"
                      element={<CategoryForm />}
                    />
                  </Route>
                  <Route path="orders" element={<Orders />}>
                    <Route index element={<Navigate to="list" />} />
                    <Route path="list" element={<OrderListing />} />
                  </Route>
                  <Route path="users" element={<h1>Users</h1>} />
                  <Route path="admins" element={<h1>Admins</h1>} />
                </Route>
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
