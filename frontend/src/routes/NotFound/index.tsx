import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../../components/ButtonPrimary";

export default function NotFound() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <main className="modal-center-box">
      <div className="p-3">
        <h1 className="text-dark pb-5">Página não encontrada</h1>
        <div onClick={handleClick}>
          <ButtonPrimary text="Voltar a página inicial" />
        </div>
      </div>
    </main>
  );
}
