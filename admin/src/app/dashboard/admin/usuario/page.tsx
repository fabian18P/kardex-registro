//src/app/dashboard/admin/usuario/page.tsx
"use client";
import { useState } from "react";
import { InputModal, ButtonGreen, LabelPanelTitle, LabelModalSeccion, LabelModalInput } from "@/components/ui";
import { useRoleGuard } from "@/hooks/useRoleGuard";
import { useUsers } from "@/hooks/useUsers";
import Modal from "@/components/dashboard/Modal";
import TablaUsuario from "@/app/dashboard/admin/usuario/tablaUsuario"; // Importa el componente de tabla
import { CreateUserData } from "@/lib/types/user";

export default function AdminUsuario() {
  useRoleGuard(["admin"]);
  
  const { loading, error, registrarUsuario, clearError } = useUsers()

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openModal = () => { clearError(); setIsModalOpen(true);};

  const closeModal = () => {
    setIsModalOpen(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await registrarUsuario(userData);
      closeModal();
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  return (
    <div>
      <LabelPanelTitle>Usuario</LabelPanelTitle>
      <div className="pt-6">
        <ButtonGreen onClick={openModal} text="Nuevo Usuario"/>
        
        <Modal isOpen={isModalOpen} onClose={closeModal} tituloModal="REGISTRAR USUARIO" onSubmit={handleSubmit} loading={loading}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"> {error} </div>
          )}
          
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
        </Modal>
        <TablaUsuario isOpen={true} />
      </div>
    </div>
  );
}