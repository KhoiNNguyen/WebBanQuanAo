import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LauOutAdmin from "./LayOut/Admin/LayOutAdmin";
import HomeAdmin from "./Pages/Admin/HomeAdmin";
import LayOutClient from "./LayOut/Client/LayOutClient";
import HomeClient from "./Pages/Client/home/HomeClient";
import Brand from "./Pages/Admin/Brand/Brand";
import BrandCreate from "./Pages/Admin/Brand/BrandCreate";
import BrandEdit from "./Pages/Admin/Brand/BrandEdit";
import Color from "./Pages/Admin/Color/Color";
import Size from "./Pages/Admin/Size/Size";
import Login from "./Pages/Client/Login/Login";
import Register from "./Pages/Client/Register/Register";
import ProductDetail from "./Pages/Client/ProductDetail";
import Account from "./Pages/Client/account/account";
import Address from "./Pages/Client/account/address";
import Favorite from "./Pages/Client/account/favorite";
import Order from "./Pages/Client/account/order";
import Cart from "./Pages/Client/cart";
import Voucher from "./Pages/Admin/Voucher/Voucher";
import VoucherCreate from "./Pages/Admin/Voucher/VoucherCreate";
import Pay from "./Pages/Client/Pay";
import ProductType from "./Pages/Admin/ProductType.js/ProductType";
import PaymentMethod from "./Pages/Admin/PaymentMethod/PaymentMethod";
import ProductSale from "./Pages/Admin/ProductSale/ProductSale";
import CategoryProduct from "./Pages/Client/ProductType";
import ProductBrand from "./Pages/Client/ProductBrand";
import ClientProductSale from "./Pages/productSale/ProductSale";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Admin" element={<LauOutAdmin />}>
          <Route index element={<HomeAdmin />}></Route>
          <Route path="/Admin/Brands" element={<Brand />}></Route>
          <Route path="/Admin/Brands/Create" element={<BrandCreate />}></Route>
          <Route
            path="/Admin/Brands/Edit/uploadFile/:id"
            element={<BrandEdit />}
          ></Route>
          <Route path="/Admin/Colors" element={<Color />}></Route>
          <Route path="/Admin/Sizes" element={<Size />}></Route>
          <Route path="/Admin/Vouchers" element={<Voucher />}></Route>
          <Route
            path="/Admin/Vouchers/Create"
            element={<VoucherCreate />}
          ></Route>
          <Route path="/Admin/ProductTypes" element={<ProductType />}></Route>
          <Route path="/Admin/ProductSales" element={<ProductSale />}></Route>
          <Route
            path="/Admin/PaymentMethods"
            element={<PaymentMethod />}
          ></Route>
        </Route>
        <Route path="/" element={<LayOutClient />}>
          <Route index element={<HomeClient />} />
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/ProductDetail" element={<ProductDetail />}></Route>
          <Route path="/Account" element={<Account />}></Route>
          <Route path="/Account/Address" element={<Address />}></Route>
          <Route path="/Account/Order" element={<Order />}></Route>
          <Route path="/Account/Favorite" element={<Favorite />}></Route>
          <Route path="/Cart" element={<Cart />}></Route>
          <Route path="/pay" element={<Pay />}></Route>
          <Route path="/:productTypeId/:genderId" element={<CategoryProduct />}></Route>
          <Route path="/Brand/:brandId" element={<ProductBrand />}></Route>
          <Route path="/ProductSale" element={<ClientProductSale />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
