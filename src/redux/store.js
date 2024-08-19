// store.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});
