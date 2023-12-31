import { useState } from "react";
import { ButtonPrimary } from "../../../../../components/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import ComeBack from "../../../../../components/ComeBack";
import FormInput from "../../../../../components/FormInput";
import ButtonInverse from "../../../../../components/ButtonInverse";
import FormPassword from "../../../../../components/FormPassword";
import * as viaCepService from "../../../../../services/viacep-service";
import * as formatters from "../../../../../utils/formatters";
import * as validation from "../../../../../utils/validations";
import * as forms from "../../../../../utils/forms";
import * as userService from "../../../../../services/user-service";

export default function AdminForm() {
  const [formDataUser, setFormDataUser] = useState<any>({
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
    birthDate: {
      value: "",
      id: "birthDate",
      name: "birthDate",
      type: "date",
      placeholder: "Data de nascimento",
      validation: function (value: string) {
        return validation.birthDateValidation(value);
      },
      message: "Idade mínima de 18 anos",
    },
    email: {
      value: "",
      id: "email",
      name: "email",
      type: "text",
      placeholder: "E-mail",
      validation: function (value: string) {
        return validation.emailValidation(value);
      },
      message: "Informe um e-mail válido",
    },
    password: {
      value: "",
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Senha",
      validation: function (value: string) {
        return validation.passwordValidation(value);
      },
      message: "A senha deve conter no mínimo 8 caracteres",
    },
    address: {},
  });

  const [formDataAddress, setFormDataAddress] = useState<any>({
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

  const navigate = useNavigate();

  function handleTurnDirtyUser(name: string) {
    setFormDataUser(forms.dirtyAndValidate(formDataUser, name));
  }

  function handleInputChangeUser(event: any) {
    setFormDataUser(
      forms.updateAndValidate(
        formDataUser,
        event.target.name,
        event.target.value
      )
    );
  }

  function handleTurnDirtyAddress(name: string) {
    setFormDataAddress(forms.dirtyAndValidate(formDataAddress, name));
  }

  function handleInputChangeAddress(event: any) {
    setFormDataAddress(
      forms.updateAndValidate(
        formDataAddress,
        event.target.name,
        event.target.value
      )
    );

    if (
      validation.cepValidation(event.target.value) &&
      event.target.name === "cep"
    )
      getCep(event.target.value);
  }

  function getCep(cep: string) {
    viaCepService.getCepRequest(cep.replace("-", "")).then((response) => {
      if (response.data.erro) return;

      setFormDataAddress(
        forms.cepToFormAddress(formDataAddress, response.data)
      );
    });
  }

  function handleChangeType(event: any) {
    event.preventDefault();
    setFormDataUser(forms.changeType(formDataUser, "password"));
  }

  function handleCancelClick(event: any) {
    event.preventDefault();
    navigate(-1);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formDataUserValidated = forms.dirtyAndValidateAll(formDataUser);
    const formDataAddressValidated = forms.dirtyAndValidateAll(formDataAddress);

    if (
      forms.hasAnyInvalid(formDataUserValidated) &&
      forms.hasAnyInvalid(formDataAddressValidated)
    ) {
      setFormDataUser(formDataUserValidated);
      setFormDataAddress(formDataAddressValidated);
      return;
    }

    const address = forms.toValues(formDataAddressValidated);
    const requestBody = forms.toValues(formDataUserValidated);
    requestBody.birthDate = formatters.formatDateToISO(requestBody.birthDate);
    requestBody.address = address;

    return userService
      .insertAdminRequest(requestBody)
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        const newInputUser = forms.setBackendErrors(
          formDataUserValidated,
          error.response.data.errors
        );
        setFormDataUser(newInputUser);

        const newInputsAddress = forms.setBackendErrors(
          formDataAddressValidated,
          error.response.data.errors
        );
        setFormDataAddress(newInputsAddress);
      });
  }

  return (
    <div className="ps-2 pe-2">
      <div className="pb-4">
        <ComeBack />
      </div>
      <div className="pb-4">
        <h3 className="text-dark">Cadastro de administrador</h3>
      </div>
      <div className="base-card p-3">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-8 pb-2">
              <FormInput
                {...formDataUser.name}
                className="form-control base-input"
                onTurnDirty={handleTurnDirtyUser}
                onChange={handleInputChangeUser}
              />
              <div className="form-error">{formDataUser.name.message}</div>
            </div>
            <div className="col-md-4 pb-2">
              <FormInput
                {...formDataUser.birthDate}
                className="form-control base-input"
                onTurnDirty={handleTurnDirtyUser}
                onChange={handleInputChangeUser}
              />
              <div className="form-error">{formDataUser.birthDate.message}</div>
            </div>
            <div className="col-sm-12 pb-2">
              <FormInput
                {...formDataUser.email}
                className="form-control base-input"
                onTurnDirty={handleTurnDirtyUser}
                onChange={handleInputChangeUser}
              />
              <div className="form-error">{formDataUser.email.message}</div>
            </div>
            <div className="col-sm-12 pb-2">
              <FormPassword
                {...formDataUser.password}
                className="form-control base-input"
                onTurnDirty={handleTurnDirtyUser}
                onChange={handleInputChangeUser}
                onChangeType={handleChangeType}
              />
              <div className="form-error">{formDataUser.password.message}</div>
            </div>
            <div className="col-sm-12 pb-2">
              <FormInput
                {...formDataAddress.cep}
                className="form-control base-input"
                onTurnDirty={handleTurnDirtyAddress}
                onChange={handleInputChangeAddress}
              />
              <div className="form-error">{formDataAddress.cep.message}</div>
            </div>
            <div className="col-md-6 pb-2">
              <FormInput
                {...formDataAddress.street}
                className="form-control base-input"
                onTurnDirty={handleTurnDirtyAddress}
                onChange={handleInputChangeAddress}
              />
              <div className="form-error">{formDataAddress.street.message}</div>
            </div>
            <div className="col-md-6 pb-2">
              <FormInput
                {...formDataAddress.number}
                className="form-control base-input"
                onTurnDirty={handleTurnDirtyAddress}
                onChange={handleInputChangeAddress}
              />
              <div className="form-error">{formDataAddress.number.message}</div>
            </div>
            <div className="col-md-6 pb-2">
              <FormInput
                {...formDataAddress.neighborhood}
                className="form-control base-input"
                onTurnDirty={handleTurnDirtyAddress}
                onChange={handleInputChangeAddress}
              />
              <div className="form-error">
                {formDataAddress.neighborhood.message}
              </div>
            </div>
            <div className="col-md-6 pb-2">
              <FormInput
                {...formDataAddress.complement}
                className="form-control base-input"
                onTurnDirty={handleTurnDirtyAddress}
                onChange={handleInputChangeAddress}
              />
            </div>
            <div className="col-md-4 pb-2">
              <FormInput
                {...formDataAddress.city}
                className="form-control base-input"
                onTurnDirty={handleTurnDirtyAddress}
                onChange={handleInputChangeAddress}
              />
              <div className="form-error">{formDataAddress.city.message}</div>
            </div>
            <div className="col-md-4 pb-2">
              <FormInput
                {...formDataAddress.state}
                className="form-control base-input"
                onTurnDirty={handleTurnDirtyAddress}
                onChange={handleInputChangeAddress}
              />
              <div className="form-error">{formDataAddress.state.message}</div>
            </div>
            <div className="col-md-4 pb-3">
              <FormInput
                {...formDataAddress.country}
                className="form-control base-input"
                onTurnDirty={handleTurnDirtyAddress}
                onChange={handleInputChangeAddress}
              />
              <div className="form-error">{formDataAddress.city.message}</div>
            </div>
          </div>

          <div className="button-signup-container">
            <div onClick={handleCancelClick}>
              <ButtonInverse text="Cancelar" />
            </div>
            <div className="button-confirm">
              <ButtonPrimary text="Cadastrar" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
