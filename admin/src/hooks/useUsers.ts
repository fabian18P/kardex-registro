import { useState } from 'react';
import { CreateUserData, User } from '@/lib/types/user';
import { useAuth } from '@/hooks/useAuth';

export function useUsers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();  // Obtener el token de autenticación

  // Función que envuelve el fetch original con el token
  const fetchWithToken = async (url: string, options: RequestInit = {}) => {
    const token = getToken();
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,  // Añadir el token a las cabeceras
        ...options.headers,
      },
    });
  };

  // Registrar usuario
  const registrarUsuario = async (userData: CreateUserData): Promise<User | undefined> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchWithToken('http://localhost:4000/api/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorMsg = responseData.message || `Error HTTP: ${response.status}`;
        setError(errorMsg);
        throw new Error(errorMsg);
      }

      console.log('✅ Usuario registrado exitosamente');
      return responseData.user || responseData.data;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error de conexión con el servidor';
      console.error('❌ Error al registrar usuario:', errorMessage);
      setError(errorMessage);
      throw new Error(errorMessage);
      
    } finally {
      setLoading(false);
    }
  };

  // Obtener usuarios
  const obtenerUsuarios = async (): Promise<User[]> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchWithToken('http://localhost:4000/api/usuario', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('📥 Usuarios obtenidos:', responseData);

      return responseData || [];
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener usuarios';
      setError(errorMessage);
      throw new Error(errorMessage);
      
    } finally {
      setLoading(false);
    }
  };

  // Eliminar usuario
  const eliminarUsuario = async (dni: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchWithToken(`http://localhost:4000/api/usuario/${dni}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      console.log(`✅ Usuario con DNI ${dni} eliminado exitosamente`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar usuario';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar usuario
  const actualizarUsuario = async (dni: string, userData: User): Promise<User | undefined> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchWithToken(`http://localhost:4000/api/usuario/${dni}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(`✅ Usuario con DNI ${dni} actualizado exitosamente`);

      return responseData.user || responseData.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar usuario';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Limpiar error
  const clearError = () => setError(null);

  return {
    loading,
    error,
    registrarUsuario,
    obtenerUsuarios,
    eliminarUsuario,
    actualizarUsuario,
    clearError,
  };
}