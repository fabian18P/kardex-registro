import { useState } from 'react';
import { userService } from '@/lib/api/users';
import { CreateUserData, User } from '@/lib/types/user';

export function useUsers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registrarUsuario = async (userData: CreateUserData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await userService.registrarUsuario(userData);
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const obtenerUsuarios = async () => {
    setLoading(true);
    setError(null);
    
    try {
      return await userService.obtenerUsuarios();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener usuarios';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    registrarUsuario,
    obtenerUsuarios,
    clearError: () => setError(null)
  };
}