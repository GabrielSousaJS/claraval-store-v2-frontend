import "./styles.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryDTO } from "../../../../../models/category";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";
import { selectStyles } from "../../../../../utils/select-styles";
import FormInput from "../../../../../components/FormInput";
import ComeBack from "../../../../../components/ComeBack";
import FormSelect from "../../../../../components/FormSelect";
import FormTextArea from "../../../../../components/FormTextArea";
import ButtonInverse from "../../../../../components/ButtonInverse";
import * as validation from "../../../../../utils/validations";
import * as forms from "../../../../../utils/forms";
import * as categoryService from "../../../../../services/category-service";
import * as productService from "../../../../../services/product-service";

export default function ProductForm() {
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
    description: {
      value: "",
      id: "description",
      name: "description",
      type: "text",
      placeholder: "Descrição",
      validation: function (value: string) {
        return validation.lengthDescriptionValidation(value);
      },
      message: "Informe uma descrição com no mínimo 10 caracteres",
    },
    price: {
      value: "",
      id: "price",
      name: "price",
      type: "number",
      placeholder: "Preço",
      validation: function (value: string) {
        return validation.numberValidation(value);
      },
      message: "Informe um preço válido",
    },
    quantity: {
      value: "",
      id: "quantity",
      name: "quantity",
      type: "number",
      placeholder: "Quantidade",
      validation: function (value: string) {
        return validation.numberValidation(value);
      },
      message: "Informe uma quantidade válida",
    },
    imgUrl: {
      value: "",
      id: "imgUrl",
      name: "imgUrl",
      type: "text",
      placeholder: "URL da imagem",
      validation: function (value: string) {
        return validation.urlValidation(value);
      },
      message: "Apenas URL de imagens PNG ou JPG",
    },
    categories: {
      value: [],
      id: "categories",
      name: "categories",
      placeholder: "Categorias",
      validation: function (value: CategoryDTO[]) {
        return value.length > 0;
      },
      message: "Informe ao menos uma categoria",
    },
  });

  const params = useParams();

  const navigate = useNavigate();

  const isEditing = params.productId !== "create";

  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  useEffect(() => {
    categoryService.findAllRequest().then((response) => {
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    if (isEditing) {
      productService
        .findByIdRequest(Number(params.productId))
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
      requestBody.id = Number(params.productId);
    }

    const request = isEditing
      ? productService.updateRequest(requestBody).then(() => {
          navigate(-1);
        })
      : productService.insertRequest(requestBody);

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
    <section className="ps-2 pe-2">
      <div className="pb-4">
        <ComeBack />
      </div>
      <div className="pb-4">
        <h3 className="text-dark">Dados do produto</h3>
      </div>
      <div className="base-card p-3">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
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
                <div className="col-lg-6 pb-3">
                  <FormInput
                    {...formData.price}
                    className="form-control base-input"
                    onChange={handleInputChange}
                    onTurnDirty={handleTurnDirty}
                  />
                  <div className="form-error">{formData.price.message}</div>
                </div>
                <div className="col-lg-6 pb-3">
                  <FormInput
                    {...formData.quantity}
                    className="form-control base-input"
                    onChange={handleInputChange}
                    onTurnDirty={handleTurnDirty}
                  />
                  <div className="form-error">{formData.quantity.message}</div>
                </div>
                <div className="col-12 pb-3">
                  <FormSelect
                    {...formData.categories}
                    className="form-control base-input form-select-container"
                    styles={selectStyles}
                    options={categories}
                    onChange={(obj: any) => {
                      const newFormData = forms.updateAndValidate(
                        formData,
                        "categories",
                        obj
                      );
                      setFormData(newFormData);
                    }}
                    isMulti
                    getOptionLabel={(obj: any) => obj.name}
                    getOptionValue={(obj: any) => String(obj.id)}
                    onTurnDirty={handleTurnDirty}
                  />
                  <div className="form-error">
                    {formData.categories.message}
                  </div>
                </div>
                <div className="col-12 pb-3">
                  <FormInput
                    {...formData.imgUrl}
                    className="form-control base-input"
                    onChange={handleInputChange}
                    onTurnDirty={handleTurnDirty}
                  />
                  <div className="form-error">{formData.imgUrl.message}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 pb-3">
              <FormTextArea
                {...formData.description}
                className="form-control base-input crud-textarea"
                onChange={handleInputChange}
                onTurnDirty={handleTurnDirty}
              />
              <div className="form-error">{formData.description.message}</div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div onClick={handleCancel}>
              <ButtonInverse text={"Cancelar"} />
            </div>
            <div>
              <ButtonPrimary text={"Salvar"} />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
