import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LauOutAdmin from './LayOut/Admin/LayOutAdmin';
import HomeAdmin from './Pages/Admin/HomeAdmin';
import LayOutClient from './LayOut/Client/LayOutClient';
import HomeClient from './Pages/Client/home/HomeClient';
import Brand from './Pages/Admin/Brand/Brand';
import BrandCreate from './Pages/Admin/Brand/BrandCreate';
import BrandEdit from './Pages/Admin/Brand/BrandEdit';
import Color from './Pages/Admin/Color/Color';
import Size from './Pages/Admin/Size/Size';
import Login from './Pages/Client/Login/Login';
import Register from './Pages/Client/Register/Register';
import ProductDetail from './Pages/Client/ProductDetail';
import Account from './Pages/Client/account/account';



function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/Admin' element={<LauOutAdmin/>}>
          <Route index element={<HomeAdmin/>}></Route>
          <Route path='/Admin/Brands' element={<Brand/>}></Route>
          <Route path='/Admin/Brands/Create' element={<BrandCreate/>}></Route>
          <Route path='/Admin/Brands/Edit/uploadFile/:id' element={<BrandEdit/>}></Route>
          <Route path='/Admin/Colors' element={<Color/>}></Route>
          <Route path='/Admin/Sizes' element={<Size/>}></Route>
        </Route>
        <Route path='/' element={<LayOutClient/>}>
        <Route index element={<HomeClient />}/>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Register' element={<Register />}></Route>
        <Route path='/ProductDetail' element={<ProductDetail />}></Route>
        <Route path='/Account' element={<Account />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
