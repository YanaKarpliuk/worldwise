import { BrowserRouter, Route, Routes } from "react-router-dom";
import './scss/_general.scss';
import Product from "./pages/Product/Product.jsx";
import Pricing from "./pages/Pricing/Pricing.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import AppLayout from "./pages/AppLayout/AppLayout.jsx";
import Login from "./pages/Login/Login.jsx";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='product' element={<Product />}/>
          <Route path='pricing' element={<Pricing />}/>
          <Route path='app' element={<AppLayout />}/>
          <Route path='login' element={<Login />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
  )
}
