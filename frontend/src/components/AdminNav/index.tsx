import "./styles.css";

import { NavLink } from "react-router-dom";

export default function AdminNav() {
  return (
    <nav className="ps-2 pe-2 admin-nav-container">
      <ul className="d-md-flex">
        <li className="w-100 text-center fw-bold">
          <NavLink to={"products"} className={"p-3 d-inline-block w-100"}>
            Produtos
          </NavLink>
        </li>
        <li className="w-100 text-center fw-bold">
          <NavLink to={"categories"} className={"p-3 d-inline-block w-100"}>
            Categorias
          </NavLink>
        </li>
        <li className="w-100 text-center fw-bold">
          <NavLink to={"orders"} className={"p-3 d-inline-block w-100"}>
            Pedidos
          </NavLink>
        </li>
        <li className="w-100 text-center fw-bold">
          <NavLink to={"users"} className={"p-3 d-inline-block w-100"}>
            Usuários
          </NavLink>
        </li>
        <li className="w-100 text-center fw-bold">
          <NavLink to={"admins"} className={"p-3 d-inline-block w-100"}>
            Administradores
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
