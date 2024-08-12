require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.static(__dirname + '/public'));
const PORT = process.env.PORT || 3001;

// Подключение к базе данных
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const TABLE_NAME = 'products';

/*
// Маршрут для получения данных из базы данных
app.get('/api/main-courses', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM ${TABLE_NAME} WHERE category = 'Main courses'`);
    const products = result.rows;    
    res.json(products);
    console.log(`${TABLE_NAME}:`, products);
    console.log('\x1b[1;44mDB: connected\x1b[0m', pool.options.database);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Маршрут для получения данных из базы данных
app.get('/api/appetizers', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM ${TABLE_NAME} WHERE category = 'Appetizers'`);
    const products = result.rows;    
    res.json(products);
    console.log(`${TABLE_NAME}:`, products);
    console.log('\x1b[1;44mDB: connected\x1b[0m', pool.options.database);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Маршрут для получения данных из базы данных
app.get('/api/desserts', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM ${TABLE_NAME} WHERE category = 'Desserts'`);
    const products = result.rows;    
    res.json(products);
    console.log(`${TABLE_NAME}:`, products);
    console.log('\x1b[1;44mDB: connected\x1b[0m', pool.options.database);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
//
*/

// Маршрут для получения данных из базы данных по категории
app.get('/api/products/:category', async (req, res) => {
  const { category } = req.params;

  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM  
 ${TABLE_NAME} WHERE category = $1`,
      [category]
    );
    const products = result.rows;

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    res.json(products);

    console.log(`${TABLE_NAME}:`, products);
    console.log('\x1b[1;44mDB: connected\x1b[0m', pool.options.database);

    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

