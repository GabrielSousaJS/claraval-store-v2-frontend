import "./styles.css";

import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

type Props = {
  profile: string;
};

export default function CompanyLogo({ profile }: Props) {
  return (
    <div className="container-logo">
      <Link to={profile}>
        <img src={logo} alt="Logo da empresa" />
      </Link>
    </div>
  );
}
