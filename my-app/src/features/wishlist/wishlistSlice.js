import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import wishlistService from './wishlistService';

export const getAllUserWishList = createAsyncThunk("wishlist/get-wishllist", async (thunkAPI) => {
    try {
        return await wishlistService.getUserWishList();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})
const initalState = {
    wishlist: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "" 
}
export const wishlistSile = createSlice({
    name: "wishlist",
    initialState: initalState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUserWishList.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllUserWishList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
        }).addCase(getAllUserWishList.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})
export default wishlistSile.reducer;