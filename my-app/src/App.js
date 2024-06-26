import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LauOutAdmin from "./LayOut/Admin/LayOutAdmin";
import LayOutClient from "./LayOut/Client/LayOutClient";
import HomeClient from "./Pages/Client/home/HomeClient";
import Brand from "./Pages/Admin/Brand/Brand";
import BrandCreate from "./Pages/Admin/Brand/BrandCreate";
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
import Pay from "./Pages/Client/Pay";
import ProductType from "./Pages/Admin/ProductType.js/ProductType";
import PaymentMethod from "./Pages/Admin/PaymentMethod/PaymentMethod";
import ProductSale from "./Pages/Admin/ProductSale/ProductSale";
import CategoryProduct from "./Pages/Client/ProductType";
import ProductBrand from "./Pages/Client/ProductBrand";
import ClientProductSale from "./Pages/productSale/ProductSale";
import Products from "./Pages/Admin/Product/Product";
import ProductDetailAdmin from "./Pages/Admin/ProductDetail/ProductDetail";
import HomeAdmin from './Pages/Admin/Home/HomeAdmin';
import User from "./Pages/Admin/User/User";
import Invoice from "./Pages/Admin/Invoice/Invoice";
import InvoiceDetail from "./Pages/Admin/InvoiceDetail/InvoiceDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Admin" element={<LauOutAdmin />}>
          <Route index element={<HomeAdmin />}></Route>
          <Route path="/Admin/Brands" element={<Brand />}></Route>
          <Route path="/Admin/Brands/Create" element={<BrandCreate />}></Route>
          <Route path="/Admin/Colors" element={<Color />}></Route>
          <Route path="/Admin/Sizes" element={<Size />}></Route>
          <Route path="/Admin/Vouchers" element={<Voucher />}></Route>
          <Route path="/Admin/ProductTypes" element={<ProductType />}></Route>
          <Route path="/Admin/ProductSales" element={<ProductSale />}></Route>
          <Route path="/Admin/PaymentMethods"element={<PaymentMethod />}></Route>
          <Route path='/Admin/Products' element={<Products/>}></Route>
          <Route path='/Admin/ProductDetails' element={<ProductDetailAdmin/>}></Route>
          <Route path='/Admin/Users' element={<User/>}></Route>
          <Route path='/Admin/Invoices' element={<Invoice/>}></Route>
          <Route path='/Admin/InvoiceDetails' element={<InvoiceDetail />}></Route>
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
          <Route path="/ProductDetail/:productId" element={<ProductDetail />}></Route>  
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
