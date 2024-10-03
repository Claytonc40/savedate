import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/2 rounded-lg bg-white bg-opacity-90 p-6 text-black shadow-lg dark:bg-boxdark-2 dark:bg-opacity-100 dark:text-bodydark1">
        <button
          onClick={onClose}
          className="float-right mb-2 rounded bg-meta-10 px-4 py-2 font-bold text-white hover:bg-blue-700 dark:bg-red dark:hover:bg-rose-600"
        >
          Fechar
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
