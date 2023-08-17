import "./styles.css";

import backIcon from "../../assets/icons/backIcon.svg";
import { useNavigate } from "react-router-dom";
import { ContextSearch } from "../../utils/context-search";
import { useContext } from "react";

type Props = {
  clearSearch: boolean;
};

export default function ComeBack({ clearSearch }: Props) {
  const { setContextSearch } = useContext(ContextSearch);

  const navigate = useNavigate();

  function handleComeBack() {
    if (clearSearch) setContextSearch("");
    else navigate(-1);
  }

  return (
    <div
      className="d-inline-flex text-primary back-container"
      onClick={handleComeBack}
    >
      <img src={backIcon} alt="Voltar" />
      <h3 className="uppercase ps-2">Voltar</h3>
    </div>
  );
}
