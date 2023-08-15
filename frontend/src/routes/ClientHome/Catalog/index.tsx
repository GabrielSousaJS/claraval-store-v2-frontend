import "./styles.css";

import * as productService from "../../../services/product-service";
import { ProductCard } from "../../../components/ProductCard";
import { ProductDTO } from "../../../models/product";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import { SpringPage } from "../../../models/vendor/spring-page";
import Pagination from "../../../components/Pagination";

type UrlParams = {
  categoryId: string;
};

export default function Catalog() {
  const { categoryId } = useParams<UrlParams>();

  const [page, setPage] = useState<SpringPage<ProductDTO>>();

  const navigate = useNavigate();

  useEffect(() => {
    getProducts(0);
  }, [categoryId]);

  function getProducts(pageNumber: number) {
    productService
      .findAllRequest(pageNumber, categoryId ? Number(categoryId) : 0)
      .then((response) => {
        setPage(response.data);
      });
  }

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
        {page?.content.map((product) => (
          <div
            className="col-sm-6 col-lg-4 col-xl-3"
            key={product.id}
            onClick={() => handleClick(product.id)}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <Pagination
        pageCount={page ? page.totalPages : 0}
        range={3}
        onChange={getProducts}
      />
    </main>
  );
}
