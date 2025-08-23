import React from "react";

interface ModalActualizarProps {
  isOpen: boolean;
  tituloModal?: string;
  onClose: () => void;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitText?: string;
  loading?: boolean;
  showSubmitButton?: boolean;
}

const ModalActualizar: React.FC<ModalActualizarProps> = ({ 
  isOpen, 
  tituloModal, 
  children, 
  onSubmit,
  loading = false,
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
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6 max-h-[50vh] overflow-y-auto pr-2">
            {children}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalActualizar;