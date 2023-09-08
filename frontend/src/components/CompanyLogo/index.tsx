import "./styles.css";

import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContextSearch } from "../../utils/context-search";

type Props = {
  profile: string;
};

export default function CompanyLogo({ profile }: Props) {
  const { setContextSearch } = useContext(ContextSearch);

  function clearSearch() {
    if (profile === "/") setContextSearch("");
  }

  return (
    <div onClick={clearSearch} className="container-logo">
      <Link to={profile}>
        <img src={logo} alt="Logo da empresa" />
      </Link>
    </div>
  );
}
