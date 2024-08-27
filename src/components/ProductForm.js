import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProductAsync, updateProductAsync } from '../redux/productsSlice';
import { notifyError } from '../utils/notifications';
import  '../styles/ProductForm.css';


const ProductForm = ({ product, onSubmit }) => {
  const [formData, setFormData] = useState(product || { name: '', price: '', description: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        await dispatch(updateProductAsync({ id: product.id, data: formData })).unwrap();
      } else {
        await dispatch(addProductAsync(formData)).unwrap();
      }
      // onSubmit && onSubmit();
      //goto home page after 1 seconds
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      notifyError('Failed to save product');
    } 
  };

  return (
    <form className='product-form' onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        name="image"
        type="text"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <button type="submit">{product ? 'Update' : 'Add'} Product</button>
    </form>
  );
};

export default ProductForm;
