import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Desserts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products/Desserts')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching desserts:', error);
      });
  }, []);

  return (
    <div>
      <h1>Desserts</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image_path} alt={product.alt} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Desserts;

