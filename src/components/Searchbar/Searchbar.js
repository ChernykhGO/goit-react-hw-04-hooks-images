import { Component } from "react";
import { toast } from "react-toastify";
import s from "./Searchbar.module.css";

export default class Searchbar extends Component {
  state = {
    inputText: "",
  };

  //  обновление стейта на при нажатии на инпут
  handleNameChange = (event) => {
    this.setState({ inputText: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.inputText.trim() === "") {
      // return alert('Введите название в поиске');
      return toast.info("Введите название в строке поиска!");
    }
    this.props.onSubmit(this.state.inputText);
    this.setState({ inputText: "" });

    setTimeout(() => {
      if (this.props.images.length === 0 && !this.props.loading) {
        return toast.info("Картинок с таким названием не найдено!");
      }
    }, 1000);
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputText}
            onChange={this.handleNameChange}
            name="inputText"
          />
        </form>
      </header>
    );
  }
}
