import "./styles.css";

import { useContext, useState } from "react";
import { ContextSearch } from "../../../utils/context-search";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../../assets/icons/search.svg";
import cancelIcon from "../../../assets/icons/cancel.svg";

export default function SearchBar() {
  const { setContextSearch } = useContext(ContextSearch);

  const navigate = useNavigate();

  const [text, setText] = useState<string>("");

  function handleChange(event: any) {
    setText(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContextSearch(text);
    navigate("/");
  }

  function handleClear() {
    setText("");
  }

  return (
    <form
      className="search-bar d-flex justify-content-between align-items-center ms-1 me-1"
      onSubmit={handleSubmit}
    >
      <input
        className=" border-0 text-light p-3"
        value={text}
        type="text"
        placeholder="Pesquisar"
        onChange={handleChange}
      />
      <div className="d-flex flex-row-reverse">
        <button type="submit">
          <img src={searchIcon} alt="Pesquisar" />
        </button>
        {text.length > 0 && (
          <button onClick={handleClear}>
            <img src={cancelIcon} alt="Cancelar" />
          </button>
        )}
      </div>
    </form>
  );
}
