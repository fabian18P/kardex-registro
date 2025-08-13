import { pool } from "../db.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = jwt.verify(( req.headers["x-access-token"]), process.env.JWT_SECRET);;
  console.log(token);

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

export const hasRole = (allowedRoles) => {
  return async (req, res, next) => {
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

      if (allowedRoles.includes(rol)) {
        return next();
      }

      // Rol incorrecto o usuario sin rol
      return res.status(403).json({ message: `Requiere uno de los siguientes roles: ${allowedRoles.join(", ")}` });
    } catch (err) {
      console.error("hasRole error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  };
};