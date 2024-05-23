import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/user/userSlice";
import productSlice from "../features/product/productSlice";
import  productDetailSlice  from "../features/productDetail/productDetailsSlice";

export const store=configureStore({
    reducer:{
        auth:authSlice,
        product:productSlice,
        productDetail:productDetailSlice,
    }
})