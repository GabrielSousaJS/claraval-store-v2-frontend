import "./styles.css";

import { NavLink } from "react-router-dom";

export default function ProfileNav() {
  return (
    <nav className="ps-3 pe-3 profile-nav-container">
      <ul className="d-sm-flex">
        <li className="w-100 text-center fw-bold">
          <NavLink to={"panel"} className={"p-3 d-inline-block w-100"}>
            Painel
          </NavLink>
        </li>
        <li className="w-100 text-center fw-bold">
          <NavLink to={"orders"} className={"p-3 d-inline-block w-100"}>
            Pedidos
          </NavLink>
        </li>
        <li className="w-100 text-center fw-bold">
          <NavLink to={"address"} className={"p-3 d-inline-block w-100"}>
            Endereço
          </NavLink>
        </li>
        <li className="w-100 text-center fw-bold">
          <NavLink to={"account"} className={"p-3 d-inline-block w-100"}>
            Conta
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
