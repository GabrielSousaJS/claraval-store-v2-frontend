import CategoryCrudCard from "./CategoryCrudCard";
import Loader from "../../../../../components/Loader";
import { Link } from "react-router-dom";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";
import { useEffect, useState } from "react";
import { CategoryDTO } from "../../../../../models/category";
import * as categoryService from "../../../../../services/category-service";

export default function CategoryListing() {
  const [isLoading, setIsLoading] = useState(false);

  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    setIsLoading(true);
    categoryService
      .findAllRequest()
      .then((response) => {
        setCategories(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="ps-2 pe-2">
      <div className="d-flex justify-content-between pb-4">
        <h1 className="pe-4 text-dark">Lista de categorias</h1>
        <Link to="/admin/resources/categories/create">
          <ButtonPrimary text="Adicionar" />
        </Link>
      </div>

      <div className="row">
        {isLoading ? (
          <Loader />
        ) : (
          categories.map((category) => (
            <div className="col-lg-6" key={category.id}>
              <CategoryCrudCard category={category} onDelete={getCategories} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
