import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

export const registerUser=createAsyncThunk("auth/register",async (userData,thunkAPI)=>{
    try{
        return authService.register(userData)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const loginUser=createAsyncThunk("auth/login",async (userData,thunkAPI)=>{
    try{
        return authService.login(userData)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

export const getAllUser=createAsyncThunk("auth/get-user",async (thunkAPI)=>{
    try{
        return authService.getUser();
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const initialState={
    user:getTokenFromLocalStorage,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
}

export const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createUser=action.payload;
            if(state.isSuccess===true){
                toast.success("Tạo tài khoản thành công")
            }
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error
            if(state.isError===true){
                toast.error(action.error)
            }
        })
        builder.addCase(loginUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user=action.payload;
            if(state.isSuccess===true){
                localStorage.setItem('loginsuccess',"success")
                toast.success("Đăng nhập thành công")
            }
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error
            if(state.isError===true){
                toast.error(action.error)
            }
        })
        builder.addCase(getAllUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(getAllUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user=action.payload;
        }).addCase(getAllUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error
            if(state.isError===true){
                toast.error(action.error)
            }
        })
    }
})

export default authSlice.reducer;