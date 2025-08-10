import { pool } from "../db.js";

export const checkDuplicateDniOrEmail = async (req, res, next) => {
    try {
        const { dni, correo_electronico } = req.body;
        const { rows } = await pool.query(
            "SELECT dni FROM usuario WHERE dni = $1 OR correo_electronico = $2",
            [dni, correo_electronico]
        );

        // Verifica si se encontró al menos un registro
        if (rows.length > 0) {
            return res.status(400).json({ message: "Ya existe el DNI o correo electrónico" });
        }

        // Si no hay duplicados, sigue con la siguiente función
        next();
    } catch (error) {
        console.error("Error al verificar duplicados:", error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

export const checkRolesExisted = async (req, res, next) => {
    try {
        const { rows } = await pool.query("SELECT nombre FROM rol");
        // Convertimos el array de objetos en un array de strings
        const nombreRol = rows.map(row => row.nombre);
        if (req.body.roles) {
            for (let i = 0; i < req.body.roles.length; i++) {
                if (!nombreRol.includes(req.body.roles)) {
                    return res.status(400).json({ message: `El rol '${req.body.roles}' no existe` });
                }
            }
        }

        next();
    } catch (error) {
        console.error('Error en checkRolesExisted:', error);
        res.status(500).json({ message: "Error del servidor al verificar roles" });
    }
};