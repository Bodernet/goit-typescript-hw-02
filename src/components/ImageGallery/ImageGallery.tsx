import React from "react";
import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { Image } from "../ImageCard/ImageCard";

interface ImageGalleryProps {
  imageGallery: Image[];
  handleImageClick: (imgData: {
    imgSrc: string;
    imgDescription?: string;
    imgAltDescription?: string;
  }) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  imageGallery,
  handleImageClick,
}) => {
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
