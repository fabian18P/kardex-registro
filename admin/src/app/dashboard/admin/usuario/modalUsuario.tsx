"use client";
import { useState } from "react";
import { InputModal, LabelModalSeccion, LabelModalInput } from "@/components/ui";
import { useRoleGuard } from "@/hooks/useRoleGuard";
import { useUsers } from "@/hooks/useUsers";
import { Button } from "primereact/button";
import ModalEliminar from "@/components/dashboard/ModalEliminar";
import ModalActualizar from "@/components/dashboard/ModalActualizar";
import { CreateUserData } from "@/lib/types/user";

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


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const [userData, setUserData] = useState<CreateUserData>({
    nombre: "",
    apellido: "",
    genero: "",
    fecha_nacimiento: "",
    dni: "",
    direccion: "",
    celular: "",
    correo_electronico: "",
    roles: "",
    contrasena: ""
  });


  const closeModal = () => {

    // Resetear formulario
    setUserData({
      nombre: "",
      apellido: "",
      genero: "",
      fecha_nacimiento: "",
      dni: "",
      direccion: "",
      celular: "",
      correo_electronico: "",
      roles: "",
      contrasena: ""
    });
  };


  const handleConfirmUpdate = async () => {
    setIsUpdating(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ModalActualizar isOpen={isOpen} onClose={onCancel} tituloModal="ACTUALIZAR USUARIO" loading={loading || isDeleting}>
          <LabelModalSeccion>DATOS DEL USUARIO</LabelModalSeccion>
          <div className="mb-6">
            <LabelModalInput>Nombre</LabelModalInput>
            <InputModal id="nombre" name="nombre" type="text" value={userData.nombre} onChange={handleChange} required/>

            <LabelModalInput>Apellido</LabelModalInput>
            <InputModal id="apellido" name="apellido" type="text" value={userData.apellido} onChange={handleChange}/>

            <LabelModalInput>DNI</LabelModalInput>
            <InputModal id="dni" name="dni" type="text" value={userData.dni} onChange={handleChange} minLength={8} maxLength={8} required/>

            <LabelModalInput>Género</LabelModalInput>
            <select className="block w-full border-1 border-color-[#311800] rounded-md bg-gray-100 mt-2 pl-3 pr-3 py-1 text-base text-gray-900 sm:text-sm/6" id="genero" name="genero" value={userData.genero} onChange={handleChange} required>
              <option value="" disabled>Selecciona una opción</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>

            <LabelModalInput>Fecha de nacimiento</LabelModalInput>
            <InputModal id="fecha_nacimiento" name="fecha_nacimiento" type="date" value={userData.fecha_nacimiento} onChange={handleChange} required/>

            <LabelModalInput>Contraseña</LabelModalInput>
            <InputModal id="contrasena" name="contrasena" type="password" value={userData.contrasena} onChange={handleChange} minLength={8} required />
          </div>

          <LabelModalSeccion>INFORMACIÓN DE CONTACTO</LabelModalSeccion>
          <div>
            <LabelModalInput>Dirección</LabelModalInput>
            <InputModal id="direccion" name="direccion" type="text" value={userData.direccion} onChange={handleChange} required/>

            <LabelModalInput>Celular</LabelModalInput>
            <InputModal id="celular" name="celular" type="number" value={userData.celular} onChange={handleChange} minLength={9} maxLength={9} required/>

            <LabelModalInput>Email</LabelModalInput>
            <InputModal id="correo_electronico" name="correo_electronico" type="email" value={userData.correo_electronico} onChange={handleChange} required/>

            <LabelModalInput>Rol</LabelModalInput>
            <select className="block w-full border-1 border-color-[#311800] rounded-md bg-gray-100 mt-2 pl-3 pr-3 py-1 text-base text-gray-900 sm:text-sm/6" id="roles" name="roles" value={userData.roles} onChange={handleChange} required>
              <option value="" disabled>Selecciona un rol</option>
              <option value="admin">Admin</option>
              <option value="operario">Operario</option>
              <option value="visitante">Visitante</option>
            </select>
          </div>
        <div className="flex justify-center space-x-3 pt-4">
          <div className="m-1"><Button label="Cancelar" icon="pi pi-times" className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300" onClick={onCancel} disabled={isDeleting}/></div>
          <div className="m-1"><Button label={isDeleting ? "Eliminando..." : "Eliminar"} icon={isDeleting ? "pi pi-spin pi-spinner" : "pi pi-trash"} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300" onClick={handleConfirmUpdate} disabled={isUpdating}/></div>
        </div>
    </ModalActualizar>
  );
}

export { ModalEliminarUsuario, ModalActualizarUsuario };