import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LauOutAdmin from './LayOut/Admin/LayOutAdmin';
import HomeAdmin from './Pages/Admin/HomeAdmin';
import LayOutClient from './LayOut/Client/LayOutClient';
import HomeClient from './Pages/Client/home/HomeClient';



function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/Admin' element={<LauOutAdmin/>}>
          <Route index element={<HomeAdmin/>}></Route>
        </Route>
        <Route path='/' element={<LayOutClient/>}>
        <Route index element={<HomeClient />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
