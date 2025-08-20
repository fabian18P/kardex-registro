"use client";

import React, { useState, useEffect } from "react";
import { useUsers } from "@/hooks/useUsers"; // Importa el hook
import { useRoleGuard } from "@/hooks/useRoleGuard";
import { User } from "@/lib/types/user";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function TablaRegistro() {
  useRoleGuard(["admin"]);

  const { loading, error, obtenerUsuarios } = useUsers();
  const [usuarios, setUsuarios] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuariosData = await obtenerUsuarios();
        setUsuarios(usuariosData);
      } catch (error) {
        console.error("Error al obtener usuarios", error);
      }
    };
    fetchUsuarios();
  }, []);

  return (
    <div>

    <DataTable 
      value={usuarios}
      paginator 
      rows={8} // Número de filas por página
      className="min-w-full mt-6"
    >
      <Column field="dni" header="DNI" sortable headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]"/>
      <Column field="primer_nombre" header="Primer Nombre" sortable headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]"/>
      <Column field="apellido_paterno" header="Apellido Paterno" sortable headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]"/>
      <Column field="correo_electronico" header="Correo Electronico" sortable headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]"/>
    </DataTable>
    </div>
  );
}