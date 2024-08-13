require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.static(__dirname + '/public'));
const PORT = process.env.PORT || 3001;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const TABLE_NAME = 'products';

// Маршрут для получения данных из базы данных по категории
app.get('/api/products/:category', async (req, res) => {
  const { category } = req.params;

  try {
    // Подключаемся к базе данных
    const client = await pool.connect();

    try {
      // Выполняем запрос к базе данных
      const result = await client.query(
        `SELECT * FROM ${TABLE_NAME} WHERE category = $1`,
        [category]
      );

      const products = result.rows;

      if (products.length === 0) {
        // Если массив пуст, отправляем 404 и логируем событие
        console.log(`No products found for category: ${category}`);
        res.status(404).json({ message: 'No products found for this category' });
      } else {
        // Отправляем данные, если они найдены
        res.json(products);
        //console.log(`${TABLE_NAME} - Category: ${category}`, products);
        console.log(`${TABLE_NAME}:`, products);
        console.log('\x1b[1;44mDB: connected\x1b[0m', pool.options.database);
      }
    } catch (queryError) {
      // Обрабатываем ошибку выполнения запроса
      console.error('Error executing query:', queryError);
      res.status(500).send('Server error');
    } finally {
      // Освобождаем подключение в любом случае
      client.release();
    }
  } catch (connectionError) {
    // Обрабатываем ошибку подключения к базе данных
    console.error('Database connection error:', connectionError);
    res.status(500).send('Server error');
    console.log('\x1b[1;43;97mDB: disconnected\x1b[0m');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

