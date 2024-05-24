import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { productDetailsService } from "./productDetailService";

export const getAllProductDetail=createAsyncThunk("productDetail/get",async (thunkAPI)=>{
    try{
        return await productDetailsService.getProductDetail();
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

const productDetailState={
    product:"",
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
}

export const productDetailSlice=createSlice({
    name:"productDetail",
    initialState:productDetailState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllProductDetail.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAllProductDetail.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.product=action.payload;
        }).addCase(getAllProductDetail.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    }
})

export default productDetailSlice.reducer;