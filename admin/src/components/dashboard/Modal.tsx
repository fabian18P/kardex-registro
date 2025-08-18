import React from "react";
import { ButtonGreen } from "../ui";

interface ModalProps {
  isOpen: boolean;
  tituloModal?: string;
  onClose: () => void;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitText?: string;
  loading?: boolean;
  showSubmitButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  tituloModal, 
  onClose, 
  children, 
  onSubmit,
  submitText = "Registrar",
  loading = false,
  showSubmitButton = true
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit && !loading) {
      onSubmit();
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className="bg-white rounded-lg p-6 w-1/2 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#311800]">{tituloModal}</h2>
          <button 
            onClick={onClose} 
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            X
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6 max-h-[50vh] overflow-y-auto pr-2">
            {children}
          </div>
          
          {showSubmitButton && (
            <div className="flex justify-end gap-2">
              <ButtonGreen 
                text={loading ? "Procesando..." : submitText} 
                type="submit"
                disabled={loading}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Modal;