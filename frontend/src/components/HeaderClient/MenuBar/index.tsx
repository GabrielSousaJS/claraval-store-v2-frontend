import "./styles.css";

import closeIcon from "../../../assets/icons/closeIcon.svg";
import { CategoryDTO } from "../../../models/category";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ContextToken } from "../../../utils/context-token";
import { UserDTO } from "../../../models/user";
import { Link } from "react-router-dom";
import { removeAuthData } from "../../../localStorage/access-token-repository";
import { ContextCartCount } from "../../../utils/context-cart";
import * as categoryService from "../../../services/category-service";
import * as userService from "../../../services/user-service";

type Props = {
  onMenuBarClose: Function;
};

export default function MenuBar({ onMenuBarClose }: Props) {
  const { contextTokenPayload, setContextTokenPayload } =
    useContext(ContextToken);

  const { setContextCartCount } = useContext(ContextCartCount);

  const [user, setUser] = useState<UserDTO>();

  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (contextTokenPayload) {
      userService.getProfileRequest().then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    categoryService.findAllRequest().then((response) => {
      setCategories(response.data);
    });
  }, []);

  function handleLogOut() {
    removeAuthData();
    setContextCartCount(0);
    setContextTokenPayload(undefined);
    setUser(undefined);
    onMenuBarClose();
    navigate("/");
  }

  return (
    <div className="modal-background" onClick={() => onMenuBarClose()}>
      <div className="modal-box" onClick={(event) => event.stopPropagation()}>
        <div className="bg-secondary text-light fw-bold">
          <div className="ps-3 pt-4">
            <button onClick={() => onMenuBarClose()}>
              <img
                src={closeIcon}
                alt="Fechar"
                className="vertical-align-middle"
              />
            </button>
          </div>
          <div className="ps-3 pt-4 pb-4 menu-bar-top">
            <p>Oie!</p>
            {user ? (
              <Link to="/profile" onClick={() => onMenuBarClose()}>
                {user?.name.split(" ")[0]}
              </Link>
            ) : (
              <Link to={"login"}>Entre ou cadastre-se</Link>
            )}
          </div>
        </div>
        <nav className="p-3">
          <ul className="fw-semibold menu-bar-items">
            {categories.map((category) => (
              <NavLink to={`catalog/${category.id}`} key={category.id}>
                <li className="pt-3 pb-3" onClick={() => onMenuBarClose()}>
                  {category.name}
                </li>
              </NavLink>
            ))}
            {user && (
              <li className="pt-3 pb-3 text-danger" onClick={handleLogOut}>
                Sair
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
