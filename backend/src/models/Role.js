import { pool } from "../db.js";

// Función para contar cuántos roles existen
export const getRolesCount = async () => {
  const result = await pool.query("SELECT COUNT(*) FROM rol");
  return parseInt(result.rows[0].count);
};

// Función para crear un rol
export const createRole = async (nombre) => {
  const result = await pool.query(
    "INSERT INTO rol (nombre) VALUES ($1) RETURNING *",
    [nombre]
  );
  return result.rows[0];
};