import { useState } from 'react';
import { CreateUserData, User } from '@/lib/types/user';
import { useAuth } from '@/hooks/useAuth';

export function useUsers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

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
        'x-access-token': token,
        ...options.headers,
      },
    });
  };

  const registrarUsuario = async (userData: CreateUserData): Promise<User | undefined> => {
    setLoading(true);
    setError(null);
    
    console.log('🔄 useUsers: Iniciando registro de usuario');
    
    try {
      const response = await fetchWithToken('http://localhost:4000/api/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();
      console.log('📥 Respuesta del servidor:', responseData);

      if (!response.ok) {
        const errorMsg = responseData.message || `Error HTTP: ${response.status}`;
        setError(errorMsg);
        throw new Error(errorMsg);
      }

      console.log('✅ useUsers: Usuario registrado exitosamente');
      return responseData.user || responseData.data;
      
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Error de conexión con el servidor';
      
      console.error('❌ useUsers: Error al registrar usuario:', errorMessage);
      setError(errorMessage);
      throw new Error(errorMessage);
      
    } finally {
      setLoading(false);
    }
  };

  const obtenerUsuarios = async (): Promise<User[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchWithToken('http://localhost:4000/api/users', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('📥 Usuarios obtenidos:', responseData);

      return responseData.data || responseData.users || [];
      
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Error al obtener usuarios';
      setError(errorMessage);
      throw new Error(errorMessage);
      
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    loading,
    error,
    registrarUsuario,
    obtenerUsuarios,
    clearError
  };
}