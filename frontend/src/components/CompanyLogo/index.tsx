import "./styles.css";

import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

export default function CompanyLogo() {
  return (
    <div className="container-logo">
      <Link to={"/"}>
        <img src={logo} alt="Logo da empresa" />
      </Link>
    </div>
  );
}
