import React from "react";
import css from "./ImageCard.module.css";

export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  description?: string;
  alt_description?: string;
}

interface ImageCardProps {
  img: Image;
  handleImageClick: (imgData: {
    imgSrc: string;
    imgDescription?: string;
    imgAltDescription?: string;
  }) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ img, handleImageClick }) => {
  const imgModData = {
    imgSrc: img.urls.regular,
    imgDescription: img.description,
    imgAltDescription: img.alt_description,
  };
  return (
    <div className={css.imageBlock}>
      <img
        className={css.image}
        src={img.urls.small}
        alt={img.alt_description}
        width="350"
        onClick={() => handleImageClick(imgModData)}
      />
    </div>
  );
};
export default ImageCard;
