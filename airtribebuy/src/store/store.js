import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice';
import wishlistReducer from './slices/wishlistSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
})