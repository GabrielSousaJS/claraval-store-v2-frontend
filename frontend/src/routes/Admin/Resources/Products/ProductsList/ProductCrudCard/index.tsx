import "./styles.css";

import { ProductDTO } from "../../../../../../models/product";
import { Link } from "react-router-dom";
import ProductPrice from "../../../../../../components/ProductPrice";
import CategoryBadge from "../../CategoryBadge";

type Props = {
  product: ProductDTO;
};

export default function ProductCrudCard({ product }: Props) {
  return (
    <div className="d-flex justify-content-center mb-4 base-card product-crud-card-container">
      <div className="text-center pt-2 pb-2 product-crud-img">
        <img src={product.imgUrl} alt={product.name} />
      </div>

      <div className="d-flex flex-column flex-fill justify-content-center ps-2">
        <div className="pb-2">
          <h6 className="text-dark">{product.name}</h6>
          <ProductPrice price={product.price} />
        </div>
        <div className="d-flex flex-wrap">
          {product.categories.map((category) => (
            <div key={category.id}>
              <CategoryBadge name={category.name} />
            </div>
          ))}
        </div>
      </div>

      <div className="ps-3 pe-3 product-crud-buttons-container">
        <button className="btn btn-outline-danger fw-bold rounded text-uppercase product-crud-button">
          Excluir
        </button>
        <Link to="/admin/resources/products/create">
          <button className="btn btn-outline-primary fw-bold rounded text-uppercase product-crud-button">
            Editar
          </button>
        </Link>
      </div>
    </div>
  );
}
