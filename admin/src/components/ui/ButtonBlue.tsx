import React from 'react';

interface ButtonBlueProps {
  text: string; // Texto del botón
  onClick: () => void; // Función para manejar el evento de clic
}

const ButtonBlue: React.FC<ButtonBlueProps> = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="bg-blue-600 text-sm px-10 py-2 rounded-md cursor-pointer hover:bg-blue-800 transition-colors duration-300 text-white">
      {text}
    </button>
  );
};

export default ButtonBlue;