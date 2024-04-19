import "./App.module.css";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { getFetchImg } from "../../services/api";

function App() {
  const [page, setPage] = useState(1);
  const [query, setSearchQuery] = useState("");
  const [imageGallery, setImageGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageModalData, setImageModalData] = useState({
    imgSrc: "",
    imgDescription: "",
    imgAltDescription: "",
  });

  const per_page = 12;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (!query) return;
    async function fetchImages() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getFetchImg(page, per_page, query);
        setImageGallery((prevImages) => [...prevImages, ...data.results]);

        setShowBtn(page < data.total_pages);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
        // setShowBtn(true);
        if (page > 1) {
          window.scrollBy({
            top: window.innerHeight - 200,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    }
    fetchImages();
  }, [query, page, per_page]);

  const onSetSearchQuery = (query) => {
    setSearchQuery(query);
    setPage(1);
    setImageGallery([]);
  };
  const onNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handleImageClick = (img) => {
    setImageModalData(img);
    openModal();
  };

  return (
    <div>
      <SearchBar onSetSearchQuery={onSetSearchQuery} />
      {isError && <ErrorMessage />}

      <ImageGallery
        imageGallery={imageGallery}
        handleImageClick={handleImageClick}
      />
      {isLoading && <Loader />}
      <ImageModal
        style={customStyles}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        {...imageModalData}
      />
      {showBtn && <LoadMoreBtn onLoadMore={onNextPage} />}
    </div>
  );
}

export default App;
