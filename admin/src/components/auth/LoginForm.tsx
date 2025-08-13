'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Label } from "@/components/ui";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
  const { user, login } = useAuth();
  const router = useRouter();

  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (user) {
      switch (user.rol_nombre) {
        case "admin":
          router.push("/dashboard/admin");
          break;
        case "operario":
          router.push("/dashboard/operario");
          break;
        case "visitante":
          router.push("/dashboard/visitante");
          break;
        default:
          router.push("/");
          break;
      }
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      correo_electronico: correoElectronico,
      contrasena: contrasena,
    };

    try {
      const apiUrl = process.env.BACKEND_URL || "http://localhost:4000";
      const url = `${apiUrl}/api/signin`;

      const response = await axios.post(url, data);

      const { user: loggedUser, token } = response.data;

      // Guardar usuario y token usando el hook useAuth
      login(loggedUser, token);

      // Redirigir según rol
      if (loggedUser.rol_nombre === "admin") {
        router.push("/dashboard/admin");
      } else if (loggedUser.rol_nombre === "operario") {
        router.push("/dashboard/operario");
      } else if (loggedUser.rol_nombre === "visitante") {
        router.push("/dashboard/visitante");
      } else {
        router.push("/");
      }

    } catch (error) {
      setError("Correo electrónico o contraseña incorrectos");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <Label htmlFor="correo_electronico">Correo Electrónico</Label>
        <div className="mt-2">
          <Input
            id="correo_electronico"
            name="correo_electronico"
            type="email"
            required
            placeholder="Alguien@gmail.com"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="contrasena">Contraseña</Label>
          <a
            href="#"
            className="font-semibold text-sm text-[#EFA52F] hover:text-[#FFC15F]"
          >
            ¿Olvido su Contraseña?
          </a>
        </div>
        <div className="mt-2">
          <Input
            id="contrasena"
            name="contrasena"
            type="password"
            required
            placeholder="********"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit">Ingresar</Button>
    </form>
  );
}