import "./styles.css";

import NavButton from "./NavButton";
import logo from "../../assets/images/logo.png";
import SearchBar from "./SearchBar";

export default function HeaderClient() {
  return (
    <header className="bg-primary">
      <div className="container d-flex justify-content-between align-items-center pt-4 pb-4 ps-1 pe-1">
        <div className="container-logo">
          <a href="/" className="d-flex justify-content-around">
            <img src={logo} alt="Logo da empresa" />
          </a>
        </div>

        <SearchBar />

        <NavButton />
      </div>
    </header>
  );
}
