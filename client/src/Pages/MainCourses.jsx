import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Products.module.css';

function MainCourses() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products/Main courses')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching main courses:', error);
      });
  }, []);

  return (
    <div>
      <h1 className={styles.categoriesTitle}>Main Courses</h1>
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

