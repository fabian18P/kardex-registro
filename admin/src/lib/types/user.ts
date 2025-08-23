// Tipos para la creación de usuarios
export interface CreateUserData {
  nombre: string;
  apellido: string;
  genero: string;
  fecha_nacimiento: string;
  dni: string;
  direccion: string;
  celular: string;
  correo_electronico: string;
  roles: string;
  contrasena: string;
}

// Tipo para el usuario existente (respuesta de la API)
export interface User {
  id?: number;
  nombre: string;
  apellido: string;
  genero: string;
  fecha_nacimiento: string;
  dni: string;
  direccion: string;
  celular: string;
  correo_electronico: string;
  roles: string;
  created_at?: string;
  updated_at?: string;
}