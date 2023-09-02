import "./styles.css";

import CompanyLogo from "../CompanyLogo";
import bagIcon from "../../assets/icons/bagIcon.svg";
import { Link } from "react-router-dom";

export default function HeaderAdmin() {
  return (
    <header className="bg-tertiary pt-4 pb-4 ps-1 pe-1">
      <div className="container d-flex justify-content-between align-items-center">
        <CompanyLogo />
        <Link to="/">
          <img src={bagIcon} alt="Sacola" />
        </Link>
      </div>
    </header>
  );
}
