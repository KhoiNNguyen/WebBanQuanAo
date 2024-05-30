import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";

export const getAllProduct=createAsyncThunk("product/get",async (thunkAPI)=>{
    try{
        return await productService.getProduct();
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const addProDuctFavorite=createAsyncThunk("product/wishlist",async (proId,thunkAPI)=>{
    try{
        return await productService.addToWishlist(proId);
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
            state.message="Thêm sản phẩm vào Danh Sách yêu thích thành công"
        }).addCase(addProDuctFavorite.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    }
})

export default productSlice.reducer;