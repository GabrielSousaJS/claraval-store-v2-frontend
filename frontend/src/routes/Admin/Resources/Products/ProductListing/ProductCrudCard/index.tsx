import "./styles.css";

import { ProductDTO } from "../../../../../../models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProductPrice from "../../../../../../components/ProductPrice";
import CategoryBadge from "../../CategoryBadge";
import DialogInfo from "../../../../../../components/DialogInfo";
import DialogConfirmation from "../../../../../../components/DialogConfirmation";
import * as productService from "../../../../../../services/product-service";

type Props = {
  product: ProductDTO;
  onDelete: Function;
};

export default function ProductCrudCard({ product, onDelete }: Props) {
  const [dialogInfoData, setDialogInfoData] = useState({
    visible: false,
    message: "",
  });

  const [dialogConfirmationData, setDialogConfirmationData] = useState({
    visible: false,
    message: "Tem certeza que deseja excluir este produto?",
  });

  function handleDelete() {
    setDialogConfirmationData({ ...dialogConfirmationData, visible: true });
  }

  function handleConfirmationDialogAnswer(answer: boolean) {
    if (answer) {
      productService
        .deleteByIdRequest(product.id)
        .then(() => {
          onDelete();
        })
        .catch((error) => {
          setDialogInfoData({
            ...dialogInfoData,
            visible: true,
            message: error.response.data.error,
          });
        });
    }

    setDialogConfirmationData({
      ...dialogConfirmationData,
      visible: false,
    });
  }

  function handleDialogInfoClose() {
    setDialogInfoData({
      ...dialogInfoData,
      visible: false,
    });
  }

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
        <Link to={`/admin/resources/products/${product.id}`}>
          <button className="btn btn-outline-primary fw-bold rounded text-uppercase product-crud-button">
            Editar
          </button>
        </Link>
        <button
          className="btn btn-outline-danger fw-bold rounded text-uppercase product-crud-button"
          onClick={handleDelete}
        >
          Excluir
        </button>
      </div>

      {dialogInfoData.visible && (
        <DialogInfo
          message={dialogInfoData.message}
          onDialogClose={handleDialogInfoClose}
        />
      )}

      {dialogConfirmationData.visible && (
        <DialogConfirmation
          message={dialogConfirmationData.message}
          onDialogAnswer={handleConfirmationDialogAnswer}
        />
      )}
    </div>
  );
}
