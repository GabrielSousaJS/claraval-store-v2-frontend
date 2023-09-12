import "./styles.css";

import FormInput from "../../../../components/FormInput";
import DialogInfo from "../../../../components/DialogInfo";
import Loader from "../../../../components/Loader";
import { useEffect, useState } from "react";
import { UserDTO } from "../../../../models/user";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";
import * as userService from "../../../../services/user-service";
import * as addressService from "../../../../services/address-service";
import * as validation from "../../../../utils/validations";
import * as forms from "../../../../utils/forms";
import * as viaCepService from "../../../../services/viacep-service";

export default function UserAddress() {
  const [formData, setFormData] = useState<any>({
    street: {
      value: "",
      id: "street",
      name: "street",
      type: "text",
      placeholder: "Rua",
      validation: function (value: string) {
        return validation.streetValidation(value);
      },
      message: "Campo inválido",
    },
    cep: {
      value: "",
      id: "cep",
      name: "cep",
      type: "text",
      placeholder: "CEP",
      validation: function (value: string) {
        return validation.cepValidation(value);
      },
      message: "Informe um CEP válido",
    },
    number: {
      value: "",
      id: "number",
      name: "number",
      type: "number",
      placeholder: "Número",
      validation: function (value: string) {
        return validation.numberValidation(value);
      },
      message: "Campo inválido",
    },
    neighborhood: {
      value: "",
      id: "neighborhood",
      name: "neighborhood",
      type: "text",
      placeholder: "Bairro",
      validation: function (value: string) {
        return validation.neighborhoodValidation(value);
      },
      message: "Campo inválido",
    },
    complement: {
      value: "",
      id: "complement",
      name: "complement",
      type: "text",
      placeholder: "Complemento",
    },
    city: {
      value: "",
      id: "city",
      name: "city",
      type: "text",
      placeholder: "Cidade",
      validation: function (value: string) {
        return validation.lengthDefaultValidation(value);
      },
      message: "Campo inválido",
    },
    state: {
      value: "",
      id: "state",
      name: "state",
      type: "text",
      placeholder: "Estado (UF abreviado)",
      validation: function (value: string) {
        return validation.stateValidation(value);
      },
      message: "Campo inválido",
    },
    country: {
      value: "",
      id: "country",
      name: "country",
      type: "text",
      placeholder: "País",
      validation: function (value: string) {
        return validation.lengthDefaultValidation(value);
      },
      message: "Campo inválido",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const [dialogInfo, setDialogInfo] = useState({
    visible: false,
    message: "Endereço atualizado com sucesso",
  });

  const [user, setUser] = useState<UserDTO>();

  useEffect(() => {
    setIsLoading(true);
    userService
      .getProfileRequest()
      .then((response) => {
        setUser(response.data);
        setFormData(forms.updateAll(formData, response.data.address));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function getCep(cep: string) {
    viaCepService.getCepRequest(cep.replace("-", "")).then((response) => {
      if (response.data.erro) return;

      setFormData(forms.cepToFormAddress(formData, response.data));
    });
  }

  function handleTurnDirty(name: string) {
    setFormData(forms.dirtyAndValidate(formData, name));
  }

  function handleInputChange(event: any) {
    setFormData(
      forms.updateAndValidate(formData, event.target.name, event.target.value)
    );

    if (
      validation.cepValidation(event.target.value) &&
      event.target.name === "cep"
    )
      getCep(event.target.value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    const formDataValidated = forms.dirtyAndValidateAll(formData);

    if (forms.hasAnyInvalid(formDataValidated)) {
      setFormData(formDataValidated);
      return;
    }

    const requestBody = forms.toValues(formDataValidated);

    if (user)
      return addressService
        .updateAddressRequest(user.id, requestBody)
        .then(() => {
          setDialogInfo({ ...dialogInfo, visible: true });
        })
        .catch((error) => {
          setFormData(
            forms.setBackendErrors(
              formDataValidated,
              error.response.data.errors
            )
          );
        });
  }

  function handleDialogInfoClose() {
    setDialogInfo({ ...dialogInfo, visible: false });
  }

  return (
    <section className="address-form-container base-card p-3 ms-2 me-2">
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 pb-2">
              <FormInput
                {...formData.cep}
                className="form-control base-input"
                onTurnDirty={handleTurnDirty}
                onChange={handleInputChange}
              />
              <div className="form-error">{formData.cep.message}</div>
            </div>
            <div className="col-12 pb-2">
              <FormInput
                {...formData.street}
                className="form-control base-input"
                onTurnDirty={handleTurnDirty}
                onChange={handleInputChange}
              />
              <div className="form-error">{formData.street.message}</div>
            </div>
            <div className="col-12 pb-2">
              <FormInput
                {...formData.number}
                className="form-control base-input"
                onTurnDirty={handleTurnDirty}
                onChange={handleInputChange}
              />
              <div className="form-error">{formData.number.message}</div>
            </div>
            <div className="col-12 pb-2">
              <FormInput
                {...formData.neighborhood}
                className="form-control base-input"
                onTurnDirty={handleTurnDirty}
                onChange={handleInputChange}
              />
              <div className="form-error">{formData.neighborhood.message}</div>
            </div>
            <div className="col-12 pb-2">
              <FormInput
                {...formData.complement}
                className="form-control base-input"
                onTurnDirty={handleTurnDirty}
                onChange={handleInputChange}
              />
              <div className="form-error">{formData.complement.message}</div>
            </div>
            <div className="col-12 pb-2">
              <FormInput
                {...formData.city}
                className="form-control base-input"
                onTurnDirty={handleTurnDirty}
                onChange={handleInputChange}
              />
              <div className="form-error">{formData.city.message}</div>
            </div>
            <div className="col-12 pb-2">
              <FormInput
                {...formData.state}
                className="form-control base-input"
                onTurnDirty={handleTurnDirty}
                onChange={handleInputChange}
              />
              <div className="form-error">{formData.state.message}</div>
            </div>
            <div className="col-12 pb-3">
              <FormInput
                {...formData.country}
                className="form-control base-input"
                onTurnDirty={handleTurnDirty}
                onChange={handleInputChange}
              />
              <div className="form-error">{formData.country.message}</div>
            </div>
          </div>

          <div className="text-end">
            <div className="d-inline-block">
              <ButtonPrimary text="Salvar alterações" />
            </div>
          </div>
        </form>
      )}

      {dialogInfo.visible && (
        <DialogInfo
          onDialogClose={handleDialogInfoClose}
          message={dialogInfo.message}
        />
      )}
    </section>
  );
}
