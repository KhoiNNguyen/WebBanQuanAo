import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/user/userSlice";
import productSlice from "../features/product/productSlice";
import  productDetailSlice  from "../features/productDetail/productDetailsSlice";
import brandReducer from '../features/brand/brandSlice';
import productReducer from "../features/productType/productTypeSlice";
import colorSlice from "../features/color/colorSlice";
import sizeSlice from "../features/size/sizeSlice";
import wishlistSlice from "../features/wishlist/wishlistSlice";

export const store=configureStore({
    reducer:{
        auth:authSlice,
        product:productSlice,
        productDetail:productDetailSlice,
        brand: brandReducer,
        productType:productReducer,
        color:colorSlice,
        size:sizeSlice,
        wishlist:wishlistSlice,
    }
})