import togglerIcon from "../../assets/icons/togglerIcon.svg";
import SearchBar from "./SearchBar";
import MenuBar from "./MenuBar";
import { useState } from "react";
import CompanyLogo from "../CompanyLogo";
import cartIcon from "../../assets/icons/cartIcon.svg";
import { Link } from "react-router-dom";
import CartIcon from "../CartIcon";

export default function HeaderClient() {
  const [menuBar, setMenuBar] = useState(false);

  function handleMenuBarOpen() {
    setMenuBar(true);
  }

  function handleMenuBarClose() {
    setMenuBar(false);
  }

  return (
    <header className="bg-primary">
      <div className="container d-flex justify-content-between align-items-center pt-4 pb-4 ps-1 pe-1">
        <CompanyLogo />

        <SearchBar />

        <div className="d-flex">
          <Link to="/cart" className="me-4">
            <div className="d-flex align-items-center">
              <CartIcon />
            </div>
          </Link>

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
    </header>
  );
}
