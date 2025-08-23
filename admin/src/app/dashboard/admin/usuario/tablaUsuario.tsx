"use client";

import React, { useState, useEffect } from "react";

import { useUsers } from "@/hooks/useUsers";
import { useRoleGuard } from "@/hooks/useRoleGuard";
import { User } from "@/lib/types/user";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ModalEliminarUsuario } from "@/app/dashboard/admin/usuario/modalUsuario"; // Ajusta la ruta según tu estructura

interface TableProps {
  isOpen: boolean;
}

const TablaUsuario: React.FC<TableProps> = ({ isOpen }) => {
  useRoleGuard(["admin"]);

  const { obtenerUsuarios, eliminarUsuario, actualizarUsuario } = useUsers();
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [first, setFirst] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

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

    const updatedUser: User = {
      ...currentUser,
      nombre: "Nuevo nombre",
    };

    try {
      await actualizarUsuario(userId, updatedUser);
      const usuariosData = await obtenerUsuarios();
      setUsuarios(usuariosData);
    } catch (error) {
      console.error("Error al actualizar el usuario", error);
    }
  };

  const handleDelete = (userId: string) => {
    setUserToDelete(userId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await eliminarUsuario(userToDelete);
        const usuariosData = await obtenerUsuarios();
        setUsuarios(usuariosData);
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
      } catch (error) {
        console.error("Error al eliminar el usuario", error);
      }
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <div className="sm:text-base text-sm">
      <div className="mt-8 mb-2">
        <InputText value={globalFilter} onChange={onGlobalFilterChange} placeholder="Búscar" className="p-2 w-1/2 rounded-sm border-[#311800] border-3 shadow-sm bg-gray-50 text-[#311800] placeholder:italic"/>
      </div>
      
      <DataTable value={usuarios} paginator first={first} globalFilter={globalFilter} onPage={onPageChange} rows={8} className="min-w-full mt-6">
        <Column field="dni" header="DNI" sortable headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]" />
        <Column field="nombre" header="Primer Nombre" sortable headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]" />
        <Column field="correo_electronico" header="Correo Electronico" sortable headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]" />
        
        <Column header="Acción" body={(rowData: User) => (
          <div className="text-gray-200 flex">
            <div className="m-1"><Button label="Editar" icon="pi pi-pencil" className="bg-blue-700 p-1 rounded-lg hover:bg-blue-900 transition transform duration-300 ease-in-out" onClick={() => handleEdit(rowData.dni)} /></div>
            <div className="m-1"><Button label="Eliminar" icon="pi pi-trash" className="bg-red-600 text-white p-1 rounded-lg hover:bg-red-700 transition transform duration-300 ease-in-out" onClick={() => handleDelete(rowData.dni)} /></div>
          </div>
        )} headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]" />
      </DataTable>

      <ModalEliminarUsuario isOpen={isDeleteModalOpen} onConfirm={confirmDelete} onCancel={cancelDelete} userToDelete={userToDelete}/>
    </div>
  );
};

export default TablaUsuario;