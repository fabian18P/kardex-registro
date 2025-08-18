import { useState, useEffect } from "react";

interface User {
  correo_electronico: string;
  primer_nombre: string;
  apellido_paterno: string;
  rol_id: number;
  rol_nombre: string;
  imagen: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener el token de las cookies
  const getToken = (): string | null => {
    if (typeof document === 'undefined') return null;
    
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("access_token="))
      ?.split("=")[1];
    
    return token || null;
  };

  useEffect(() => {
    // Al montar, recuperar el usuario del localStorage
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
    setLoading(false);
  }, []);

  const login = (userData: User, authToken: string) => {
    localStorage.setItem("user", JSON.stringify(userData));
    // Almacenar el token en una cookie
    document.cookie = `access_token=${authToken}; path=/; max-age=${60 * 60 * 24 * 30}; secure; SameSite=Lax`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    // Eliminar la cookie del token
    document.cookie = "access_token=; path=/; max-age=0; secure; SameSite=Lax";
    setUser(null);
  };

  return { 
    user, 
    loading, 
    login, 
    logout,
    getToken // Exportamos la función para obtener el token
  };
}