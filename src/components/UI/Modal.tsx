import React, { FC, ReactNode, MouseEvent } from 'react';
import Portal from '../Portal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  disableBackgroundClose?: boolean;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
  disableBackgroundClose = false,
}) => {
  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !disableBackgroundClose) {
      onClose();
    }
  };

  return (
    <Portal>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[1000] bg-white bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70 flex justify-center items-center p-4 transition-opacity duration-300 ease-out"
        onClick={handleBackdropClick}
      >
        {/* Modal Content Container */}
        <div
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out scale-100 ${className}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;