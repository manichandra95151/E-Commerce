import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../services/api';
import { notifySuccess, notifyError } from '../utils/notifications';

export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    console.log('Fetching products...');
    const response = await fetchProducts();
    console.log('Products fetched:', response.data);
    return response.data;
  }
);

export const addProductAsync = createAsyncThunk(
  'products/addProduct',
  async (productData) => {
    const response = await addProduct(productData);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data }) => {
    const response = await updateProduct(id, data);
    return response.data;
  }
);

export const deleteProductAsync = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    await deleteProduct(id);
    return id;
  }
);


const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {
    sortProducts: (state, action) => {
      state.items.sort((a, b) => a.price - b.price);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        notifyError('Failed to fetch products');
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
        notifySuccess('Product added successfully');
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        notifyError('Failed to add product');
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        notifySuccess('Product updated successfully');
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        notifyError('Failed to update product');
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(product => product.id !== action.payload);
        notifySuccess('Product deleted successfully');
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        notifyError('Failed to delete product');
      });
  },
});

export const { sortProducts } = productsSlice.actions;
export default productsSlice.reducer;