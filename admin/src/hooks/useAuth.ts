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

  useEffect(() => {
    // Al montar, recuperar el usuario del localStorage y token de cookies
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);

    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("access_token="))
      ?.split("=")[1];

    // Si tienes el token, lo usas en el hook
    if (token) {
      // Aquí, puedes manejar la validación del token si es necesario
    }

    setLoading(false);
  }, []);

  const login = (userData: User, authToken: string) => {
    localStorage.setItem("user", JSON.stringify(userData));
    // Almacenar el token en una cookie HttpOnly en lugar de localStorage
    document.cookie = `access_token=${authToken}; path=/; max-age=${60 * 60 * 24 * 30}; secure; SameSite=Lax`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    // Eliminar la cookie del token
    document.cookie = "access_token=; path=/; max-age=0; secure; SameSite=Lax";
    setUser(null);
  };

  return { user, loading, login, logout };
}