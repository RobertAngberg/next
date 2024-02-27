import React from "react";
import ImageResizer from "./LogoUpload";

type ModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isModalOpen, onClose }) => {
  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white w-3/5 h-3/5 rounded-lg overflow-hidden flex flex-col justify-between p-4">
        <button
          onClick={onClose}
          className="p-2 rounded bg-blue-500 text-white hover:bg-blue-700 absolute top-0 right-0 m-4"
        >
          Stäng
        </button>

        <ImageResizer />
      </div>
    </div>
  );
};

export default Modal;
