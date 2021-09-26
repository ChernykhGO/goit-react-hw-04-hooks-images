import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

import "./App.css";
import pixabayApi from "./services/pixabayApi";
import Searchbar from "./components/Searchbar/Searchbar";
import "react-toastify/dist/ReactToastify.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ComponentLoader from "./components/Loader/Loader";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState();

  useEffect(() => {
    setLoading(true);
    pixabayApi
      .fetchApi()
      .then((data) => setImages(data.hits))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // console.log("Рендер");
    if (!inputText) {
      // console.log("Инпут пустой, не фетчим");
      return;
    }
    setLoading(true);
    setPage(1);
    setImages([]);

    pixabayApi
      .fetchApi(inputText)
      .then((data) => {
        setImages(data.hits);
        // setPage((prevState) => prevState + 1);
      })
      .catch((error) => setError(error.message))
      .finally(() => {
        setLoading(false);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  }, [inputText]);

  const handleLoadMore = () => {
    setLoading(true);
    pixabayApi
      .fetchApi(inputText, page + 1)
      .then((data) => {
        setImages((prevState) => [...prevState, ...data.hits]);
        setPage((prevState) => prevState + 1);
      })
      .catch((error) => setError(error.message))
      .finally(() => {
        setLoading(false);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
          // document.addEventListener("keydown", escFunction)
        });
      });
  };

  useEffect(() => {
    const escFunction = (event) => {
      if (event.keyCode === 27) {
        // console.log('You pressed a "enter" key in textbox');
        setShowModal(!showModal);
      }
    };
    window.addEventListener("keydown", escFunction);
  }, [showModal]);

  const toggleModal = (largeImageURL) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={setInputText} images={images} loading={loading} />
      {error && <h1>{error.message}</h1>}
      {loading && <ComponentLoader />}
      {images && <ImageGallery images={images} onClick={toggleModal} />}
      {images.length > 0 && <Button handleLoadMore={handleLoadMore} />}

      {showModal && (
        <Modal onClick={toggleModal} largeImageURL={largeImageURL} />
      )}
      <ToastContainer autoClose={3000} position="top-center" />
    </div>
  );
}
