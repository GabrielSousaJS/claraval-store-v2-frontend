import { Link } from "react-router-dom";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";
import { ProductDTO } from "../../../../../models/product";
import { SpringPage } from "../../../../../models/vendor/spring-page";
import { useEffect, useState } from "react";
import ProductCrudCard from "./ProductCrudCard";
import Pagination from "../../../../../components/Pagination";
import * as productService from "../../../../../services/product-service";

export default function ProductListing() {
  const [page, setPage] = useState<SpringPage<ProductDTO>>();

  useEffect(() => {
    getProducts(0);
  }, []);

  function getProducts(pageNumber: number) {
    productService.findAllRequest(pageNumber).then((response) => {
      setPage(response.data);
    });
  }

  return (
    <section className="ps-2 pe-2">
      <div className="d-flex justify-content-between pb-4">
        <h1 className="pe-4">Lista de produtos</h1>
        <Link to="/admin/resources/products/create">
          <ButtonPrimary text="Adicionar" />
        </Link>
      </div>

      <div className="row">
        {page?.content.map((product) => (
          <div className="col-sm-6 col-md-12" key={product.id}>
            <ProductCrudCard product={product} onDelete={getProducts} />
          </div>
        ))}
      </div>

      {page?.content.length !== 0 && (
        <Pagination
          pageCount={page ? page.totalPages : 0}
          range={3}
          onChange={getProducts}
        />
      )}
    </section>
  );
}
