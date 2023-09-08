import "./styles.css";

import CompanyLogo from "../../components/CompanyLogo";
import FormInput from "../../components/FormInput";
import FormPassword from "../../components/FormPassword";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { ContextToken } from "../../utils/context-token";
import { ContextCartCount } from "../../utils/context-cart";
import * as forms from "../../utils/forms";
import * as authService from "../../services/auth-service";
import * as orderService from "../../services/order-service";
import * as orderUtils from "../../utils/orders";

export default function Login() {
  const { setContextTokenPayload } = useContext(ContextToken);

  const { setContextCartCount } = useContext(ContextCartCount);

  const [submitResponseFail, setSubmitResponseFail] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    username: {
      value: "",
      id: "username",
      name: "username",
      type: "text",
      placeholder: "E-mail",
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

  function handleChangeType(event: any) {
    event.preventDefault();
    setFormData(forms.changeType(formData, "password"));
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    setSubmitResponseFail(false);

    const formDataValidated = forms.dirtyAndValidateAll(formData);

    if (forms.hasAnyInvalid(formDataValidated)) {
      setFormData(formDataValidated);
      return;
    }

    authService
      .loginRequest(forms.toValues(formDataValidated))
      .then((response) => {
        authService.saveAccessToken(response.data.access_token);
        setContextTokenPayload(authService.getAccessTokenPayload());
        getCartCount();
        navigate("/");
      })
      .catch(() => {
        setSubmitResponseFail(true);
      });
  }

  function getCartCount() {
    orderService.getOrdersByClientRequest().then((response) => {
      setContextCartCount(
        orderUtils.hasOpenOrder(response.data)?.items.length || 0
      );
    });
  }

  return (
    <main className="modal-center-box p-4 login-container">
      <div className="text-center">
        <CompanyLogo profile="/" />
      </div>
      <h3 className="text-dark fw-light pt-4 pb-3">Login</h3>

      {submitResponseFail && (
        <div className="text-center">
          <p className="d-inline-flex p-3 fw-bold form-login-error">
            E-mail ou senha incorretos
          </p>
        </div>
      )}

      <form>
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
          <FormPassword
            {...formData.password}
            className="form-control base-input"
            onChange={handleInputChange}
            onTurnDirty={handleTurnDirty}
            onChangeType={handleChangeType}
          />
          <div className="form-error">{formData.password.message}</div>
        </div>

        <div onClick={handleSubmit} className="pt-3">
          <ButtonPrimary text="Continuar" />
        </div>

        <div className="pt-3 text-center">
          Ainda não tem cadastro?
          <Link to={"/signup"} className="ps-2">
            Cadastre-se
          </Link>
        </div>
      </form>
    </main>
  );
}
