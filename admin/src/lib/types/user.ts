// Tipos para la creación de usuarios
export interface CreateUserData {
  primer_nombre: string;
  segundo_nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  genero: string;
  fecha_nacimiento: string;
  dni: string;
  pais: string;
  region: string;
  provincia: string;
  distrito: string;
  direccion: string;
  celular: string;
  correo_electronico: string;
  rol: string;
  contrasena: string;
  imagen: string;
}

// Tipo para el usuario existente (respuesta de la API)
export interface User {
  id?: number;
  primer_nombre: string;
  segundo_nombre?: string;
  apellido_paterno: string;
  apellido_materno: string;
  genero: string;
  fecha_nacimiento: string;
  dni: string;
  pais: string;
  region?: string;
  provincia: string;
  distrito: string;
  direccion: string;
  celular: string;
  correo_electronico: string;
  rol: string;
  imagen?: string;
  created_at?: string;
  updated_at?: string;
}