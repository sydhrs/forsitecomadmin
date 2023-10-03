// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../Slices/productsSlice';

export const store = configureStore({
    reducer: {
        product: productReducer,
    },
});
