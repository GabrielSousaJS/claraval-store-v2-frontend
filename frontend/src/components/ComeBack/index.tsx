import "./styles.css";

import backIcon from "../../assets/icons/backIcon.svg";
import { useNavigate } from "react-router-dom";

export default function ComeBack() {
  const navigate = useNavigate();

  return (
    <div
      className="d-inline-flex text-primary back-container"
      onClick={() => navigate(-1)}
    >
      <img src={backIcon} alt="Voltar" />
      <h3 className="uppercase ps-2">Voltar</h3>
    </div>
  );
}
