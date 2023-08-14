import "./styles.css";

import closeIcon from "../../../assets/icons/closeIcon.svg";
import { CategoryDTO } from "../../../models/category";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as categoryService from "../../../services/category-service";

type Props = {
  onMenuBarClose: Function;
};

export default function MenuBar({ onMenuBarClose }: Props) {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  useEffect(() => {
    categoryService.findAllRequest().then((response) => {
      setCategories(response.data);
    });
  }, []);

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
          <div className="ps-3 pt-4 pb-4">
            <p>Oie!</p>
            <p>Username</p>
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
          </ul>
        </nav>
      </div>
    </div>
  );
}
