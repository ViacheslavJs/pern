# PERN project
## Creating a database in PostgreSQL

Create table:
```
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  price NUMERIC(10,2),
  category VARCHAR(50),
  description TEXT,
  alt VARCHAR(255),  -- Альтернативный текст для изображения
  image_path VARCHAR(255)  -- Путь к изображению
);

```

Creating table records (columns and rows):
```
INSERT INTO products (name, price, category, description, alt, image_path)
VALUES
  ('Rib-eye steak', 25.99, 'Main courses', 'Juicy beef steak', 'Grilled rib-eye steak', '/images/steak.webp'),
  ('Caesar salad', 12.99, 'Appetizers', 'Classic chicken salad', 'Caesar salad with parmesan', '/images/caesar_salad.webp'),
  ('Chocolate cake', 8.99, 'Desserts', 'Tender chocolate cake', 'Chocolate cake with cherry', '/images/chocolate_cake.webp'),
  ('Carbonara pasta', 15.99, 'Main courses', 'Italian pasta with bacon and egg', 'Carbonara pasta in a plate', '/images/carbonara.webp'),
  ('Bruschetta with tomatoes', 7.99, 'Appetizers', 'Light snack with tomatoes and basil', 'Bruschetta with basil', '/images/bruschetta.webp'),
  ('Tiramisu', 6.99, 'Desserts', 'Italian dessert with mascarpone', 'Tiramisu in a glass', '/images/tiramisu.webp')
;

```

Delete all objects matching a specific category:
```
DELETE FROM products WHERE category = 'Main courses';

```

Add the appropriate entries back to the products table:
```
INSERT INTO products (name, price, category, description, alt, image_path)
VALUES
  ('Rib-eye steak', 25.99, 'Main courses', 'Juicy beef steak', 'Grilled rib-eye steak', '/images/steak.webp'),
  ('Carbonara pasta', 15.99, 'Main courses', 'Italian pasta with bacon and egg', 'Carbonara pasta in a plate', '/images/carbonara.webp');

```

Delete all rows in the "products" table:
```
DELETE FROM products;

```


