import { Component } from "react";
import { ToastContainer } from "react-toastify";

import "./App.css";
import pixabayApi from "./services/pixabayApi";
import Searchbar from "./components/Searchbar/Searchbar";
import "react-toastify/dist/ReactToastify.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ComponentLoader from "./components/Loader/Loader";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";

export default class App extends Component {
  state = {
    inputText: "",
    loading: false,
    eror: null,
    page: 1,
    images: [],
    showModal: false,
    largeImageURL: "",
  };

  componentDidMount() {
    this.setState({ loading: true });
    // this.setState({ loading: true, images: [], page: 1 });
    pixabayApi
      .fetchApi("yellow", this.state.page)
      .then((data) => this.setState({ images: data.hits }))
      .catch((error) => this.setState(error))
      .finally(() => this.setState({ loading: false }));
    document.addEventListener("keydown", this.escFunction);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.inputText !== prevState.inputText) {
      this.setState({ loading: true, images: [], page: 1 });
      setTimeout(() => {
        pixabayApi
          .fetchApi(this.state.inputText, this.state.page)
          .then((data) => {
            if (data.hits.length > 0) {
              this.setState({ images: data.hits });
            }
          })
          .catch((error) => this.setState(error))
          .finally(() => this.setState({ loading: false }));
      }, 500);

      if (this.state.page !== prevState.page) {
        this.handleLoadMore();
      }
      //     // console.log('Change')
      //     // console.log(prevState.inputText);
      //   // console.log(this.state.inputText);
      //   this.setState({loading: true, images: [], page: 1})
      //   setTimeout(()=>{
      //     pixabayApi.fetchApi(this.state.inputText, this.state.page).then(data => {
      //       this.setState(prevState => ({images: data.hits}));
      //       // console.log(this.state.images);
      //       // console.log(this.state.page);
      //   })
      //   .catch(error => this.setState({error}))
      // .finally (() => this.setState({loading: false}))
      //   },500)
    }
  }

  handleSubmit = (inputText) => {
    // console.log(inputText);
    this.setState({ inputText });
  };

  handleLoadMore = () => {
    this.setState({ loading: true });
    // console.log(this.state.page);
    // console.log(this.state.images);
    setTimeout(() => {
      pixabayApi
        .fetchApi(this.state.inputText, this.state.page + 1)
        .then((data) => {
          this.setState((prevState) => ({
            images: [...prevState.images, ...data.hits],
            page: prevState.page + 1,
          }));
          // console.log(this.state.page);
          // console.log(this.prevState.images);
          // console.log(data.hits);
        })
        .catch((error) => this.setState(error))
        .finally(() =>
          this.setState(
            { loading: false },
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            })
          )
        );
    }, 500);
  };

  toggleModal = (largeImageURL) => {
    this.setState((state) => ({
      showModal: !state.showModal,
      largeImageURL: largeImageURL,
    }));
  };

  escFunction = (event) => {
    if (event.keyCode === 27) {
      // console.log('You pressed a "enter" key in textbox');
      this.toggleModal();
    }
  };

  render() {
    const { images, loading, error, showModal, largeImageURL } = this.state;
    return (
      <div className="App">
        <Searchbar
          onSubmit={this.handleSubmit}
          images={images}
          loading={loading}
        />
        {error && <h1>{error.message}</h1>}
        {loading && <ComponentLoader />}
        {images && <ImageGallery images={images} onClick={this.toggleModal} />}
        {images.length > 0 && <Button handleLoadMore={this.handleLoadMore} />}
        {showModal && (
          <Modal onClick={this.toggleModal} largeImageURL={largeImageURL} />
        )}
        <ToastContainer autoClose={3000} position="top-center" />
      </div>
    );
  }
}

// {/* {images.length === 0 && !loading && (
//   <h1>Картинок с таким названием не найденоoo!</h1>
// )} */}
// {/* {!this.state.inputText && <div>Введите имя пакемона</div>} */}
