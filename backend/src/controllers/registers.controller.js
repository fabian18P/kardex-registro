import { pool } from "../db.js";

// LLAMAR REGISTROS KARDEX
export const getRegisters = async (req, res) => {
  try {
    const estado = await pool.query('SELECT * FROM estado_galpon');
    const alimentacion = await pool.query('SELECT * FROM alimentacion');
    const produccion = await pool.query('SELECT * FROM produccion_huevo');

    res.json({
      estado_galpon: estado.rows,
      alimentacion: alimentacion.rows,
      produccion_huevo: produccion.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registros kardex de consumo no encontrados" });
  }
};

// LLAMAR REGISTRO KARDEX
export const getRegister = async (req, res) => {
  try {
    const { registro_id } = req.params;

    const estado = await pool.query('SELECT * FROM estado_galpon WHERE estado_id = $1',[registro_id]);
    const alimentacion = await pool.query('SELECT * FROM alimentacion WHERE alimentacion_id = $1',[registro_id]);
    const produccion = await pool.query('SELECT * FROM produccion_huevo WHERE produccion_id = $1',[registro_id]);

    // Validar si no se encontró ningún registro en las tres tablas
    if (
      estado.rows.length === 0 &&
      alimentacion.rows.length === 0 &&
      produccion.rows.length === 0
    ) {
      return res
        .status(404)
        .json({ message: "Registros kardex de consumo no encontrados para el galpón" });
    }

    res.json({
      estado_galpon: estado.rows,
      alimentacion: alimentacion.rows,
      produccion_huevo: produccion.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los registros kardex de consumo" });
  }
};

// INSERTAR REGISTRO KARDEX
export const createRegister = async (req, res) => {
  const client = await pool.connect();
  try {
    const data = req.body;

    await client.query('BEGIN');

    // 1. Insertar en estado_galpon
    const estadoRes = await client.query(
      `INSERT INTO estado_galpon (fecha_registro, bajas_por_descarte, bajas_por_mortalidad, lote_galpon, registrado_por) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        data.fecha_registro,
        data.bajas_por_descarte,
        data.bajas_por_mortalidad,
        data.lote_galpon,
        data.registrado_por,
      ]
    );

    // 2. Insertar en alimentacion
    const alimentacionRes = await client.query(
      `INSERT INTO alimentacion (fecha_registro, tipo_alimentacion, nombre_consumo, cantidad_diaria, lote_galpon, registrado_por) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        data.fecha_registro_alimentacion,
        data.tipo_alimentacion,
        data.nombre_consumo,
        data.cantidad_diaria,
        data.lote_galpon,
        data.registrado_por,
      ]
    );

    // 3. Insertar en produccion_huevo
    const produccionRes = await client.query(
      `INSERT INTO produccion_huevo (fecha_registro, total_huevos, huevos_rotos, observaciones, lote_galpon, registrado_por) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        data.fecha_registro_produccion_huevo,
        data.total_huevos,
        data.huevos_rotos,
        data.observaciones,
        data.lote_galpon,
        data.registrado_por,
      ]
    );

    await client.query('COMMIT');

    return res.json({
      estado_galpon: estadoRes.rows[0],
      alimentacion: alimentacionRes.rows[0],
      produccion_huevo: produccionRes.rows[0],
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    if (error?.code === '23505') {
      return res.status(409).json({ message: 'Código de registro kardex duplicado' });
    }
    return res.status(500).json({ message: 'Error al ingresar un nuevo registro kardex' });
  } finally {
    client.release(); // ¡IMPORTANTE! Liberar el cliente
  }
};

// ELIMINAR REGISTRO KARDEX
export const deleteRegister = async (req, res) => {
  try {
    const { registro_id } = req.params;

    const deletedEstado = await pool.query("DELETE FROM estado_galpon WHERE estado_id = $1 RETURNING *",[registro_id]);
    const deletedAlimentacion = await pool.query("DELETE FROM alimentacion WHERE alimentacion_id = $1 RETURNING *",[registro_id]);
    const deletedProduccion = await pool.query("DELETE FROM produccion_huevo WHERE produccion_id = $1 RETURNING *",[registro_id]);

    // Validar si se eliminó al menos un registro
    if (
      deletedEstado.rowCount === 0 &&
      deletedAlimentacion.rowCount === 0 &&
      deletedProduccion.rowCount === 0
    ) {
      return res
        .status(404)
        .json({ message: "Registro de kardex no encontrado" });
    }

    return res.json({
      eliminado: {
        estado_galpon: deletedEstado.rows,
        alimentacion: deletedAlimentacion.rows,
        produccion_huevo: deletedProduccion.rows
      }
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al eliminar el registro de kardex" });
  }
};

// ACTUALIZAR REGISTRO KARDEX
export const updateRegister = async (req, res) => {
  const client = await pool.connect();
  try {
    const { estado_id, alimentacion_id,  produccion_id} = req.params;

    const data = req.body;

    await client.query('BEGIN');

    // 1. Actualizar estado_galpon
    const updateEstado = await client.query(
      `UPDATE estado_galpon
       SET fecha_registro = $1,
           bajas_por_descarte = $2,
           bajas_por_mortalidad = $3,
           lote_galpon = $4,
           registrado_por = $5
       WHERE estado_id = $6
       RETURNING *`,
      [
        data.fecha_registro,
        data.bajas_por_descarte,
        data.bajas_por_mortalidad,
        data.lote_galpon,
        data.registrado_por,
        estado_id
      ]
    );

    // 2. Actualizar alimentacion
    const updateAlimentacion = await client.query(
      `UPDATE alimentacion
       SET fecha_registro = $1,
           tipo_alimentacion = $2,
           nombre_consumo = $3,
           cantidad_diaria = $4,
           lote_galpon = $5,
           registrado_por = $6
       WHERE alimentacion_id = $7
       RETURNING *`,
      [
        data.fecha_registro_alimentacion,
        data.tipo_alimentacion,
        data.nombre_consumo,
        data.cantidad_diaria,
        data.lote_galpon,
        data.registrado_por,
        alimentacion_id
      ]
    );

    // 3. Actualizar produccion_huevo
    const updateProduccion = await client.query(
      `UPDATE produccion_huevo
       SET fecha_registro = $1,
           total_huevos = $2,
           huevos_rotos = $3,
           observaciones = $4,
           lote_galpon = $5,
           registrado_por = $6
       WHERE produccion_id = $7
       RETURNING *`,
      [
        data.fecha_registro_produccion_huevo,
        data.total_huevos,
        data.huevos_rotos,
        data.observaciones,
        data.lote_galpon,
        data.registrado_por,
        produccion_id
      ]
    );

    await client.query('COMMIT');

    // Verificamos si no se actualizó ningún registro (en las tres tablas)
    if (
      updateEstado.rowCount === 0 &&
      updateAlimentacion.rowCount === 0 &&
      updateProduccion.rowCount === 0
    ) {
      return res.status(404).json({
        message: "No se encontró ningún registro kardex con los IDs proporcionados",
      });
    }

    return res.json({
      estado_galpon: updateEstado.rows[0],
      alimentacion: updateAlimentacion.rows[0],
      produccion_huevo: updateProduccion.rows[0],
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    return res.status(500).json({
      message: "Error al actualizar el registro kardex",
    });
  } finally {
    client.release();
  }
};