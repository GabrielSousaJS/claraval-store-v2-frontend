import "./styles.css";

import hideIcon from "../../assets/icons/hideIcon.svg";
import showIcon from "../../assets/icons/showIcon.svg";

export default function FormPassword(props: any) {
  const {
    className,
    validation,
    invalid = "false",
    dirty = "false",
    onTurnDirty,
    onChangeType,
    ...inputProps
  } = props;

  function handleBlur() {
    onTurnDirty(props.name);
  }

  return (
    <div
      className={`d-flex justify-content-between align-items-center ${className}`}
      data-dirty={dirty}
      data-invalid={invalid}
    >
      <input
        {...inputProps}
        className="password-input"
        type={inputProps.type}
        onBlur={handleBlur}
      />
      <button onClick={onChangeType}>
        <img
          src={inputProps.type === "password" ? hideIcon : showIcon}
          alt=""
        />
      </button>
    </div>
  );
}
