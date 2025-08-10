import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS ?? 10);
const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "1d";

// Sanitizador simple (opcional)
const norm = (s) => (typeof s === "string" ? s.trim() : s);

export const signUp = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    // 1) Hashear contraseña
    if (!data?.contrasena) {
      return res.status(400).json({ message: "La contraseña es obligatoria" });
    }
    const hash = await bcrypt.hash(data.contrasena, SALT_ROUNDS);

    // 2) Insertar usando el hash y (opcional) normalizar email
    const email = norm(data.correo_electronico)?.toLowerCase();

    let role;

    // 3) Asignar rol antes de la inserción
    if (data?.roles && data.roles.length > 0) {
      // Verificar si el rol existe en la base de datos
      const result = await pool.query("SELECT id FROM rol WHERE nombre = $1", [
        data.roles[0],
      ]);

      if (result.rows.length > 0) {
        // Si el rol existe, asignar el id_rol correspondiente
        role = result.rows[0].id;
      } else {
        // Si el rol no existe, asignar el rol por defecto "visitante"
        const defaultRole = await pool.query(
          "SELECT id FROM rol WHERE nombre = $1",
          ["visitante"]
        );
        role = defaultRole.rows[0].id;
      }
    } else {
      // Si no se pasa el rol, asignar el rol por defecto "visitante"
      const defaultRole = await pool.query(
        "SELECT id FROM rol WHERE nombre = $1",
        ["visitante"]
      );
      role = defaultRole.rows[0].id;
    }

    // 4) Insertar usuario con el rol asignado
    const { rows } = await pool.query(
      `INSERT INTO usuario (
        dni, primer_nombre, segundo_nombre, apellido_paterno, apellido_materno,
        genero, fecha_nacimiento, pais, region, provincia, distrito, direccion,
        celular, correo_electronico, contrasena, imagen, id_rol
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17
      )
      RETURNING 
        dni, primer_nombre, segundo_nombre, apellido_paterno, apellido_materno,
        genero, fecha_nacimiento, pais, region, provincia, distrito, direccion,
        celular, correo_electronico, imagen, created_at`,
      [
        data.dni,
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
        email,
        hash, // Contraseña con hash
        data.imagen,
        role, // Asignar el id del rol aquí, que ya está correcto
      ]
    );

    const user = rows[0];

    // 5) Emitir token
    const token = jwt.sign({ sub: user.dni }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    if (error?.code === "23505") {
      return res.status(409).json({ message: "DNI o correo duplicado" });
    }
    return res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { correo_electronico, contrasena } = req.body;
    if (!correo_electronico || !contrasena) {
      return res.status(400).json({ message: "Credenciales incompletas" });
    }

    const email = correo_electronico.trim().toLowerCase();

    // 1) Buscar usuario y traer el hash
    const { rows } = await pool.query(
      `SELECT u.dni, u.correo_electronico, u.contrasena, u.primer_nombre, u.apellido_paterno, u.imagen,
          r.id     AS rol_id,
          r.nombre AS rol_nombre
        FROM usuario AS u
        INNER JOIN rol AS r
          ON r.id = u.id_rol
        WHERE u.correo_electronico = $1
        LIMIT 1
        `, [email]);

    const user = rows[0];
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // 2) Comparar contraseña con el hash
    const ok = await bcrypt.compare(contrasena, user.contrasena);
    if (!ok) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // 3) Generar JWT
    const token = jwt.sign({ sub: user.dni }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // 4) No devolver el hash
    const { contrasena: _, ...safeUser } = user;

    return res.json({ user: safeUser, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
