import "./styles.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import * as forms from "../../utils/forms";
import CompanyLogo from "../../components/CompanyLogo";

export default function Login() {
  const [formData, setFormData] = useState<any>({
    username: {
      value: "",
      id: "username",
      name: "username",
      type: "text",
      placeholder: "Email",
      validation: function (value: string) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value.toLowerCase()
        );
      },
      message: "Por favor, digite um email válido",
    },
    password: {
      value: "",
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Senha",
      validation: function (value: string) {
        return value.length > 0;
      },
      message: "Campo inválido",
    },
  });

  function handleInputChange(event: any) {
    setFormData(
      forms.updateAndValidate(formData, event.target.name, event.target.value)
    );
  }

  function handleTurnDirty(name: string) {
    setFormData(forms.dirtyAndValidate(formData, name));
  }

  function handleSubmit() {
    const requestBody = forms.toValues(formData);
    console.log(requestBody);
  }

  return (
    <main className="modal-center-box p-4 login-container">
      <div className="text-center">
        <CompanyLogo />
      </div>
      <h3 className="text-dark fw-light pt-4">Login</h3>

      <form onSubmit={handleSubmit}>
        <div className="pt-3">
          <FormInput
            {...formData.username}
            className="form-control base-input"
            onChange={handleInputChange}
            onTurnDirty={handleTurnDirty}
          />
          <div className="form-error">{formData.username.message}</div>
        </div>

        <div className="pt-3">
          <FormInput
            {...formData.password}
            className="form-control base-input"
            onChange={handleInputChange}
            onTurnDirty={handleTurnDirty}
          />
          <div className="form-error">{formData.password.message}</div>
        </div>

        <div className="pt-3">
          <ButtonPrimary text="Continuar" />
        </div>

        <div className="pt-3 text-center">
          Ainda não tem cadastro?
          <Link to={"#"} className="ps-2">
            Cadastre-se
          </Link>
        </div>
      </form>
    </main>
  );
}
