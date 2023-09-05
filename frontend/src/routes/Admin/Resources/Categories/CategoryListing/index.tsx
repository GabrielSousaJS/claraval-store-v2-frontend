import { Link } from "react-router-dom";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";
import { useEffect, useState } from "react";
import { CategoryDTO } from "../../../../../models/category";
import * as categoryService from "../../../../../services/category-service";

import CategoryCrudCard from "./CategoryCrudCard";

export default function CategoryListing() {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    categoryService.findAllRequest().then((response) => {
      setCategories(response.data);
    });
  }

  return (
    <section className="ps-2 pe-2">
      <div className="d-flex justify-content-between pb-4">
        <h1 className="pe-4 text-dark">Lista de categorias</h1>
        <Link to="/admin/resources/categories/create">
          <ButtonPrimary text="Adicionar" />
        </Link>
      </div>

      <div className="row">
        {categories.map((category) => (
          <div className="col-lg-6" key={category.id}>
            <CategoryCrudCard category={category} onDelete={getCategories} />
          </div>
        ))}
      </div>
    </section>
  );
}
