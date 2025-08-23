"use client";
import { useState } from "react";
import { useRoleGuard } from "@/hooks/useRoleGuard";
import { useUsers } from "@/hooks/useUsers";
import { Button } from "primereact/button";
import ModalEliminar from "@/components/dashboard/ModalEliminar";

interface ModalEliminarUsuarioProps {
  isOpen: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  userToDelete: string | null;
}

interface ModalActualizarUsuarioProps {
  isOpen: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  userToUpdate: string | null;
}

function ModalEliminarUsuario({ isOpen, onConfirm, onCancel, userToDelete }: ModalEliminarUsuarioProps) {
  useRoleGuard(["admin"]);
  const { loading } = useUsers();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ModalEliminar isOpen={isOpen} onClose={onCancel} tituloModal="ELIMINAR USUARIO" loading={loading || isDeleting}>
      <div className="space-y-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <i className="pi pi-exclamation-triangle text-red-600 text-2xl"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            ¿Estás seguro de que deseas eliminar este usuario?
          </h3>
          {userToDelete && (
            <p className="text-sm text-gray-500 mb-4">
              Usuario con DNI: <span className="font-semibold">{userToDelete}</span>
            </p>
          )}
          <p className="text-sm text-gray-500">
            Esta acción no se puede deshacer. El usuario será eliminado permanentemente del sistema.
          </p>
        </div>
        
        <div className="flex justify-center space-x-3 pt-4">
          <div className="m-1"><Button label="Cancelar" icon="pi pi-times" className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300" onClick={onCancel} disabled={isDeleting}/></div>
          <div className="m-1"><Button label={isDeleting ? "Eliminando..." : "Eliminar"} icon={isDeleting ? "pi pi-spin pi-spinner" : "pi pi-trash"} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300" onClick={handleConfirmDelete} disabled={isDeleting}/></div>
        </div>
      </div>
    </ModalEliminar>
  );
}

// ModalActualizar component (sin cambios)
function ModalActualizarUsuario({ isOpen, onConfirm, onCancel, userToUpdate }: ModalActualizarUsuarioProps) {
  useRoleGuard(["admin"]);
  const { loading } = useUsers();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleConfirmUpdate = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ModalEliminar isOpen={isOpen} onClose={onCancel} tituloModal="ELIMINAR USUARIO" loading={loading || isDeleting}>
      <div className="space-y-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <i className="pi pi-exclamation-triangle text-red-600 text-2xl"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            ¿Estás seguro de que deseas eliminar este usuario?
          </h3>
          {userToUpdate && (
            <p className="text-sm text-gray-500 mb-4">
              Usuario con DNI: <span className="font-semibold">{userToUpdate}</span>
            </p>
          )}
          <p className="text-sm text-gray-500">
            Esta acción no se puede deshacer. El usuario será eliminado permanentemente del sistema.
          </p>
        </div>
        
        <div className="flex justify-center space-x-3 pt-4">
          <div className="m-1"><Button label="Cancelar" icon="pi pi-times" className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300" onClick={onCancel} disabled={isDeleting}/></div>
          <div className="m-1"><Button label={isDeleting ? "Eliminando..." : "Eliminar"} icon={isDeleting ? "pi pi-spin pi-spinner" : "pi pi-trash"} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300" onClick={handleConfirmUpdate} disabled={isDeleting}/></div>
        </div>
      </div>
    </ModalEliminar>
  );
}

export { ModalEliminarUsuario, ModalActualizarUsuario };