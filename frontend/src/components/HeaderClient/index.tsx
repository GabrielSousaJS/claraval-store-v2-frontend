import "./styles.css";

import togglerIcon from "../../assets/icons/togglerIcon.svg";
import logo from "../../assets/images/logo.png";
import SearchBar from "./SearchBar";
import MenuBar from "./MenuBar";
import { useState } from "react";
import { Link } from "react-router-dom";

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
        <div className="container-logo">
          <Link to={"/"}>
            <img src={logo} alt="Logo da empresa" />
          </Link>
        </div>

        <SearchBar />

        <button
          className="navbar-toggler shadow-none border-0 p-0"
          type="button"
          onClick={handleMenuBarOpen}
        >
          <img src={togglerIcon} />
        </button>
      </div>

      {menuBar && <MenuBar onMenuBarClose={handleMenuBarClose} />}
    </header>
  );
}
