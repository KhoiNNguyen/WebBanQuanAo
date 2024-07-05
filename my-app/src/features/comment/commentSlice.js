import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import commentService from './commentService';
import { toast } from 'react-toastify';

export const getAllComment = createAsyncThunk("comment/get-comment", async (thunkAPI) => {
    try {
        return await commentService.getComment();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const addComment = createAsyncThunk("comment/add-comment", async (commentDetail,thunkAPI) => {
    try {
        return await commentService.addComment(commentDetail);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})
const initalState = {
    comment: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "" 
}
export const commentSilce = createSlice({
    name: "comment",
    initialState: initalState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllComment.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllComment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;

        }).addCase(getAllComment.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(addComment.pending, (state) => {
            state.isLoading = true;
        }).addCase(addComment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
            if(state.isSuccess===true){
                toast.success("Đánh giá sản phẩm thành công");
            }

        }).addCase(addComment.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})
export default commentSilce.reducer;