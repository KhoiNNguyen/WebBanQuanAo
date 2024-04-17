import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LauOutAdmin from './LayOut/Admin/LayOutAdmin';
import HomeAdmin from './Pages/Admin/HomeAdmin';


function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/Admin' element={<LauOutAdmin/>}>
          <Route index element={<HomeAdmin/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
