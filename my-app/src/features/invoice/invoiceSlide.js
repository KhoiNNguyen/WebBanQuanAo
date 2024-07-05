import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import invoiceService from './invoiceService';

export const getAllInvoice = createAsyncThunk("invoice/get-invoice", async (thunkAPI) => {
    try {
        return await invoiceService.getInvoice();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const addInvoice = createAsyncThunk("invoice/add-invoice", async (invoiceData,thunkAPI) => {
    try {
        return await invoiceService.addInvoice(invoiceData);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const deleteInvoice = createAsyncThunk("invoice/delete-invoice", async (id,thunkAPI) => {
    try {
        return await invoiceService.deleteInvoice(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})
const initalState = {
    invoice: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "" 
}
export const invoiceSlice = createSlice({
    name: "invoice",
    initialState: initalState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllInvoice.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllInvoice.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;

        }).addCase(getAllInvoice.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(addInvoice.pending, (state) => {
            state.isLoading = true;
        }).addCase(addInvoice.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;

        }).addCase(addInvoice.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteInvoice.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteInvoice.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;

        }).addCase(deleteInvoice.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})
export default invoiceSlice.reducer;