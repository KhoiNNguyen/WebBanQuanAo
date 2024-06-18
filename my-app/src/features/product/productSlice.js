import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";
import { toast } from "react-toastify";

export const getAllProduct=createAsyncThunk("product/get",async (thunkAPI)=>{
    try{
        return await productService.getProduct();
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const addProDuctFavorite=createAsyncThunk("product/add-wishlist",async (proId,thunkAPI)=>{
    try{
        return await productService.addToWishlist(proId);
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const removeProductFarvorite=createAsyncThunk("product/remove-wishlist",async (proId,thunkAPI)=>{
    try{
        return await productService.removeToWishList(proId)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

const productState={
    product:"",
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
}

export const productSlice=createSlice({
    name:"product",
    initialState:productState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllProduct.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAllProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.product=action.payload;
        }).addCase(getAllProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(addProDuctFavorite.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addProDuctFavorite.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.addToWishlist=action.payload;
            if(state.isSuccess===true){
                toast.success("Thêm vào danh sách yêu thích thành công")
            }
        }).addCase(addProDuctFavorite.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(removeProductFarvorite.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(removeProductFarvorite.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.removeProductFarvorite = action.payload;
          })
          .addCase(removeProductFarvorite.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            
          })
    }
})

export default productSlice.reducer;