import { pool } from "../db.js";

// LLAMAR A TODOS LOS USUARIO
export const getUsers = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM usuario");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Usuario no encontrado" });
  }
};

// LLAMAR UN USUARIO EN ESPECIFICO
export const getUser = async (req, res) => {
  try {
    const { dni } = req.params;
    const { rows } = await pool.query("SELECT * FROM usuario WHERE dni = $1", [dni]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

// ELIMINAR USUARIO
export const deleteUser = async (req, res) => {
  try {
    const { dni } = req.params;
    const { rows, rowCount } = await pool.query("DELETE FROM usuario WHERE dni = $1 RETURNING *",[dni]);

    if (rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};

// ACTUALIZAR USUARIO
export const updateUser = async (req, res) => {
  try {
    const { dni } = req.params;
    const data = req.body;
    const { rows, rowCount } = await pool.query(
      `UPDATE usuario SET nombre = $1, apellido = $2, genero = $3, fecha_nacimiento = $4, direccion = $5, celular = $6, correo_electronico = $7, contrasena = $8
        WHERE dni = $9`,
      [
        data.nombre,
        data.apellido,
        data.genero,
        data.fecha_nacimiento,
        data.direccion,
        data.celular,
        data.correo_electronico,
        data.contrasena,
        dni,
      ]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};