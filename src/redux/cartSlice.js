// cartSlice.js - Manages the shopping cart state and the product search query using Redux Toolkit.
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  searchQuery: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      // If product already in cart, increase quantity. Otherwise add it as a new entry with qty 1.
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      // Removes the item with the matching id from the cart entirely, regardless of quantity.
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action) {
      // Finds the matching item and increases only its quantity by one.
      const item = state.items.find((cartItem) => cartItem.id === action.payload);

      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);

      // Guard clause: quantity floor is 1. This prevents removing the item accidentally via the minus button.
      if (!item || item.quantity === 1) {
        return;
      }

      item.quantity -= 1;
    },
    clearCart(state) {
      // Checkout uses this reducer after a successful order to empty the cart.
      state.items = [];
    },
    setSearchQuery(state, action) {
      // Stores the search input value in Redux so the ProductList can filter products reactively.
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setSearchQuery,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectSearchQuery = (state) => state.cart.searchQuery;
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
