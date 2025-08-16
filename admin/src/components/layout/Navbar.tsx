"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth(); // Obtén el usuario y la función de logout
  const router = useRouter();
  
  const handleLogout = () => {
    logout(); // Llama a la función logout cuando el usuario haga clic en "Cerrar sesión"
    router.replace("/auth/login");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 shadow-md bg-[#EFA52F] text-[#311800]">
      <div className="flex items-center gap-2 text-xs">
        <p className="border px-2.5 py-0.5 rounded-full border-[#311800]">{user?.rol_nombre.toUpperCase()}</p>
      </div>
      
      <div>
      <button onClick={handleLogout} className="bg-red-600 text-sm px-10 py-2 rounded-md cursor-pointer hover:bg-red-800 transition-colors duration-300 text-white">
        Cerrar sesión
      </button>
      </div>
    </div>
  );
};

export default Navbar;