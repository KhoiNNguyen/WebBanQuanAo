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

export const removeInvoiceDetail = createAsyncThunk("invoiceDetail/remove-invoiceDetail", async (id,thunkAPI) => {
    try {
        return await invoiceDetailService.changeShippingInvoiceDetail(id)
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const changeShipping4InvoiceDetail = createAsyncThunk("invoiceDetail/changeShipping4-invoiceDetail", async (id,thunkAPI) => {
    try {
        return await invoiceDetailService.changeShippingSuccessInvoiceDetail(id)
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const deleteInvoiceDetail = createAsyncThunk("invoiceDetail/delete-invoiceDetail", async (id,thunkAPI) => {
    try {
        return await invoiceDetailService.deleteInvoiceDetail(id)
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
        .addCase(removeInvoiceDetail.pending, (state) => {
            state.isLoading = true;
        }).addCase(removeInvoiceDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;

        }).addCase(removeInvoiceDetail.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteInvoiceDetail.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteInvoiceDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;

        }).addCase(deleteInvoiceDetail.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        
    }
})
export default invoiceDetailSlide.reducer;