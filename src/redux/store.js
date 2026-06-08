// store.js - Combines all Redux slices. Currently manages cart items and the product search query.
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice.js';

// configureStore creates the Redux store and automatically sets up helpful development checks.
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
