'use client';

import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import axios from "axios";

export default function LoginFrom() {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Preparar los datos para enviar a la API
    const data = {
      correo_electronico: correoElectronico,
      contrasena: contrasena,
    };

    
    try {
      // Concatenar la URL del backend desde el archivo .env
      const apiUrl = process.env.BACKEND_URL || "http://localhost:4000";
      const url = `${apiUrl}/api/signin`;

      // Enviar la solicitud POST al backend
      const response = await axios.post(url, data);

      // Aquí puedes manejar lo que sucede después de una respuesta exitosa
      console.log(response.data);
      // Por ejemplo, redirigir al usuario a la página principal o dashboard
      // window.location.href = "/dashboard";  // redirigir a la página de dashboard

    } catch (error) {
      setError("Correo electrónico o contraseña incorrectos" + data.correo_electronico);
      console.error(error);
    }
  };

  return (
    <>
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
    </>
  );
}