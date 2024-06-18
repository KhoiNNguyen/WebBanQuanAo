import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from './cartService';
import { toast } from 'react-toastify';

export const getAllCart = createAsyncThunk("cart/get-cart", async (thunkAPI) => {
    try {
        return await cartService.getCart();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const addToCart=createAsyncThunk("cart/add-cart",async (cartData,thunkAPI)=>{
    try{
        return await cartService.addToCart(cartData);
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const removeCart=createAsyncThunk("cart/remove-cart",async (proId,thunkAPI)=>{
    try{
        return await cartService.removeToCart(proId);
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateQuanTityCart=createAsyncThunk("cart/update-cart",async (cartDetail,thunkAPI)=>{
    try{
        return await cartService.updateProductFromCart(cartDetail);
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

const initalState = {
    cart: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}
export const cartSlice = createSlice({
    name: "cart",
    initialState: initalState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
        }).addCase(getAllCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
            if(state.isSuccess){
                toast.success("Sản phẩm đã được thêm vào giỏ hàng")
            }
        }).addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(removeCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(removeCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.RemoveProduct = action.payload;
        }).addCase(removeCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateQuanTityCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateQuanTityCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.UpdateProduct = action.payload;
        }).addCase(updateQuanTityCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})
export default cartSlice.reducer;