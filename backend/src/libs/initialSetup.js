import { getRolesCount, createRole } from '../models/Role.js'; // Importa las funciones del modelo

// Función para crear los roles si no existen
export const createRoles = async () => {
  try {
    // Verificar si ya existen roles
    const count = await getRolesCount();

    if (count > 0) {
      console.log('Los roles ya existen.');
      return;
    }

    // Si no existen, insertar los roles
    const roles = ['admin', 'operario', 'visitante'];

    for (let role of roles) {
      const createdRole = await createRole(role);
      console.log('Rol creado:', createdRole);
    }

  } catch (error) {
    console.error('Error al crear los roles:', error);
  }
};