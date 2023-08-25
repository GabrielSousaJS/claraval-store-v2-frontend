import "./styles.css";

import { ButtonPrimary } from "../ButtonPrimary";

type Props = {
  onDialogClose: Function;
  message: string;
};

export default function DialogInfo({ onDialogClose, message }: Props) {
  return (
    <div className="modal-background" onClick={() => onDialogClose()}>
      <div
        className="p-3 modal-center-box base-card dialog-info-container"
        onClick={(event) => event.stopPropagation()}
      >
        <h4 className="pb-3">{message}</h4>
        <div onClick={() => onDialogClose()}>
          <ButtonPrimary text="OK" />
        </div>
      </div>
    </div>
  );
}
