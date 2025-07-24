import { pool } from "../db.js";

export const getHens = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM gallina");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lote de gallinas no encontrado" });
  }
};

export const getHen = async (req, res) => {
  try {
    const { gallina_id } = req.params;
    const { rows } = await pool.query("SELECT * FROM gallina WHERE gallina_id = $1", [gallina_id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Lote de gallina no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el lote" });
  }
};