"use client";

import { useState, useEffect } from "react"; // Importa useState y useEffect
import { useUsers } from "@/hooks/useUsers"; // Importa el hook
import { useRoleGuard } from "@/hooks/useRoleGuard";
import { User } from "@/lib/types/user";
import TablaRegistro from "@/app/dashboard/admin/registro/tablaRegistro"; // Importa el componente de tabla

export default function AdminRegistro() {
  useRoleGuard(["admin"]);

  const { loading, error, obtenerUsuarios } = useUsers(); // Desestructura los métodos del hook

  // Estado para almacenar los usuarios
  const [usuarios, setUsuarios] = useState<User[]>([]);

  useEffect(() => {
    // Función para obtener los usuarios
    const fetchUsuarios = async () => {
      try {
        const usuariosData = await obtenerUsuarios();
        setUsuarios(usuariosData); // Guarda los usuarios en el estado
      } catch (error) {
        console.error("Error al obtener usuarios", error);
      }
    };

    fetchUsuarios(); // Llamada a la función al montar el componente

    // No agregamos ninguna dependencia, por lo que esto solo se ejecuta una vez cuando se monta el componente
  }, []); // Dependencia vacía, se ejecuta solo una vez

  return (
    <div>
      <h1>Registro</h1>
      {loading && <p>Cargando usuarios...</p>}
      {<TablaRegistro/>}
    </div>
  );
}