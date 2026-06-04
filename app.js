const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'admin_user',
  password: process.env.DB_PASSWORD || 'super_password',
  database: process.env.DB_NAME || 'my_project_db',
});

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const dbRes = await pool.query('SELECT NOW()');
    res.json({
      status: 'success',
      message: 'Бекендът и Базата данни работят отлично в Docker!',
      db_time: dbRes.rows[0].now
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Грешка при връзката с базата данни',
      error: err.message
    });
  }
});

app.listen(port, () => {
  console.log(`Приложението слуша на порт ${port}`);
});