import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Appetizers() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products/Appetizers')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching appetizers:', error);
      });
  }, []);

  return (
    <div>
      <h1>Appetizers</h1>
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

export default Appetizers;

