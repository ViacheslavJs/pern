require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const USE_DATABASE = process.env.USE_DATABASE === 'true';

app.use(express.static(__dirname + '/public'));
app.use(cors());


if (USE_DATABASE) {
//


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  connectionString: process.env.INTERNAL_DB_URL,
});

const TABLE_NAME = 'products';

//TODO TEST
app.get('/api/categories', async (req, res) => {
  try {
    // Подключаемся к базе данных
    const client = await pool.connect();

    try {
      // Выполняем запрос для получения уникальных категорий
      const result = await client.query(
        `SELECT DISTINCT category FROM ${TABLE_NAME}`
      );

      const categories = result.rows.map(row => row.category);

      res.json(categories);
      console.log(`${TABLE_NAME}:`, categories);
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
//


} else {


// Функция для чтения данных из JSON-файла
async function readDataFromJSON() {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON file:', err);
    throw err;
  }
}

// Route to output JSON in browser - http://localhost:3001/data
app.get('/data', async (req, res) => {
  try {
    const data = await readDataFromJSON();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//

//TODO TEST
app.get('/api/categories', async (req, res) => {
  try {
    const data = await readDataFromJSON();
    const categories = [...new Set(data.products.map(product => product.category))];
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Маршрут для получения данных по категории из JSON
app.get('/api/products/:category', async (req, res) => {
  const { category } = req.params;

  try {
    // Чтение данных из JSON-файла
    const data = await readDataFromJSON();
    const products = data.products.filter(product => product.category === category);

    if (products.length === 0) {
      res.status(404).json({ message: 'No products found for this category' });
    } else {
      res.json(products);
      console.log('\x1b[1;43;97mJSON:\x1b[0m', '\n', products);
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//
} //else


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

