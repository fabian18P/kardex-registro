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
      `UPDATE usuario SET primer_nombre = $1, segundo_nombre = $2, apellido_paterno = $3, apellido_materno = $4, genero = $5, fecha_nacimiento = $6, pais = $7, region = $8, provincia = $9, distrito = $10, direccion = $11, celular = $12, correo_electronico = $13, contrasena = $14, imagen = $15
        WHERE dni = $16 RETURNING *`,
      [
        data.primer_nombre,
        data.segundo_nombre,
        data.apellido_paterno,
        data.apellido_materno,
        data.genero,
        data.fecha_nacimiento,
        data.pais,
        data.region,
        data.provincia,
        data.distrito,
        data.direccion,
        data.celular,
        data.correo_electronico,
        data.contrasena,
        data.imagen,
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