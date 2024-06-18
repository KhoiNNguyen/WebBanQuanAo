import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import voucherService from './voucherService';
export const getAllVoucher = createAsyncThunk("voucher/get-voucher", async (thunkAPI) => {
    try {
        return await voucherService.getVoucher();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})
const initalState = {
    voucher: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}
export const voucherSlice = createSlice({
    name: "voucher",
    initialState: initalState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllVoucher.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllVoucher.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
        }).addCase(getAllVoucher.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})
export default voucherSlice.reducer;