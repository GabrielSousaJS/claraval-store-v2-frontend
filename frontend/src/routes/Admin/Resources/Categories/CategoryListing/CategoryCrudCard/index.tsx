import "./styles.css";

import { useState } from "react";
import { CategoryDTO } from "../../../../../../models/category";
import { Link } from "react-router-dom";
import DialogInfo from "../../../../../../components/DialogInfo";
import DialogConfirmation from "../../../../../../components/DialogConfirmation";
import * as categoryService from "../../../../../../services/category-service";

type Props = {
  category: CategoryDTO;
  onDelete: Function;
};

export default function CategoryCrudCard({ category, onDelete }: Props) {
  const [dialogInfoData, setDialogInfoData] = useState({
    visible: false,
    message: "",
  });

  const [dialogConfirmationData, setDialogConfirmationData] = useState({
    visible: false,
    message: "Tem certeza que deseja excluir esta categoria?",
  });

  function handleDelete() {
    setDialogConfirmationData({ ...dialogConfirmationData, visible: true });
  }

  function handleConfirmationDialogAnswer(answer: boolean) {
    if (answer) {
      categoryService
        .deleteByIdRequest(category.id)
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
    <div className="d-flex justify-content-between mb-4 base-card category-crud-card-container">
      <div className="text-dark category-crud-card-title">
        <h3 className="">{category.name}</h3>
      </div>

      <div className="ps-3 pe-3 category-crud-buttons-container">
        <Link to={`/admin/resources/categories/${category.id}`}>
          <button className="btn btn-outline-primary fw-bold rounded text-uppercase category-crud-button">
            Editar
          </button>
        </Link>
        <button
          className="btn btn-outline-danger fw-bold rounded text-uppercase category-crud-button"
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
