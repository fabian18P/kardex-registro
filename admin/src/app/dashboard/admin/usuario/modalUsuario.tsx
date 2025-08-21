"use client";
import React, { useState, useEffect } from "react";

import { useUsers } from "@/hooks/useUsers";
import { useRoleGuard } from "@/hooks/useRoleGuard";
import { User } from "@/lib/types/user";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Modal from "@/components/dashboard/Modal";

export function ModalEliminar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useRoleGuard(["admin"]);

  const { obtenerUsuarios, eliminarUsuario, actualizarUsuario } = useUsers();
  const [setUsuarios] = useState<User[]>([]);

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

  const closeModal = () => {
    setIsModalOpen(false);
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
  

  const handleSubmit = () => {
    // Lógica para eliminar al usuario
    setLoading(true);
    // Simulación de eliminación
    setTimeout(() => {
      // Al finalizar la eliminación
      setLoading(false);
      closeModal(); // Cerrar el modal después de la eliminación
    }, 1000); // Simulación de un delay de 1 segundo
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal} tituloModal="ELIMINAR USUARIO" onSubmit={handleSubmit} loading={loading}>
        <p>¿Está seguro de que quiere eliminar al usuario con DNI: afsafas?</p>

        <button className="btn btn-primary" onClick={handleSubmit}>Eliminar</button>
      </Modal>
    </div>
  );
}

export function ModalActualizar() {
  return (
    <div>
      {/* Aquí puedes agregar contenido para ModalActualizar */}
    </div>
  );
}
