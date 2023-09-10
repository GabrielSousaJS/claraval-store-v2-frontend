import "../styles.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import CompanyLogo from "../../../components/CompanyLogo";
import FormInput from "../../../components/FormInput";
import ButtonInverse from "../../../components/ButtonInverse";
import DialogInfo from "../../../components/DialogInfo";
import * as validation from "../../../utils/validations";
import * as forms from "../../../utils/forms";
import * as authService from "../../../services/auth-service";

export default function Email() {
  const [dialogInfoData, setDialogInfoData] = useState<any>({
    visible: false,
    message: "E-mail enviado com sucesso!",
  });

  const [submitResponseFail, setSubmitResponseFail] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    email: {
      value: "",
      id: "email",
      name: "email",
      type: "text",
      placeholder: "E-mail",
      validation: function (value: string) {
        return validation.emailValidation(value);
      },
      message: "Por favor, digite um email válido",
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

  function handleCancel() {
    navigate("/login");
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    setSubmitResponseFail(false);

    const formDataValidated = forms.dirtyAndValidateAll(formData);

    if (forms.hasAnyInvalid(formDataValidated)) {
      setFormData(formDataValidated);
      return;
    }

    const requestBody = forms.toValues(formDataValidated);

    authService
      .createRecoverTokenRequest(requestBody)
      .then(() => {
        setDialogInfoData({ ...dialogInfoData, visible: true });
      })
      .catch(() => {
        setSubmitResponseFail(true);
      });
  }

  function handleDialogInfoClose() {
    setDialogInfoData({ ...dialogInfoData, visible: false });
  }

  return (
    <div>
      <div className="modal-center-box p-4 recover-password-container">
        <div className="text-center">
          <CompanyLogo profile="/" />
        </div>
        <div className="text-dark">
          <h5 className="fw-light pt-4 pb-3">Recuperar senha</h5>
          <p className="pb-3">
            Insira o e-mail para que seja enviado o link para recuperação de
            senha.
          </p>
        </div>

        {submitResponseFail && (
          <div className="text-center">
            <p className="d-inline-flex p-3 fw-bold form-recover-password-error">
              E-mail não encontrado no banco de dados
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="pt-3">
            <FormInput
              {...formData.email}
              className="form-control base-input"
              onChange={handleInputChange}
              onTurnDirty={handleTurnDirty}
            />
            <div className="form-error">{formData.email.message}</div>
          </div>

          <div className="d-flex justify-content-between pt-3">
            <div onClick={handleCancel}>
              <ButtonInverse text="Cancelar" />
            </div>
            <div>
              <ButtonPrimary text="Enviar" />
            </div>
          </div>
        </form>
      </div>

      {dialogInfoData.visible && (
        <DialogInfo
          message={dialogInfoData.message}
          onDialogClose={handleDialogInfoClose}
        />
      )}
    </div>
  );
}
