import { CreateUserData, User } from '@/lib/types/user';

const API_BASE_URL = 'http://localhost:4000/api';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export const userService = {
  async registrarUsuario(userData: CreateUserData, token: string): Promise<ApiResponse<User>> {
    console.log('🌐 userService: Enviando petición de registro');
    console.log('📄 Datos del usuario:', userData);
    
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token, // Enviamos el token en el header
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();
      console.log('📥 Respuesta del servidor:', responseData);

      if (!response.ok) {
        return {
          success: false,
          message: responseData.message || `Error HTTP: ${response.status}`,
          error: responseData.error
        };
      }

      return {
        success: true,
        data: responseData.user || responseData.data,
        message: responseData.message || 'Usuario registrado correctamente'
      };

    } catch (error) {
      console.error('❌ userService: Error en la petición:', error);
      return {
        success: false,
        message: 'Error de conexión con el servidor',
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  },

  async obtenerUsuarios(token: string): Promise<User[]> {
    console.log('🌐 userService: Obteniendo lista de usuarios');
    
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('📥 Usuarios obtenidos:', responseData);

      // Asumiendo que la respuesta tiene la estructura { success: true, data: User[] }
      return responseData.data || responseData.users || [];

    } catch (error) {
      console.error('❌ userService: Error al obtener usuarios:', error);
      throw error;
    }
  }
};