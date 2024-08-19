import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAsync, sortProducts } from '../redux/productsSlice';
import ProductItem from './ProductItem';
import '../styles/productList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector(state => state.products);
  const [sortOrder, setSortOrder] = useState(null); // State to manage sort order

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductsAsync());
    }
  }, [status, dispatch]);

  const handleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    dispatch(sortProducts(newOrder));
  };

  const handleClearSort = () => {
    setSortOrder(null);
    dispatch(fetchProductsAsync()); // Re-fetch products to reset sorting
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <>
      <div className='sort-controls' style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className='sort-btn' onClick={handleSort} disabled={sortOrder === 'asc'}>
          Sorted by Price {sortOrder === 'asc' ? '(Low to High)' : '(High to Low)'}
        </button>
        {sortOrder && (
          <button className='clear-sort-btn' onClick={handleClearSort}>
            Clear Sort
          </button>
        )}
      </div>
      <div className='product-list'>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map(product => (
            <ProductItem key={product.id} product={product} />
          ))
        )}
      </div>
    </>
  );
};

export default ProductList;
