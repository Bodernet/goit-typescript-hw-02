import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ imageGallery, handleImageClick }) => {
  return (
    <ul className={css.gallery}>
      {imageGallery &&
        Array.isArray(imageGallery) &&
        imageGallery.map((img) => {
          return (
            <li key={img.id}>
              <ImageCard img={img} handleImageClick={handleImageClick} />
            </li>
          );
        })}
    </ul>
  );
};

export default ImageGallery;
