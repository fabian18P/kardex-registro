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
    primer_nombre: "",
    segundo_nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    genero: "",
    fecha_nacimiento: "",
    dni: "",
    pais: "Perú",
    region: "",
    provincia: "",
    distrito: "",
    direccion: "",
    celular: "",
    correo_electronico: "",
    rol: "",
    contrasena: "",
    imagen: ""
  });

  const openModal = () => { clearError(); setIsModalOpen(true);};

  const closeModal = () => {
    setIsModalOpen(false);
    // Resetear formulario
    setUserData({
      primer_nombre: "",
      segundo_nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      genero: "",
      fecha_nacimiento: "",
      dni: "",
      pais: "Perú",
      region: "",
      provincia: "",
      distrito: "",
      direccion: "",
      celular: "",
      correo_electronico: "",
      rol: "",
      contrasena: "",
      imagen: ""
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
          
          <div>
            <LabelModalSeccion>DATOS DEL USUARIO</LabelModalSeccion>
            <div className="md:flex gap-4">
              <div className="md:flex-1 bg-gray-100 pl-4 pr-4 pb-4 rounded">
                <LabelModalInput>Primer Nombre</LabelModalInput>
                <InputModal id="primer_nombre" name="primer_nombre" type="text" value={userData.primer_nombre} onChange={handleChange} required/>

                <LabelModalInput>Segundo Nombre</LabelModalInput>
                <InputModal id="segundo_nombre" name="segundo_nombre" type="text" value={userData.segundo_nombre} onChange={handleChange}/>
              </div>
              <div className="md:flex-1 bg-gray-200 pl-4 pr-4 pb-4 rounded">
                <LabelModalInput>Apellido Paterno</LabelModalInput>
                <InputModal id="apellido_paterno" name="apellido_paterno" type="text" value={userData.apellido_paterno} onChange={handleChange} required/>

                <LabelModalInput>Apellido Materno</LabelModalInput>
                <InputModal id="apellido_materno" name="apellido_materno" type="text" value={userData.apellido_materno} onChange={handleChange} required/>
              </div>
            </div>

            <div className="sm:w-1/3 sm:ml-4">
              <LabelModalInput>DNI</LabelModalInput>
              <InputModal id="dni" name="dni" type="text" value={userData.dni} onChange={handleChange} maxLength={8} required/>

              <LabelModalInput>Género</LabelModalInput>
              <select className="block w-full border-1 border-color-[#311800] rounded-md bg-gray-100 mt-2 pl-3 pr-3 py-1 text-base text-gray-900 sm:text-sm/6" id="genero" name="genero" value={userData.genero} onChange={handleChange} required>
                <option value="" disabled>Selecciona una opción</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>

              <LabelModalInput>Fecha de nacimiento</LabelModalInput>
              <InputModal id="fecha_nacimiento" name="fecha_nacimiento" type="date" value={userData.fecha_nacimiento} onChange={handleChange} required/>

              <LabelModalInput>Contraseña</LabelModalInput>
              <InputModal id="contrasena" name="contrasena" type="password" value={userData.contrasena} onChange={handleChange} minLength={6} required />
            </div>
          </div>

          <div className="mt-6">
            <LabelModalSeccion>INFORMACIÓN DE CONTACTO</LabelModalSeccion>
            <div className="md:flex gap-4">
              <div className="md:flex-1 bg-gray-100 pl-4 pr-4 pb-4 rounded">
                <LabelModalInput>País</LabelModalInput>
                <InputModal id="pais" name="pais" type="text" value={userData.pais} onChange={handleChange} required/>

                <LabelModalInput>Región</LabelModalInput>
                <InputModal id="region" name="region" type="text" value={userData.region} onChange={handleChange}/>
              </div>
              <div className="md:flex-1 bg-gray-200 pl-4 pr-4 pb-4 rounded">
                <LabelModalInput>Provincia</LabelModalInput>
                <InputModal id="provincia" name="provincia" type="text" value={userData.provincia} onChange={handleChange} required />

                <LabelModalInput>Distrito</LabelModalInput>
                <InputModal id="distrito" name="distrito" type="text" value={userData.distrito} onChange={handleChange} required/>
              </div>
            </div>

            <div className="sm:w-1/3 sm:ml-4">
              <LabelModalInput>Dirección</LabelModalInput>
              <InputModal id="direccion" name="direccion" type="text" value={userData.direccion} onChange={handleChange} required/>

              <LabelModalInput>Celular</LabelModalInput>
              <InputModal id="celular" name="celular" type="tel" value={userData.celular} onChange={handleChange} required/>

              <LabelModalInput>Email</LabelModalInput>
              <InputModal id="correo_electronico" name="correo_electronico" type="email" value={userData.correo_electronico} onChange={handleChange} required/>

              <LabelModalInput>Rol</LabelModalInput>
              <select className="block w-full border-1 border-color-[#311800] rounded-md bg-gray-100 mt-2 pl-3 pr-3 py-1 text-base text-gray-900 sm:text-sm/6" id="rol" name="rol" value={userData.rol} onChange={handleChange} required>
                <option value="" disabled>Selecciona un rol</option>
                <option value="admin">Admin</option>
                <option value="operario">Operario</option>
                <option value="visitante">Visitante</option>
              </select>
            </div>
          </div>
        </Modal>
        <TablaUsuario isOpen={true} />
      </div>
    </div>
  );
}