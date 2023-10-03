// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../Slices/productsSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, productReducer);

export const store = configureStore({
    reducer: {
        product: persistedReducer,
    },
});

export const persistor = persistStore(store);