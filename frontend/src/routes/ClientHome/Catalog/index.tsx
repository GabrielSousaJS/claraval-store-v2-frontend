import "./styles.css";

import { ProductCard } from "../../../components/ProductCard";
import { ProductDTO } from "../../../models/product";
import { useEffect, useState } from "react";
import * as productService from "../../../services/product-service";

export default function Catalog() {
  const [products, setProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    productService.findAllRequest().then((response) => {
      setProducts(response.data.content);
    });
  }, []);

  return (
    <main className="container pt-4">
      <h1 className="catalog-title">Catálogo de produtos</h1>
      <div className="row pt-4 pb-4">
        {products.map((product) => (
          <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </main>
  );
}
