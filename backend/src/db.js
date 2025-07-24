import pg from 'pg';

export const pool = new pg.Pool({
  connectionString: process.env.POSTGRESQL_URL,
  ssl: {
    rejectUnauthorized: false // importante para Neon (usa SSL con certificado auto-firmado)
  }
});

// Ejemplo de prueba de conexión
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conectado a PostgreSQL en Neon:', res.rows[0]);
  }
});