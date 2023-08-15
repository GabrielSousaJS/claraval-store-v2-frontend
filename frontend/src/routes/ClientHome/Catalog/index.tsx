import "./styles.css";

import { ProductCard } from "../../../components/ProductCard";
import { ProductDTO } from "../../../models/product";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as productService from "../../../services/product-service";
import { ButtonPrimary } from "../../../components/ButtonPrimary";

type QueryParams = {
  page: number;
  name: string;
};

type UrlParams = {
  categoryId: string;
};

export default function Catalog() {
  const { categoryId } = useParams<UrlParams>();

  const [products, setProducts] = useState<ProductDTO[]>([]);

  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    name: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    productService
      .findAllRequest(
        queryParams.page,
        queryParams.name,
        categoryId ? Number(categoryId) : 0
      )
      .then((response) => {
        setProducts(response.data.content);
      });
  }, [categoryId]);

  function handleCleanFilter() {
    navigate("/");
  }

  function handleClick(productId: number) {
    navigate(`/details/${productId}`);
  }

  return (
    <main className="container pt-4">
      <div className="d-flex justify-content-between">
        <h1 className="catalog-title">Catálogo de produtos</h1>
        {categoryId !== undefined && (
          <div onClick={handleCleanFilter}>
            <ButtonPrimary text={"Remover filtro"} />
          </div>
        )}
      </div>
      <div className="row pt-4 pb-4">
        {products.map((product) => (
          <div
            className="col-sm-6 col-lg-4 col-xl-3"
            key={product.id}
            onClick={() => handleClick(product.id)}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </main>
  );
}
