import "./styles.css";

import togglerIcon from "../../assets/icons/togglerIcon.svg";
import SearchBar from "./SearchBar";
import MenuBar from "./MenuBar";
import CompanyLogo from "../CompanyLogo";
import CartIcon from "../CartIcon";
import adminIcon from "../../assets/icons/adminIcon.svg";
import searchIcon from "../../assets/icons/searchIcon.svg";
import SearchModal from "./SearchModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as authService from "../../services/auth-service";

export default function HeaderClient() {
  const [menuBar, setMenuBar] = useState(false);

  const [searchBar, setSearchBar] = useState(false);

  function handleMenuBarOpen() {
    setMenuBar(true);
  }

  function handleMenuBarClose() {
    setMenuBar(false);
  }

  function handleSearchBarOpen() {
    setSearchBar(true);
  }

  function handleSearchBarClose() {
    setSearchBar(false);
  }

  return (
    <header className="bg-primary">
      <div className="container d-flex justify-content-between align-items-center pt-4 pb-4 ps-2 pe-2">
        <div className="company-logo-container">
          <CompanyLogo profile="/" />
        </div>

        <div className="search-bar-container">
          <SearchBar />
        </div>

        <div onClick={handleSearchBarOpen} className="search-button-container">
          <img src={searchIcon} alt="Pesquisar" />
        </div>

        <div className="d-flex buttons-container">
          {authService.isAuthenticated() &&
            authService.hasAnyRole(["ROLE_ADMIN"]) && (
              <Link to="/admin" className="me-4 display-control">
                <div className="d-flex align-items-center">
                  <img src={adminIcon} alt="Área administrativa" />
                </div>
              </Link>
            )}

          {authService.isAuthenticated() && (
            <Link to="/cart" className="me-4 display-control">
              <div className="d-flex align-items-center">
                <CartIcon />
              </div>
            </Link>
          )}

          <button
            className="navbar-toggler shadow-none border-0 p-0"
            type="button"
            onClick={handleMenuBarOpen}
          >
            <img src={togglerIcon} />
          </button>
        </div>
      </div>

      {menuBar && <MenuBar onMenuBarClose={handleMenuBarClose} />}
      {searchBar && <SearchModal onSearchModalClose={handleSearchBarClose} />}
    </header>
  );
}
