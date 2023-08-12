import "./styles.css";

import subIcon from "../../../assets/icons/subIcon.svg";
import addIcon from "../../../assets/icons/addIcon.svg";
import { useParams } from "react-router-dom";
import { ProductDTO } from "../../../models/product";
import { useEffect, useState } from "react";
import ComeBack from "../../../components/ComeBack";
import ProductPrice from "../../../components/ProductPrice";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import * as productService from "../../../services/product-service";

export default function ProductDetails() {
  const params = useParams();

  const [product, setProduct] = useState<ProductDTO>();

  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    productService
      .findByIdRequest(Number(params.productId))
      .then((response) => {
        setProduct(response.data);
      });
  }, [params.productId]);

  function handleSubtract() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function handleAdd() {
    if (quantity < product?.quantity!) {
      setQuantity(quantity + 1);
    }
  }

  return (
    <main className="container p-4">
      <div className="ms-2">
        <ComeBack />
      </div>

      <div className="row justify-content-lg-between gap-3 pt-4 text-dark">
        <div className="d-lg-flex base-card col-lg-8">
          <div className="col-lg-6 img-details-container text-center">
            <img src={product?.imgUrl} alt={product?.name} />
          </div>

          <div className="col-lg-6 pt-4">
            <h3 className="mb-2">{product?.name}</h3>
            <p>{product?.description}</p>
          </div>
        </div>

        <div className="col-lg-3 base-card d-flex flex-column justify-content-between p-3">
          <div className="details-margin-bottom">
            <ProductPrice price={product?.price ? product?.price : 0} />
          </div>

          <h4 className="details-margin-bottom">
            Estoque: {product?.quantity}
          </h4>

          <div className="quantity-container">
            <h6 className="mb-2">Quantidade</h6>

            <button className="border-0 p-0" onClick={handleSubtract}>
              <img src={subIcon} alt="Subtrair" />
            </button>
            <span className="text-center details-margin-bottom">
              {quantity}
            </span>
            <button className="border-0 p-0" onClick={handleAdd}>
              <img src={addIcon} alt="Adicionar" />
            </button>
          </div>

          <ButtonPrimary text="Adicionar ao carrinho" />
        </div>
      </div>
    </main>
  );
}
