import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './scss/_general.scss';
import Product from "./pages/Product/Product.jsx";
import Pricing from "./pages/Pricing/Pricing.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import AppLayout from "./pages/AppLayout/AppLayout.jsx";
import Login from "./pages/Login/Login.jsx";
import CityList from "./components/01-composites/CityList/CityList";
import CountryList from "./components/01-composites/CountryList/CountryList";
import City from "./components/01-composites/City/City.jsx";
import CreateCityForm from "./components/01-composites/CreateCityForm/CreateCityForm.jsx";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";

export default function App() {
  return (
      <CitiesProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Homepage/>}/>
              <Route path='product' element={<Product/>}/>
              <Route path='pricing' element={<Pricing/>}/>
              <Route path='app' element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
                <Route index element={<Navigate replace to={"cities"}/>}/>
                <Route path='cities' element={<CityList/>}/>
                <Route path='cities/:id' element={<City/>}/>
                <Route path='countries' element={<CountryList/>}/>
                <Route path='form' element={<CreateCityForm/>}/>
              </Route>
              <Route path='login' element={<Login/>}/>
              <Route path='*' element={<NotFound/>}/>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </CitiesProvider>
  )
}
