import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import imageService from './imageService';

export const getAllImage = createAsyncThunk("image/get-image", async (thunkAPI) => {
    try {
        return await imageService.getImage();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})
const initalState = {
    image: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "" 
}
export const imageSlice = createSlice({
    name: "image",
    initialState: initalState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllImage.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllImage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
        }).addCase(getAllImage.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})
export default imageSlice.reducer;