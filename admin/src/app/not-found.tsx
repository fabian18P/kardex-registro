import React from 'react';

const NotFound = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#2F1700]">
      <div style={{ padding: '20px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' }}>
        <h2>404 - Página no encontrada</h2>
        <p>Lo sentimos, no podemos encontrar la página que buscas.</p>
      </div>
    </div>
  );
};

export default NotFound;