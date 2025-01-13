import React from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';

const Products: React.FC = () => {
  const { data: products, isLoading, isError } = useFetchProducts();

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>Error loading products.</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Products</h1>
      <ul>
        {products?.map(product => (
          <li key={product.id} style={{ marginBottom: '1rem' }}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <img src={product.image} alt={product.title} width={200} height={200} style={{objectFit: "contain"}} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
