import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import sizeService from './sizeService';
export const getAllSize = createAsyncThunk("size/get-size", async (thunkAPI) => {
    try {
        return await sizeService.getSize();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})
const initalState = {
    size: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}
export const sizeSlice = createSlice({
    name: "size",
    initialState: initalState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllSize.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllSize.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
        }).addCase(getAllSize.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})
export default sizeSlice.reducer;