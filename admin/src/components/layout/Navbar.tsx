"use client";

import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth(); // Obtén el usuario y la función de logout

  const handleLogout = () => {
    logout(); // Llama a la función logout cuando el usuario haga clic en "Cerrar sesión"
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 shadow-md bg-[#EFA52F] text-[#311800]">
      <div className="flex items-center gap-2 text-xs">
        <p className="border px-2.5 py-0.5 rounded-full border-[#311800]">{user?.rol_nombre}</p>
      </div>

      <button
        onClick={handleLogout} // Agregado para que cierre sesión al hacer clic
        className="bg-primary text-sm px-10 py-2 rounded-full"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Navbar;