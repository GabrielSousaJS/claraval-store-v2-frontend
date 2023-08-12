import "./styles.css";

import backIcon from "../../assets/icons/backIcon.svg";

export default function ComeBack() {
  return (
    <div className="d-inline-flex text-primary back-container">
      <img src={backIcon} alt="Voltar" />
      <h3 className="uppercase ps-2">Voltar</h3>
    </div>
  );
}
