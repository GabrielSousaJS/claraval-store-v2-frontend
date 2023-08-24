import "./styles.css";

import { useEffect, useState, useContext } from "react";
import { UserDTO } from "../../../../models/user";
import { removeAuthData } from "../../../../localStorage/access-token-repository";
import { ContextToken } from "../../../../utils/context-token";
import { useNavigate } from "react-router-dom";
import * as userService from "../../../../services/user-service";
import { Link } from "react-router-dom";

export default function UserPanel() {
  const { setContextTokenPayload } = useContext(ContextToken);

  const [user, setUser] = useState<UserDTO>();

  const navigate = useNavigate();

  useEffect(() => {
    userService.getProfileRequest().then((response) => setUser(response.data));
  }, []);

  function handleLogOut() {
    removeAuthData();
    setContextTokenPayload(undefined);
    setUser(undefined);
    navigate("/");
  }

  return (
    <section className="border rounded p-5">
      <p className="pb-4">
        Olá, <span className="fw-bold">{user?.name}</span> (não é{" "}
        <span className="fw-bold">{user?.name}</span>?{" "}
        <span className="text-secondary user-panel-span" onClick={handleLogOut}>
          Sair
        </span>
        )
      </p>

      <p>
        A partir do painel de controle de sua conta, você pode ver suas{" "}
        <Link to="/profile/orders" className="text-secondary">
          compras recentes
        </Link>
        , gerenciar o {" "}
        <Link to="/profile/address" className="text-secondary">
          endereço de entrega
        </Link>
        , e{" "}
        <Link to="/profile/account" className="text-secondary">
          editar sua senha e detalhes da conta
        </Link>
        .
      </p>
    </section>
  );
}
