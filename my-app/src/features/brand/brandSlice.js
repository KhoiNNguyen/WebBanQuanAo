import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import brandService from './brandService';
export const getAllBrand = createAsyncThunk("brand/get-brands", async (thunkAPI) => {
    try {
        return await brandService.getBrand();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})
const initalState = {
    brand: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}
export const brandSlice = createSlice({
    name: "brand",
    initialState: initalState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBrand.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllBrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
        }).addCase(getAllBrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})
export default brandSlice.reducer;