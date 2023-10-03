import { createSlice } from '@reduxjs/toolkit';

export const productCategoriesSlice = createSlice({
    name: 'productCategories',
    initialState: {
        categories: [],
    },
    reducers: {
        setProductCategories: (state, action) => {
            console.log(action)
            state.categories = action.payload
        },
    },
});

export const { setProductCategories } = productCategoriesSlice.actions;

export default productCategoriesSlice.reducer;
