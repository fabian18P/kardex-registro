export interface CreateUserData {
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
  contrasena: string;
  imagen?: string;
}

export interface User extends CreateUserData {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
