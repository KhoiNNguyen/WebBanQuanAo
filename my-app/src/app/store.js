import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/user/userSlice";
import productSlice from "../features/product/productSlice";
import  productDetailSlice  from "../features/productDetail/productDetailsSlice";
import brandReducer from '../features/brand/brandSlice';
import productReducer from "../features/productType/productTypeSlice";
import colorSlice from "../features/color/colorSlice";
import sizeSlice from "../features/size/sizeSlice";
import wishlistSlice from "../features/wishlist/wishlistSlice";
import imageSlice from "../features/image/imageSlice";
import cartSlice from "../features/cart/cartSlice";
import voucherSlice from "../features/voucher/voucherSlice";
import invoiceSlice from "../features/invoice/invoiceSlide";
import invoiceDetailSlide from "../features/invoiceDetail/invoiceDetailSlice";
import shippingStatusSlice  from "../features/paymentStatus/paymentStatusSlice";
import  commentSilce  from "../features/comment/commentSlice";

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
        image:imageSlice,
        cart:cartSlice,
        voucher:voucherSlice,
        invoice:invoiceSlice,
        invoiceDetail:invoiceDetailSlide,
        shippingStatus:shippingStatusSlice,
        comment:commentSilce,
    }
})