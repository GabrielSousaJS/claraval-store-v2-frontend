import "./styles.css";

import { ProductDTO } from "../../models/product";
import ProductPrice from "../ProductPrice";

type Props = {
  product: ProductDTO;
};

export function ProductCard({ product }: Props) {
  return (
    <div className="base-card product-card">
      <div className="text-center border-bottom p-3">
        <img className="w-auto" src={product.imgUrl} alt={product.name} />
      </div>

      <div className="card-bottom-container">
        <h5 className="text-dark">{product.name}</h5>
        <ProductPrice price={product.price} />
      </div>
    </div>
  );
}
