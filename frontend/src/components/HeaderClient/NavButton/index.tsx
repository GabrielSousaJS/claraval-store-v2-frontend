import "./styles.css";

import "@popperjs/core";
import "bootstrap/js/src/collapse";
import togglerIcon from "../../../assets/icons/togglerIcon.svg";

export default function NavButton() {
  return (
    <nav className="navbar navbar-dark justify-content-end">
      <button
        className="navbar-toggler shadow-none border-0 p-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#claraval-navbar"
        aria-controls="claraval-navbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <img src={togglerIcon} />
      </button>

      <div className="collapse navbar-collapse" id="claraval-navbar">
        <ul className="navbar-nav text-light">
          <li className="text-end text-uppercase fw-bold pt-3 font-size-li">
            <a href="#">Eletrônicos</a>
          </li>
          <li className="text-end text-uppercase fw-bold pt-3 font-size-li">
            <a href="#">Vestuário</a>
          </li>
          <li className="text-end text-uppercase fw-bold pt-3 font-size-li">
            <a href="#">Brinquedos e jogos</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
