import React from "react";
import Modal from "react-modal";
import css from "./ImageModal.module.css";

interface ImageModalProps {
  closeModal: () => void;
  modalIsOpen: boolean;
  imgSrc?: string;
  imgAltDescription?: string;
  imgDescription?: string;
}

Modal.setAppElement("#root");

const ImageModal: React.FC<ImageModalProps> = ({
  closeModal,
  modalIsOpen,
  imgSrc = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
  imgAltDescription = "Regular gallery image",
  imgDescription = "Big image",
}) => {
  return (
    <Modal
      className={css.Modal}
      overlayClassName={css.Overlay}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
    >
      <div>
        <div>
          <img className={css.image} src={imgSrc} alt={imgAltDescription} />
        </div>
        <div className={css.Description}>{imgDescription}</div>
      </div>
    </Modal>
  );
};

export default ImageModal;
