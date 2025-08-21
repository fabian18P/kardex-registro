"use client";

import React, { useState, useEffect } from "react";

import { useUsers } from "@/hooks/useUsers";
import { useRoleGuard } from "@/hooks/useRoleGuard";
import { User } from "@/lib/types/user";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

interface TableProps {
  isOpen: boolean;
}

const TablaUsuario: React.FC<TableProps> = ({ isOpen }) => {
  useRoleGuard(["admin"]);

  const { obtenerUsuarios, eliminarUsuario, actualizarUsuario } = useUsers();
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
  }, []);

  if (!isOpen) return null;

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };

  const onPageChange = (e: { first: number; rows: number }) => {
    setFirst(e.first);
  };

  const handleEdit = async (userId: string) => {
    console.log("Edit user", userId);
    const currentUser = usuarios.find(user => user.dni === userId);

    if (!currentUser) {
      console.error("Usuario no encontrado");
      return;
    }

    // Crear el objeto `updatedUser` con el tipo `User`
    const updatedUser: User = {
      ...currentUser,
      primer_nombre: "Nuevo nombre", // Simulando un cambio
      apellido_paterno: currentUser.apellido_paterno ?? "",  // Asegurando que el valor sea un string
      // Puedes actualizar otros campos según lo necesites
    };

    try {
      // Llamar a la función `actualizarUsuario` para actualizar el usuario en la base de datos
      await actualizarUsuario(userId, updatedUser);

      // Volver a obtener los usuarios para reflejar el cambio
      const usuariosData = await obtenerUsuarios();
      setUsuarios(usuariosData);
    } catch (error) {
      console.error("Error al actualizar el usuario", error);
    }
  };

  const handleDelete = async (userId: string) => {
    console.log("Delete user", userId);
    try {
      await eliminarUsuario(userId);
      // Actualizar la lista de usuarios después de eliminar
      const usuariosData = await obtenerUsuarios();
      setUsuarios(usuariosData);
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
    }
  };

  return (
    <div className="sm:text-base text-sm">
      <div className="mt-8 mb-2">
        <InputText value={globalFilter} onChange={onGlobalFilterChange} placeholder="Búscar" className="p-2 w-1/2 rounded-sm border-[#311800] border-3 shadow-sm bg-gray-50 text-[#311800] placeholder:italic"/>
      </div>
      <DataTable value={usuarios} paginator first={first} globalFilter={globalFilter} onPage={onPageChange} rows={8} className="min-w-full mt-6">
        <Column field="dni" header="DNI" sortable headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]"/>
        <Column field="primer_nombre" header="Primer Nombre" sortable headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]"/>
        <Column field="apellido_paterno" header="Apellido Paterno" sortable headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]"/>
        <Column field="correo_electronico" header="Correo Electronico" sortable headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]"/>
        
        {/* Nueva columna de ACCION */}
        <Column
          header="Acción"
          body={(rowData: User) => (
            <div className="text-gray-200 flex">
              <div className="m-1">
                <Button label="Editar" icon="pi pi-pencil" className="bg-blue-700 p-1 rounded-lg hover:bg-blue-900 transition transform duration-300 ease-in-out" onClick={() => handleEdit(rowData.dni)} />
              </div>
              <div className="m-1">
                <Button label="Eliminar" icon="pi pi-trash" className="bg-gray-300 text-gray-800 p-1 rounded-lg hover:bg-gray-400 transition transform duration-300 ease-in-out" onClick={() => handleDelete(rowData.dni)} />
              </div>
            </div>
          )}
          headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2"
          className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]"
        />
      </DataTable>
    </div>
  );
};

export default TablaUsuario;