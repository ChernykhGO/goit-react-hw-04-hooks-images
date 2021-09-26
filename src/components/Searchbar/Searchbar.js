import React, { useState } from "react";
import { toast } from "react-toastify";
import s from "./Searchbar.module.css";

export default function Searchbar({ onSubmit, images, loading }) {
  const [inputText, setInputText] = useState("");

  const handleNameChange = (event) => {
    setInputText(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputText.trim() === "") {
      return toast.info("Введите название в строке поиска!");
    }
    onSubmit(inputText);
    setInputText("");

    if (images.length === 0 && !loading) {
      return toast.info("Картинок с таким названием не найдено!");
    }
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputText}
          onChange={handleNameChange}
          name="inputText"
        />
      </form>
    </header>
  );
}
