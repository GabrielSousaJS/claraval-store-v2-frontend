import "./styles.css";

import "@popperjs/core";
import "bootstrap/js/src/collapse";
import togglerIcon from "../../../assets/icons/togglerIcon.svg";
import { CategoryDTO } from "../../../models/category";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as categoryService from "../../../services/category-service";

export default function NavButton() {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  useEffect(() => {
    categoryService.findAllRequest().then((response) => {
      setCategories(response.data);
    });
  }, []);

  return (
    <nav className="navbar navbar-dark justify-content-end">
      <button
        className="navbar-toggler shadow-none border-0 p-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#claraval-navbar"
        aria-controls="claraval-navbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <img src={togglerIcon} />
      </button>

      <div className="collapse navbar-collapse" id="claraval-navbar">
        <ul className="navbar-nav text-light">
          {categories.map((category) => (
            <li
              className="text-end text-uppercase fw-bold pt-3 font-size-li nav-button-link"
              key={category.id}
            >
              <NavLink to={"#"}>{category.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
