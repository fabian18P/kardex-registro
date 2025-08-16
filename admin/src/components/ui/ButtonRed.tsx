import React from 'react';

interface ButtonRedProps {
  text: string; // Texto del botón
  onClick: () => void; // Función para manejar el evento de clic
}

const ButtonRed: React.FC<ButtonRedProps> = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="bg-red-600 text-sm px-10 py-2 rounded-md cursor-pointer hover:bg-red-800 transition-colors duration-300 text-white">
      {text}
    </button>
  );
};

export default ButtonRed;