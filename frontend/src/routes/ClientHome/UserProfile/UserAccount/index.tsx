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

  const [formData, setFormData] = useState<any>({
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

  const [dialogInfo, setDialogInfo] = useState({
    visible: false,
    message: "Faça o login novamente devido as alterações realizadas",
  });

  const [user, setUser] = useState<UserDTO>();

  const navigate = useNavigate();

  useEffect(() => {
    userService.getProfileRequest().then((response) => {
      setUser(response.data);
      response.data.birthDate = formatters.formatDateToUS(
        response.data.birthDate
      );
      setFormData(forms.updateAll(formData, response.data));
    });
  }, []);

  function handleInputChange(event: any) {
    setFormData(
      forms.updateAndValidate(formData, event.target.name, event.target.value)
    );
  }

  function handleTurnDirty(name: string) {
    setFormData(forms.dirtyAndValidate(formData, name));
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    const formDataValidated = forms.dirtyAndValidateAll(formData);

    if (forms.hasAnyInvalid(formDataValidated)) {
      setFormData(formDataValidated);
      return;
    }

    const requestBody = forms.toValues(formDataValidated);
    requestBody.birthDate = formatters.formatDateToISO(requestBody.birthDate);

    if (user)
      return userService
        .updateClientRequest(user.id, requestBody)
        .then(() => {
          setDialogInfo({ ...dialogInfo, visible: true });
          setContextTokenPayload(undefined);
          setUser(undefined);
          navigate("/login");
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
    <section className="base-card p-3 ms-2 me-2">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-8 pb-2">
            <FormInput
              {...formData.name}
              className="form-control base-input"
              onTurnDirty={handleTurnDirty}
              onChange={handleInputChange}
            />
            <div className="form-error">{formData.name.message}</div>
          </div>
          <div className="col-md-4 pb-2">
            <FormInput
              {...formData.birthDate}
              className="form-control base-input"
              onTurnDirty={handleTurnDirty}
              onChange={handleInputChange}
            />
            <div className="form-error">{formData.birthDate.message}</div>
          </div>
          <div className="col-12 pb-4">
            <FormInput
              {...formData.email}
              className="form-control base-input"
              onTurnDirty={handleTurnDirty}
              onChange={handleInputChange}
            />
            <div className="form-error">{formData.email.message}</div>
          </div>
        </div>

        <div className="text-end">
          <div className="d-inline-block">
            <ButtonPrimary text="Salvar alterações" />
          </div>
        </div>
      </form>

      {dialogInfo.visible && (
        <DialogInfo
          onDialogClose={handleDialogInfoClose}
          message={dialogInfo.message}
        />
      )}
    </section>
  );
}
