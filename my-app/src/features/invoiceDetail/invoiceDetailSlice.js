import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import invoiceDetailService from './invoiceDetailService';

export const getAllInvoiceDetail = createAsyncThunk("invoiceDetail/get-invoiceDetail", async (thunkAPI) => {
    try {
        return await invoiceDetailService.getInvoiceDetail()
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const addInvoiceDetail = createAsyncThunk("invoiceDetail/add-invoiceDetail", async (invoiceData,thunkAPI) => {
    try {
        return await invoiceDetailService.addInvoiceDetail(invoiceData)
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})
const initalState = {
    invoiceDetail: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "" 
}
export const invoiceDetailSlide = createSlice({
    name: "invoiceDetail",
    initialState: initalState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllInvoiceDetail.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllInvoiceDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;

        }).addCase(getAllInvoiceDetail.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(addInvoiceDetail.pending, (state) => {
            state.isLoading = true;
        }).addCase(addInvoiceDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;

        }).addCase(addInvoiceDetail.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})
export default invoiceDetailSlide.reducer;