"use client";

import React, { useState, useEffect } from "react";
import { useUsers } from "@/hooks/useUsers"; // Importa el hook
import { useRoleGuard } from "@/hooks/useRoleGuard";
import { User } from "@/lib/types/user";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

interface TableProps {
  isOpen: boolean;
}

const TablaUsuario: React.FC<TableProps> = ({ isOpen }) => {
  useRoleGuard(["admin"]);

  const { obtenerUsuarios } = useUsers();
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [first, setFirst] = useState(0); // Página actual

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
  }, []); // Agregué obtenerUsuarios como dependencia

  // El return condicional va después de todos los hooks
  if (!isOpen) return null;

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };

  const onPageChange = (e: { first: number; rows: number }) => {
    setFirst(e.first); // Actualiza la página actual
  };

  return (
    <div>
      <div className="mt-8 mb-2">
        <InputText value={globalFilter} onChange={onGlobalFilterChange} placeholder="Búscar" className="p-2 w-1/2 rounded-sm border-[#311800] border-3 shadow-sm bg-gray-50 text-[#311800] placeholder:italic"/>
      </div>
      <DataTable value={usuarios} paginator first={first} globalFilter={globalFilter} onPage={onPageChange} rows={8} className="min-w-full mt-6">
        <Column field="dni" header="DNI" sortable headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]"/>
        <Column field="primer_nombre" header="Primer Nombre" sortable headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]"/>
        <Column field="apellido_paterno" header="Apellido Paterno" sortable headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]"/>
        <Column field="correo_electronico" header="Correo Electronico" sortable headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]"/>
      </DataTable>
    </div>
  );
};

export default TablaUsuario;
