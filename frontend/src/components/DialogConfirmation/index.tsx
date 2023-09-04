import "./styles.css";

import ButtonInverse from "../ButtonInverse";
import { ButtonPrimary } from "../ButtonPrimary";

type Props = {
  message: string;
  onDialogAnswer: Function;
};

export default function DialogConfirmation({ message, onDialogAnswer }: Props) {
  return (
    <div className="modal-background" onClick={() => onDialogAnswer(false)}>
      <div
        className="modal-center-box p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="pb-4">{message}</h2>
        <div
          className="d-flex justify-content-around"
          onClick={() => onDialogAnswer(false)}
        >
          <div
            className="dialog-confirmation-button"
            onClick={() => onDialogAnswer(false)}
          >
            <ButtonInverse text="Não" />
          </div>
          <div
            className="dialog-confirmation-button"
            onClick={() => onDialogAnswer(true)}
          >
            <ButtonPrimary text="Sim" />
          </div>
        </div>
      </div>
    </div>
  );
}
