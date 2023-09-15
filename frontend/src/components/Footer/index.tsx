import "./styles.css";

import companyLogo from "../../assets/images/logo.png";
import gitHub from "../../assets/images/github.png";

export default function Footer() {
  function handleClick() {
    scrollTo(0, 0);
  }

  return (
    <footer className="bg-primary ps-2 pe-2 pt-3 pb-3">
      <div className="container">
        <div className="row">
          <div
            className="col-md-6 pb-4 logo-container-footer"
            onClick={handleClick}
          >
            <img src={companyLogo} alt="Logo da empresa" />
          </div>
          <div className="col-md-6 d-flex align-items-center pb-4 logo-github-footer">
            <a
              href="https://github.com/GabrielSousaJS"
              className="d-flex align-items-center text-light text-footer"
            >
              <img src={gitHub} alt="Logo GitHub" className="pe-3" />
              <span>Gabriel Santos</span>
            </a>
          </div>
          <div className="col-md-6 text-light pb-4 text-footer">
            <span>Claraval Serviços de Varejo do Brasil Ltda.</span>
          </div>
          <div className="col-md-6 text-light text-footer">
            <span>
              Av. Getúlio Vargas, Torre E, 18° andar - Luziânia, CEP 72821-011
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
