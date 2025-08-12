// src/app/global-error.tsx
'use client'; // Necesario para que el componente se ejecute en el cliente

import React from 'react';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error, reset: () => void }) {
  useEffect(() => {
    // Aquí puedes hacer lo que desees con el error, como reportarlo a un servicio externo.
    console.error('Error capturado globalmente:', error);
  }, [error]);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' }}>
      <h2>Ha ocurrido un error en la aplicación</h2>
      <p>{error.message || 'Algo salió mal. Intenta nuevamente más tarde.'}</p>
      <button onClick={() => reset()}>Reintentar</button>
    </div>
  );
}