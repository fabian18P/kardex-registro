import { pool } from "../db.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: "No token provided" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.sub;
    const { rows } = await pool.query(
      "SELECT dni FROM usuario WHERE dni = $1",
      [req.userId]
    );
    if (!rows) return res.status(404).json({ message: "no user found" });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { rows } = await pool.query(
      `SELECT r.nombre AS rol_nombre
       FROM usuario u
       INNER JOIN rol r ON r.id = u.id_rol
       WHERE u.dni = $1
       LIMIT 1`,
      [req.userId]
    );

    const rol = rows[0]?.rol_nombre?.toLowerCase().trim();

    if (rol === "admin") {
      return next();
    }

    // Rol incorrecto o usuario sin rol
    return res.status(403).json({ message: "Requiere Admin" });
  } catch (err) {
    console.error("isAdmin error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const isOperario = async (req, res, next) => {

    try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { rows } = await pool.query(
      `SELECT r.nombre AS rol_nombre
       FROM usuario u
       INNER JOIN rol r ON r.id = u.id_rol
       WHERE u.dni = $1
       LIMIT 1`,
      [req.userId]
    );

    const rol = rows[0]?.rol_nombre?.toLowerCase().trim();

    if (rol === "operario") {
      return next();
    }

    // Rol incorrecto o usuario sin rol
    return res.status(403).json({ message: "Requiere Operario" });
  } catch (err) {
    console.error("isAdmin error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const isVisitante = async (req, res, next) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { rows } = await pool.query(
      `SELECT r.nombre AS rol_nombre
       FROM usuario u
       INNER JOIN rol r ON r.id = u.id_rol
       WHERE u.dni = $1
       LIMIT 1`,
      [req.userId]
    );

    const rol = rows[0]?.rol_nombre?.toLowerCase().trim();

    if (rol === "visitante") {
      return next();
    }

    // Rol incorrecto o usuario sin rol
    return res.status(403).json({ message: "Requiere Visitante" });
  } catch (err) {
    console.error("isAdmin error:", err);
    return res.status(500).json({ message: "Server error" });
  }

};
