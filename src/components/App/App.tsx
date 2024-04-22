import axios, { AxiosResponse } from "axios";
import "./App.module.css";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { Image } from "../ImageCard/ImageCard";

axios.defaults.baseURL = "https://api.unsplash.com";
const ACCESS_KEY = "A3nx2FXRqtZH1-4NqfORpOXAK1JQFT9rylzqShlpDlI";

interface FetchImgParams {
  page: number;
  per_page: number;
  query: string;
}

interface FetchImgResponse {
  total_pages: number;
  results: Image[];
}

interface ModalDataTS {
  imgSrc: string;
  imgDescription?: string;
  imgAltDescription?: string;
}

function App() {
  const [page, setPage] = useState<number>(1);
  const [query, setSearchQuery] = useState<string>("");
  const [imageGallery, setImageGallery] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [imageModalData, setImageModalData] = useState<ModalDataTS>({
    imgSrc: "",
    imgDescription: "",
    imgAltDescription: "",
  });

  const per_page: number = 12;

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

  const getFetchImg = async (
    params: FetchImgParams
  ): Promise<FetchImgResponse> => {
    const { page, per_page, query } = params;
    const response: AxiosResponse<FetchImgResponse> = await axios.get(
      "/search/photos",
      {
        params: {
          client_id: ACCESS_KEY,
          page,
          per_page,
          query,
        },
      }
    );
    return response.data;
  };

  useEffect(() => {
    if (!query) return;
    async function fetchImages() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getFetchImg({ page, per_page, query });
        setImageGallery((prevImages) => [...prevImages, ...data.results]);

        setShowBtn(page < data.total_pages);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
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

  const onSetSearchQuery = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    setImageGallery([]);
  };
  const onNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handleImageClick = (img: ModalDataTS) => {
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
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        {...imageModalData}
      />
      {showBtn && <LoadMoreBtn onLoadMore={onNextPage} />}
    </div>
  );
}

export default App;
