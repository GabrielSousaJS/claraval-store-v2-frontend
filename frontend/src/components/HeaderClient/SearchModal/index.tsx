import searchIcon from "../../../assets/icons/searchIcon.svg";
import cancelIcon from "../../../assets/icons/cancelIcon.svg";
import { useContext, useState, useRef, useEffect } from "react";
import { ContextSearch } from "../../../utils/context-search";
import { useNavigate } from "react-router-dom";

type Props = {
  onSearchModalClose: Function;
};

export default function SearchModal({ onSearchModalClose }: Props) {
  const { setContextSearch } = useContext(ContextSearch);

  const navigate = useNavigate();

  const [text, setText] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleChange(event: any) {
    setText(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContextSearch(text);
    onSearchModalClose();
    navigate("/");
  }

  return (
    <div className="modal-background" onClick={() => onSearchModalClose()}>
      <div
        className="modal-search-box d-flex align-items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="search-bar d-flex m-auto w-75">
          <input
            className="border-0 text-light p-3"
            value={text}
            type="text"
            placeholder="Pesquisar"
            onChange={handleChange}
            ref={inputRef}
          />
          <div className="d-flex flex-row-reverse">
            <button type="submit">
              <img src={searchIcon} alt="Pesquisar" />
            </button>
            <button onClick={() => onSearchModalClose()}>
              <img src={cancelIcon} alt="Cancelar" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
