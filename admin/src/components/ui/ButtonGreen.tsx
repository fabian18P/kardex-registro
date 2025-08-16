import React from 'react';

interface ButtonGreenProps {
  text: string; // Texto del botón
  onClick?: () => void; // Función para manejar el evento de clic (opcional)
  type?: "button" | "submit" | "reset"; // Agrega 'type' como opcional
  disabled?: boolean; // Agregar disabled
}

const ButtonGreen: React.FC<ButtonGreenProps> = ({ 
  text, 
  onClick, 
  type = "button",     // ← USAR EL TYPE (por defecto "button")
  disabled = false     // ← USAR DISABLED (por defecto false)
}) => {
  return (
    <button 
      onClick={onClick}
      type={type}         // ← AGREGAR ESTA LÍNEA
      disabled={disabled} // ← AGREGAR ESTA LÍNEA
      className="bg-green-600 text-sm px-10 py-2 rounded-md cursor-pointer hover:bg-green-800 transition-colors duration-300 text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
    >
      {text}
    </button>
  );
};

export default ButtonGreen;