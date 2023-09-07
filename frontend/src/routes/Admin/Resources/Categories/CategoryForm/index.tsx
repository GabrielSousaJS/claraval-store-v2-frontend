import { useEffect, useState } from "react";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";
import { useNavigate, useParams } from "react-router-dom";
import ComeBack from "../../../../../components/ComeBack";
import ButtonInverse from "../../../../../components/ButtonInverse";
import FormInput from "../../../../../components/FormInput";
import * as validation from "../../../../../utils/validations";
import * as forms from "../../../../../utils/forms";
import * as categoryService from "../../../../../services/category-service";

export default function CategoryForm() {
  const [formData, setFormData] = useState({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Nome",
      validation: function (value: string) {
        return validation.lengthDefaultValidation(value);
      },
      message: "Informe um nome entre 3 a 80 caracteres",
    },
  });

  const params = useParams();

  const isEditing = params.categoryId !== "create";

  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing) {
      categoryService
        .findByIdRequest(Number(params.categoryId))
        .then((response) => {
          setFormData(forms.updateAll(formData, response.data));
        });
    }
  }, []);

  function handleTurnDirty(name: string) {
    setFormData(forms.dirtyAndValidate(formData, name));
  }

  function handleInputChange(event: any) {
    setFormData(
      forms.updateAndValidate(formData, event.target.name, event.target.value)
    );
  }

  function handleCancel() {
    navigate(-1);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formDataValidated = forms.dirtyAndValidateAll(formData);

    if (forms.hasAnyInvalid(formDataValidated)) {
      setFormData(formDataValidated);
      return;
    }

    const requestBody = forms.toValues(formDataValidated);

    if (isEditing) {
      requestBody.id = Number(params.categoryId);
    }

    const request = isEditing
      ? categoryService.updateRequest(requestBody).then(() => {
          navigate(-1);
        })
      : categoryService.insertRequest(requestBody);

    request
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        setFormData(
          forms.setBackendErrors(formData, error.response.data.errors)
        );
      });
  }

  return (
    <div className="ps-2 pe-2">
      <div className="pb-4">
        <ComeBack />
      </div>
      <div className="pb-4 text-dark">
        {isEditing ? (
          <h3>Modificar categoria</h3>
        ) : (
          <h3>Adicionar categoria</h3>
        )}
      </div>
      <div className="base-card p-3">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 pb-3">
              <FormInput
                {...formData.name}
                className="form-control base-input"
                onChange={handleInputChange}
                onTurnDirty={handleTurnDirty}
              />
              <div className="form-error">{formData.name.message}</div>
            </div>
            <div className="d-flex justify-content-between">
              <div onClick={handleCancel}>
                <ButtonInverse text={"Cancelar"} />
              </div>
              <div>
                <ButtonPrimary text={"Salvar"} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
