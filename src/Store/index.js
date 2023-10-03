import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../Slices/productsSlice';
import productCategoriesReducer from '../Slices/productCategoriesSlice';

import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedProductReducer = persistReducer(persistConfig, productReducer);
const persistedProductCategoriesReducer = persistReducer(persistConfig, productCategoriesReducer);
export const store = configureStore({
    reducer: {
        product: persistedProductReducer,
        productCategories: persistedProductCategoriesReducer

    },
});

export const persistor = persistStore(store);