import "./styles.css";

import { useContext, useEffect, useState } from "react";
import { ContextToken } from "../../../../utils/context-token";
import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../../../../components/ButtonPrimary";
import { UserDTO } from "../../../../models/user";
import FormInput from "../../../../components/FormInput";
import DialogInfo from "../../../../components/DialogInfo";
import * as validation from "../../../../utils/validations";
import * as forms from "../../../../utils/forms";
import * as userService from "../../../../services/user-service";
import * as formatters from "../../../../utils/formatters";

export default function UserAccount() {
  const { setContextTokenPayload } = useContext(ContextToken);

  const [formDataUser, setFormDataUser] = useState<any>({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Nome",
      validation: function (value: string) {
        return validation.legthDefaultValidation(value);
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
  });

  const [formDataPassword, setFormDataPassword] = useState<any>({
    oldPassword: {
      value: "",
      id: "oldPassword",
      name: "oldPassword",
      type: "password",
      placeholder: "(Deixe em branco para não alterar)",
      validation: function (value: string) {
        return validation.passwordValidation(value);
      },
      message: "A senha deve conter no mínimo 8 caracteres",
    },
    newPassword: {
      value: "",
      id: "newPassword",
      name: "newPassword",
      type: "password",
      placeholder: "(Deixe em branco para não alterar)",
      validation: function (value: string) {
        return validation.passwordValidation(value);
      },
      message: "A senha deve conter no mínimo 8 caracteres",
    },
    newConfirmationPassword: {
      value: "",
      id: "newConfirmationPassword",
      name: "newConfirmationPassword",
      type: "password",
      validation: function (value: string) {
        return validation.passwordValidation(value);
      },
      message: "A senha deve conter no mínimo 8 caracteres",
    },
  });

  const [dialogInfo, setDialogInfo] = useState({
    visible: false,
    message: "Faça o login novamente devido as alterações realizadas",
  });

  const [submitResponseFail, setSubmitResponseFail] = useState(false);

  const [user, setUser] = useState<UserDTO>();

  const navigate = useNavigate();

  useEffect(() => {
    userService.getProfileRequest().then((response) => {
      setUser(response.data);
      response.data.birthDate = formatters.formatDateToUS(
        response.data.birthDate
      );
      setFormDataUser(forms.updateAll(formDataUser, response.data));
    });
  }, []);

  function handleInputChangeUser(event: any) {
    setFormDataUser(
      forms.updateAndValidate(
        formDataUser,
        event.target.name,
        event.target.value
      )
    );
  }

  function handleTurnDirtyUser(name: string) {
    setFormDataUser(forms.dirtyAndValidate(formDataUser, name));
  }

  function handleInputChangePassword(event: any) {
    setFormDataPassword(
      forms.updateAndValidate(
        formDataPassword,
        event.target.name,
        event.target.value
      )
    );
  }

  function handleTurnDirtyPassword(name: string) {
    setFormDataPassword(forms.dirtyAndValidate(formDataPassword, name));
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    updateUserInformation();
  }

  function updateUserInformation() {
    if (user) {
      const formDataValidated = forms.dirtyAndValidateAll(formDataUser);

      if (forms.hasAnyInvalid(formDataValidated)) {
        setFormDataUser(formDataValidated);
        return;
      }

      const requestBody = forms.toValues(formDataValidated);
      requestBody.birthDate = formatters.formatDateToISO(requestBody.birthDate);

      userService
        .updateClientRequest(user.id, requestBody)
        .then(() => {
          if (validation.validateUpdatePassword(formDataPassword))
            updatePassword();
          else {
            setDialogInfo({ ...dialogInfo, visible: true });
            setContextTokenPayload(undefined);
            setUser(undefined);
          }
        })
        .catch((error) => {
          forms.setBackendErrors(formDataUser, error.response.data.errors);
        });
    }
  }

  function updatePassword() {
    const requestBody = forms.toValues(formDataPassword);
    userService
      .updatePasswordRequest(requestBody)
      .then(() => {
        setSubmitResponseFail(false);
        setDialogInfo({ ...dialogInfo, visible: true });
        setContextTokenPayload(undefined);
        setUser(undefined);
      })
      .catch(() => {
        setSubmitResponseFail(true);
      });
  }

  function handleDialogInfoClose() {
    setDialogInfo({ ...dialogInfo, visible: false });
  }

  return (
    <section className="base-card p-3 ms-2 me-2">
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
          <div className="col-12 pb-4">
            <FormInput
              {...formDataUser.email}
              disabled
              className="form-control base-input"
              onTurnDirty={handleTurnDirtyUser}
              onChange={handleInputChangeUser}
            />
            <div className="form-error">{formDataUser.email.message}</div>
          </div>
        </div>

        <h4 className="pb-3">Alteração de senha</h4>

        {submitResponseFail && (
          <div className="text-center pb-3">
            <div className="d-inline-flex p-3 fw-bold form-password-error">
              A senha atual está incorreta, verifique e tente novamente.
            </div>
          </div>
        )}

        <div className="col-12 pb-3">
          <p className="text-dark fw-bold">Senha atual</p>
          <FormInput
            {...formDataPassword.oldPassword}
            className="form-control base-input"
            onTurnDirty={handleTurnDirtyPassword}
            onChange={handleInputChangePassword}
          />
          <div className="form-error">
            {formDataPassword.oldPassword.message}
          </div>
        </div>
        <div className="col-12 pb-4">
          <p className="text-dark fw-bold">Nova senha</p>
          <FormInput
            {...formDataPassword.newPassword}
            className="form-control base-input"
            onTurnDirty={handleTurnDirtyPassword}
            onChange={handleInputChangePassword}
          />
          <div className="form-error">
            {formDataPassword.newPassword.message}
          </div>
        </div>
        <div className="col-12 pb-3">
          <p className="text-dark fw-bold">Confirmar senha</p>
          <FormInput
            {...formDataPassword.newConfirmationPassword}
            className="form-control base-input"
            onTurnDirty={handleTurnDirtyPassword}
            onChange={handleInputChangePassword}
          />
          <div className="form-error">
            {formDataPassword.newConfirmationPassword.message}
          </div>
        </div>

        <div className="text-end">
          <div className="d-inline-block">
            <ButtonPrimary text="Salvar alterações" />
          </div>
        </div>
      </form>

      {dialogInfo.visible && (
        <div>
          <DialogInfo
            onDialogClose={handleDialogInfoClose}
            onNavigationPage={() => navigate("/login")}
            message={dialogInfo.message}
          />
        </div>
      )}
    </section>
  );
}
