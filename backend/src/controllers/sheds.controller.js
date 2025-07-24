import { pool } from "../db.js";

export const getSheds = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM galpon");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Galpon no encontrado" });
  }
};

export const getShed = async (req, res) => {
  try {
    const { etiqueta_galpon } = req.params;
    const { rows } = await pool.query("SELECT * FROM galpon WHERE etiqueta_galpon = $1 or lote_galpon = $1", [etiqueta_galpon]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Galpon no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el galpón" });
  }
};

export const createShed = async (req, res) => {
  try {
    const data = req.body;
    const { rows } = await pool.query('INSERT INTO galpon (lote_galpon, etiqueta_galpon) VALUES ($1, $2) RETURNING *',[data.lote_galpon, data.etiqueta_galpon]);
    return res.json(rows[0]);
  } catch (error) {
    console.error(error);
    if (error?.code === "23505") {
      return res.status(409).json({ message: "Código de lote duplicado" });
    }
    return res.status(500).json({ message: "Error al crear nuevo galpón" });
  }
};

export const deleteShed = async (req, res) => {
  try {
    const { lote_galpon } = req.params;
    const { rows, rowCount } = await pool.query("DELETE FROM galpon WHERE lote_galpon = $1 RETURNING *", [lote_galpon]);

    if (rowCount === 0) {
      return res.status(404).json({ message: "Galpón no encontrado" });
    }

    return res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el galpón" });
  }
};

export const updateShed = async (req, res) => {
  try {
    const { lote_galpon } = req.params;
    const data = req.body;
    const { rows, rowCount } = await pool.query('UPDATE galpon SET etiqueta_galpon = $1 WHERE lote_galpon = $2 RETURNING *', [data.etiqueta_galpon, lote_galpon]);

    if (rowCount === 0) {
      return res.status(404).json({ message: "Galpón no encontrado" });
    }

    return res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el galpón" });
  }
};