import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProductAsync, updateProductAsync } from '../redux/productsSlice';
import { addToCart } from '../redux/cartSlice';
import ProductForm from './ProductForm';

const ProductItem = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProductAsync(product.id));
  };

  const handleEdit = (updatedProduct) => {
    dispatch(updateProductAsync({ id: product.id, data: updatedProduct }));
    setIsEditing(false);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (isEditing) {
    return <ProductForm product={product} onSubmit={handleEdit} />;
  }

  return (
    <div className="product-item">
      <div className="card h-100">
        <div className="card-body d-flex flex-column">
          <h3 className="card-title">{product.name}</h3>
          <p className="card-text">₹ {product.price}</p>
          <p className="card-text flex-grow-1">{product.description}</p>
          <div className="btn-grp">
            <button className="btn btn-primary"  style={{ backgroundColor: 'transparent' }} onClick={() => setIsEditing(true)}>Edit</button>
            <button className="btn btn-primary"style={{ backgroundColor: 'transparent' }}  onClick={handleDelete}>Delete</button>
            <button className="btn btn-primary"style={{ backgroundColor: 'transparent' }}  onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
