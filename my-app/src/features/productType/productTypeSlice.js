import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productTypeService from './productTypeService';
export const getAllProductType = createAsyncThunk("productType/get", async (thunkAPI) => {
    try {
        return await productTypeService.getProductType();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})
const initalState = {
    productType: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}
export const productTypeSlice = createSlice({
    name: "productType",
    initialState: initalState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProductType.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllProductType.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
        }).addCase(getAllProductType.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})
export default productTypeSlice.reducer;