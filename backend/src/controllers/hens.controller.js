import { pool } from "../db.js";

// LLAMAR REGISTROS DE GALLINAS
export const getHens = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM gallina");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lotes de gallinas no encontrado" });
  }
};

// LLAMAR REGISTRO DE LOTE DE GALLINA
export const getHen = async (req, res) => {
  try {
    const { gallina_id } = req.params;
    const { rows } = await pool.query("SELECT * FROM gallina WHERE gallina_id = $1", [gallina_id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Lote de gallinas no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el lote" });
  }
};

// INSERTAR LOTE DE GALLINAS
export const createHen = async (req, res) => {
  try {
    const data = req.body;
    const { rows } = await pool.query('INSERT INTO gallina (cantidad_gallinas, fecha_registro, lote_galpon, registrado_por) VALUES ($1, $2, $3, $4) RETURNING *',[data.cantidad_gallinas, data.fecha_registro, data.lote_galpon, data.registrado_por]);
    return res.json(rows[0]);
  } catch (error) {
    console.error(error);
    if (error?.code === "23505") {
      return res.status(409).json({ message: "Código de lote de gallinas duplicado" });
    }
    return res.status(500).json({ message: "Error al ingresar un nuevo lote de gallinas" });
  }
};

// ELIMINAR LOTE DE GALLINAS
export const deleteHen = async (req, res) => {
  try {
    const { gallina_id } = req.params;
    const { rows, rowCount } = await pool.query("DELETE FROM gallina WHERE gallina_id = $1 RETURNING *", [gallina_id]);

    if (rowCount === 0) {
      return res.status(404).json({ message: "Lote de gallinas no encontrado" });
    }

    return res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar lote de gallinas" });
  }
};

// ACTUALIZAR LOTE DE GALLINAS
export const updateHen = async (req, res) => {
  try {
    const { gallina_id } = req.params;
    const data = req.body;
    const { rows, rowCount } = await pool.query('UPDATE gallina SET cantidad_gallinas = $1, fecha_registro = $2, lote_galpon = $3, registrado_por = $4 WHERE gallina_id = $5 RETURNING *', [data.cantidad_gallinas, data.fecha_registro, data.lote_galpon, data.registrado_por, gallina_id]);

    if (rowCount === 0) {
      return res.status(404).json({ message: "Lote de gallinas no encontrado" });
    }

    return res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el lote de gallinas" });
  }
};