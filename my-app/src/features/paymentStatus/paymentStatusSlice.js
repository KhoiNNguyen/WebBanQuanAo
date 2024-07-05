import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import shippingStatusService from './paymentStatusService';
export const getAllShippingStatus = createAsyncThunk("paymentStatus/get-ShippingStatus", async (thunkAPI) => {
    try {
        return await shippingStatusService.getShippingStatus();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})
const initalState = {
    ShippingStatus: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}
export const shippingStatusSlice = createSlice({
    name: "ShippingStatus",
    initialState: initalState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllShippingStatus.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllShippingStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
        }).addCase(getAllShippingStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})
export default shippingStatusSlice.reducer;