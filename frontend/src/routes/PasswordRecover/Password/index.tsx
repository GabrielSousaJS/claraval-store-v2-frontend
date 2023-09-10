import "../styles.css";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonPrimary } from "../../../components/ButtonPrimary";
import CompanyLogo from "../../../components/CompanyLogo";
import FormPassword from "../../../components/FormPassword";
import DialogInfo from "../../../components/DialogInfo";
import * as validation from "../../../utils/validations";
import * as forms from "../../../utils/forms";
import * as authService from "../../../services/auth-service";

export default function Password() {
  const [dialogInfoData, setDialogInfoData] = useState<any>({
    visible: false,
    message: "Senha alterada com sucesso!",
  });

  const navigate = useNavigate();

  const params = useParams();

  const [formData, setFormData] = useState<any>({
    password: {
      value: "",
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Nova senha",
      validation: function (value: string) {
        return validation.passwordValidation(value);
      },
      message: "A senha deve conter no mínimo 8 caracteres",
    },
  });

  function handleChangeInput(event: any) {
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

    const formDataValidated = forms.dirtyAndValidateAll(formData);

    if (forms.hasAnyInvalid(formDataValidated)) {
      setFormData(formDataValidated);
      return;
    }

    const requestBody = forms.toValues(formDataValidated);
    requestBody.token = params.token;

    authService.saveNewPasswordRequest(requestBody).then(() => {
      setDialogInfoData({ ...dialogInfoData, visible: true });
    });
  }

  function handleDialogInfoClose() {
    setDialogInfoData({ ...dialogInfoData, visible: false });
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }

  return (
    <div>
      <div className="modal-center-box p-4 recover-password-container">
        <div className="text-center">
          <CompanyLogo profile="/" />
        </div>
        <div className="text-dark pt-4 pb-3">
          <h5>Insira a nova senha</h5>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="pt-3">
            <FormPassword
              {...formData.password}
              className="form-control base-input"
              onChange={handleChangeInput}
              onTurnDirty={handleTurnDirty}
              onChangeType={handleChangeType}
            />
            <div className="form-error">{formData.password.message}</div>
          </div>

          <div className="pt-3">
            <ButtonPrimary text="Salvar" />
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
