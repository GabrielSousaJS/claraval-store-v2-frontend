import "./styles.css";

import CompanyLogo from "../../components/CompanyLogo";
import FormInput from "../../components/FormInput";
import ButtonInverse from "../../components/ButtonInverse";
import { useState } from "react";
import { ButtonPrimary } from "../../components/ButtonPrimary";

export default function SignUp() {
  const [formData, setFormData] = useState<any>({
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
      type: "text",
      placeholder: "Data de nascimento",
      validation: function (value: string) {
        return /^.{3,80}$/.test(value);
      },
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
    address: {
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
          return /^.{3,100}$/.test(value);
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
    },
  });

  return (
    <main className="signup-container ps-2 pe-2">
      <div className="container p-3 base-card">
        <div className="text-center pb-4">
          <CompanyLogo />
        </div>

        <form>
          <div className="row">
            <div className="col-md-8 pb-2">
              <FormInput
                {...formData.name}
                className="form-control base-input"
                onTurnDirty={() => {}}
                onChange={() => {}}
              />
              <div className="form-error">{formData.name.message}</div>
            </div>
            <div className="col-md-4 pb-2">
              <FormInput
                {...formData.birthDate}
                className="form-control base-input"
                onTurnDirty={() => {}}
                onChange={() => {}}
              />
              <div className="form-error">{formData.birthDate.message}</div>
            </div>
            <div className="col-sm-12 pb-2">
              <FormInput
                {...formData.email}
                className="form-control base-input"
                onTurnDirty={() => {}}
                onChange={() => {}}
              />
              <div className="form-error">{formData.email.message}</div>
            </div>
            <div className="col-sm-12 pb-2">
              <FormInput
                {...formData.password}
                className="form-control base-input"
                onTurnDirty={() => {}}
                onChange={() => {}}
              />
              <div className="form-error">{formData.password.message}</div>
            </div>
            <div className="col-sm-12 pb-2">
              <FormInput
                {...formData.address.cep}
                className="form-control base-input"
                onTurnDirty={() => {}}
                onChange={() => {}}
              />
              <div className="form-error">{formData.address.cep.message}</div>
            </div>
            <div className="col-md-6 pb-2">
              <FormInput
                {...formData.address.street}
                className="form-control base-input"
                onTurnDirty={() => {}}
                onChange={() => {}}
              />
              <div className="form-error">
                {formData.address.street.message}
              </div>
            </div>
            <div className="col-md-6 pb-2">
              <FormInput
                {...formData.address.number}
                className="form-control base-input"
                onTurnDirty={() => {}}
                onChange={() => {}}
              />
              <div className="form-error">
                {formData.address.number.message}
              </div>
            </div>
            <div className="col-md-6 pb-2">
              <FormInput
                {...formData.address.neighborhood}
                className="form-control base-input"
                onTurnDirty={() => {}}
                onChange={() => {}}
              />
              <div className="form-error">
                {formData.address.neighborhood.message}
              </div>
            </div>
            <div className="col-md-6 pb-2">
              <FormInput
                {...formData.address.complement}
                className="form-control base-input"
                onTurnDirty={() => {}}
                onChange={() => {}}
              />
              <div className="form-error">
                {formData.address.complement.message}
              </div>
            </div>
            <div className="col-md-4 pb-2">
              <FormInput
                {...formData.address.city}
                className="form-control base-input"
                onTurnDirty={() => {}}
                onChange={() => {}}
              />
              <div className="form-error">{formData.address.city.message}</div>
            </div>
            <div className="col-md-4 pb-2">
              <FormInput
                {...formData.address.state}
                className="form-control base-input"
                onTurnDirty={() => {}}
                onChange={() => {}}
              />
              <div className="form-error">{formData.address.state.message}</div>
            </div>
            <div className="col-md-4 pb-3">
              <FormInput
                {...formData.address.country}
                className="form-control base-input"
                onTurnDirty={() => {}}
                onChange={() => {}}
              />
              <div className="form-error">{formData.address.city.message}</div>
            </div>
          </div>

          <div className="button-signup-container">
            <div>
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
