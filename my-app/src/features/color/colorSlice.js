import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import colorService from './colorService';
export const getAllColor = createAsyncThunk("color/get-color", async (thunkAPI) => {
    try {
        return await colorService.getColor();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})
const initalState = {
    color: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}
export const colorSlice = createSlice({
    name: "color",
    initialState: initalState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllColor.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
        }).addCase(getAllColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})
export default colorSlice.reducer;