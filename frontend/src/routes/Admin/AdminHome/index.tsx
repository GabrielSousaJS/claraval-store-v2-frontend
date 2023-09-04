import "./styles.css";

import { Link } from "react-router-dom";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import administrativeLogo from "../../../assets/images/administrativeLogo.svg";

export default function AdminHome() {
  return (
    <main className="container">
      <div className="row pt-4">
        <div className="col-md-6 d-flex flex-column justify-content-around">
          <h3 className="text-center mb-4">Bem vindo a área administrativa</h3>
          <p className="mb-5">
            Você está acessando as ferramentas e recursos que permitem gerenciar
            e otimizar nosso site. Sua dedicação e esforço são fundamentais para
            sucesso da nossa plataforma. Vamos juntos continuar a fazer um ótimo
            trabalho!
          </p>
          <div className="text-center">
            <Link to="/admin/resources" className="d-inline-block">
              <ButtonPrimary text="Acessar recursos" />
            </Link>
          </div>
        </div>
        <div className="col-md-6 text-center admin-img-container">
          <img src={administrativeLogo} alt="Logo Administrativa" />
        </div>
      </div>
    </main>
  );
}
