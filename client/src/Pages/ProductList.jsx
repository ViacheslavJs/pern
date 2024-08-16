// src/Components/ProductList.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import styles from './ProductList.module.css'; // создайте стили по необходимости
import styles from './Products.module.css';

function ProductList() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${category}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (error) {
    return <p className={styles.messages}>Server unavailable</p>;
  }

  if (loading) {
    return <p className={styles.messages}>Loading products...</p>;
  }

  return (
    <div>
      <h1 className={styles.categoryTitle}>{category}</h1>
      <div className={styles.products}>
        {products.length > 0 ? (
          products.map(product => (
            <div className={styles.productItem} key={product.id}>
              <img className={styles.productImage} src={process.env.REACT_APP_API_URL + product.image_path} alt={product.alt} />
              <div className={styles.productText}>
                <h2 className={styles.productTitle}>{product.name}</h2>
                <p>{product.description}</p>
                <p className={styles.productPrice}>Price: ${product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.messagesNotFound}>No products found</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;

