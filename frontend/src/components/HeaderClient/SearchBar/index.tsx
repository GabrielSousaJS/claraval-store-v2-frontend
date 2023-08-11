import "./styles.css";

import { useState } from "react";
import searchIcon from "../../../assets/icons/search.svg";
import cancelIcon from "../../../assets/icons/cancel.svg";

export default function SearchBar() {
  const [text, setText] = useState("");

  function handleChange(event: any) {
    setText(event.target.value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="search-bar d-flex justify-content-between align-items-center ms-1 me-1"
    >
      <input
        className=" border-0 text-light p-3"
        value={text}
        type="text"
        placeholder="Pesquisar"
        onChange={handleChange}
      />
      <button>
        <img src={cancelIcon} alt="Cancelar" />
      </button>
      <button type="submit">
        <img src={searchIcon} alt="Pesquisar" />
      </button>
    </form>
  );
}
