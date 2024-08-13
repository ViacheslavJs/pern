import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Products.module.css';

function MainCourses() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Определяем асинхронную функцию для получения данных
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products/Desserts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching main courses:', error);
      }
    };

    // Вызываем асинхронную функцию
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className={styles.categoriesTitle}>Desserts</h1>
      <div className={styles.products}>
        {products.map(product => (
          <div className={styles.productsItem} key={product.id}>
            <img className={styles.productsImage} src={product.image_path} alt={product.alt} />
            <div className={styles.productsText}>
              <h2 className={styles.productsTitle}>{product.name}</h2>
              <p>{product.description}</p>
              <p className={styles.productsPrice}>Price: ${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainCourses;

