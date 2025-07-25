import { pool } from "../db.js";

// LLAMAR REGISTROS DE CONSUMOS
export const getIntakes = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM consumo");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registro de consumo no encontrado" });
  }
};

// LLAMAR REGISTRO DE CONSUMO
export const getIntake = async (req, res) => {
  try {
    const { consumo_id } = req.params;
    const { rows } = await pool.query("SELECT * FROM consumo WHERE consumo_id = $1", [consumo_id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Registro de consumo no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el registro de consumo" });
  }
};

// INSERTAR REGISTRO DE CONSUMO
export const createIntake = async (req, res) => {
  try {
    const data = req.body;
    const { rows } = await pool.query('INSERT INTO consumo (fecha_registro, nombre_consumo, cantidad_consumo, tipo_consumo_id, lote_galpon, registrado_por) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',[data.fecha_registro, data.nombre_consumo, data.cantidad_consumo, data.tipo_consumo_id, data.lote_galpon, data.registrado_por]);
    return res.json(rows[0]);
  } catch (error) {
    console.error(error);
    if (error?.code === "23505") {
      return res.status(409).json({ message: "Código de registro de consumo duplicado" });
    }
    return res.status(500).json({ message: "Error al ingresar un nuevo registro de consumo" });
  }
};

// ELIMINAR REGISTRO DE CONSUMO
export const deleteIntake = async (req, res) => {
  try {
    const { consumo_id } = req.params;
    const { rows, rowCount } = await pool.query("DELETE FROM consumo WHERE consumo_id = $1 RETURNING *", [consumo_id]);

    if (rowCount === 0) {
      return res.status(404).json({ message: "Registro de consumo no encontrado" });
    }

    return res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el registro de consumo" });
  }
};

// ACTUALIZAR REGISTRO DE CONSUMO
export const updateIntake = async (req, res) => {
  try {
    const { consumo_id } = req.params;
    const data = req.body;
    const { rows, rowCount } = await pool.query('UPDATE consumo SET fecha_registro = $1, nombre_consumo = $2, cantidad_consumo = $3, tipo_consumo_id = $4, lote_galpon = $5, registrado_por = $6 WHERE consumo_id = $7 RETURNING *', [data.fecha_registro, data.nombre_consumo, data.cantidad_consumo, data.tipo_consumo_id, data.lote_galpon, data.registrado_por, consumo_id]);

    if (rowCount === 0) {
      return res.status(404).json({ message: "Registro de consumo no encontrado" });
    }

    return res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el registro de consumo" });
  }
};