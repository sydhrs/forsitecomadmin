import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        categories: [],
        modalVisible: false,
        modalProductId: null,
    },
    reducers: {
        addProduct: (state, action) => {
            console.log(state, action)
            state.products.unshift(action.payload)
        },
        setProducts: (state, action) => {
            state.products = action.payload.products;
            state.categories = action.payload.categories
        },
        updateProductQuantity: (state, action) => {
            const { productId, newQuantity } = action.payload;
            const productIndex = state.products.findIndex(product => product.id === productId);
            if (productIndex !== -1) {
                state.products[productIndex].quantity = newQuantity;
            }
        },
    },
});

export const { setProducts, updateProductQuantity, addProduct } = productSlice.actions;

export default productSlice.reducer;
