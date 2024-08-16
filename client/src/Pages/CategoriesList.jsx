// src/Components/CategoriesList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Products.module.css'; // создайте стили по необходимости

function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return <p className={styles.messages}>Failed to load categories</p>;
  }

  if (loading) {
    return <p className={styles.messages}>Loading categories...</p>;
  }

  return (
    <nav>
      <ul className={styles.navList}>
        {categories.map(category => (
          <li key={category}>
            <Link to={`/products/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CategoriesList;

