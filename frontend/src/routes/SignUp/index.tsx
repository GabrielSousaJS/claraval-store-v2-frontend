import "./styles.css";

import CompanyLogo from "../../components/CompanyLogo";
import FormInput from "../../components/FormInput";
import ButtonInverse from "../../components/ButtonInverse";
import { useState } from "react";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import * as forms from "../../utils/forms";
import * as formatters from "../../utils/formatters";
import * as viaCepService from "../../services/viacep-service";

export default function SignUp() {
  const [formDataUser, setFormDataUser] = useState<any>({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Nome",
      validation: function (value: string) {
        return /^.{3,80}$/.test(value);
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
        const date = new Date(value);
        const currentDate = new Date();
        const eighteenYearsAgo = new Date(
          currentDate.getFullYear() - 18,
          currentDate.getMonth(),
          currentDate.getDate()
        );

        if (date <= eighteenYearsAgo) return true;
        else return false;
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
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
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
        return /^.{8,}$/.test(value);
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
        return /^\S.{2}[a-zA-Z\s\d\W]*$/g.test(value);
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
        return /^[0-9]{5}-[0-9]{3}$/.test(value);
      },
      message: "Informe um CEP válido",
    },
    number: {
      value: "",
      id: "number",
      name: "number",
      type: "number",
      placeholder: "Número",
      validation: function (value: any) {
        const numberAddress = Number(value).toFixed(0);
        return Number(numberAddress) > 0;
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
        return /^\S.{2}[a-zA-Z\s\d\W]*$/g.test(value);
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
        return /^.{3,100}$/.test(value);
      },
      message: "Campo inválido",
    },
    state: {
      value: "",
      id: "state",
      name: "state",
      type: "text",
      placeholder: "Estado",
      validation: function (value: string) {
        return /^.{2,100}$/.test(value);
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
        return /^.{3,100}$/.test(value);
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

    if (validateCEP(event.target.value) && event.target.name === "cep")
      getCep(event.target.value);
  }

  function validateCEP(cep: string): boolean {
    return /^[0-9]{5}-[0-9]{3}$/.test(cep);
  }

  function getCep(cep: string) {
    viaCepService.getCepRequest(cep.replace("-", "")).then((response) => {
      if (response.data.erro) return;

      setFormDataAddress(
        forms.cepToFormAddress(formDataAddress, response.data)
      );
    });
  }

  function handleCancelClick(event: any) {
    event.preventDefault();
    navigate("/");
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    const requestBody = forms.toValues(formDataUser);
    requestBody.birthDate = formatters.formatDate(requestBody.birthDate);
    requestBody.address = forms.toValues(formDataAddress);
    console.log(requestBody);
  }

  return (
    <main className="signup-container ps-2 pe-2">
      <div className="container p-3 base-card">
        <div className="text-center pb-4">
          <CompanyLogo />
        </div>

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
              <FormInput
                {...formDataUser.password}
                className="form-control base-input"
                onTurnDirty={handleTurnDirtyUser}
                onChange={handleInputChangeUser}
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
    </main>
  );
}
