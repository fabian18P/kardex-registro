import { apiFetch } from '@/lib/apis';
import { CreateUserData, User, ApiResponse } from '../types/user';

export const userService = {
  // Registrar nuevo usuario
  async registrarUsuario(userData: CreateUserData): Promise<ApiResponse<User>> {
    return apiFetch<ApiResponse<User>>('/usuario', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Obtener todos los usuarios
  async obtenerUsuarios(): Promise<User[]> {
    return apiFetch<User[]>('/usuario');
  },

  // Obtener usuario por DNI
  async obtenerUsuario(dni: string): Promise<User> {
    return apiFetch<User>(`/usuario/${dni}`);
  },

  // Actualizar usuario
  async actualizarUsuario(dni: string, userData: Partial<CreateUserData>): Promise<ApiResponse<User>> {
    return apiFetch<ApiResponse<User>>(`/usuario/${dni}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // Eliminar usuario
  async eliminarUsuario(dni: string): Promise<ApiResponse<User>> {
    return apiFetch<ApiResponse<User>>(`/usuario/${dni}`, {
      method: 'DELETE',
    });
  }
};

// Mantener compatibilidad con tu código actual
export const registrarUsuario = userService.registrarUsuario;