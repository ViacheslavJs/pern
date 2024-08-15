import React, { useEffect, useState } from 'react';
import styles from './Products.module.css';

function MainCourses() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorConnect, setErrorConnect] = useState(false);

  useEffect(() => {
    // Определяем асинхронную функцию для получения данных
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/Appetizers`);
        const data = await response.json();
        setProducts(Array.from(data));
        console.log(data);
        console.log(products);
      } catch (error) {
        console.error('Error fetching main courses:', error);
        //setLoading(false); // Устанавливаем loading в false в случае ошибки.
        setErrorConnect(true);
        console.log(products);
      } finally {
        if (loading) {
          setLoading(false); // Если данные успешно загружены, устанавливаем loading в false.
        }
      }
    };

    // Вызываем асинхронную функцию
    fetchProducts();
  }, []);

  if (errorConnect) {
    return <p className={styles.messages}>Server unavailable</p>
  }

  if (loading) {
    //return <p className={styles.messages}>Loading...&#9203;</p>
    //return <p className={styles.messages}>Loading...&#8987;</p>
    //return <p className={styles.messages}>&#8987;</p>
    return <p className={styles.messages}>Loading...</p>
  }


  return (
  <div>
    <h1 className={styles.categoriesTitle}>Appetizers</h1>
    <div className={styles.products}>
      {products.length !== 0 ? (
        products.map(product => (
          <div className={styles.productsItem} key={product.id}>
            <img className={styles.productsImage} src={process.env.REACT_APP_API_URL + product.image_path} alt={product.alt} />
            <div className={styles.productsText}>
              <h2 className={styles.productsTitle}>{product.name}</h2>
              <p>{product.description}</p>
              <p className={styles.productsPrice}>Price: ${product.price}</p>
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

export default MainCourses;

