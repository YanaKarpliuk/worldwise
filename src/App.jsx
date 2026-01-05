import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './scss/_general.scss';

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";

import Spinner from "./components/00-elements/Spinner/Spinner.jsx";
import CityList from "./components/01-composites/CityList/CityList";
import CountryList from "./components/01-composites/CountryList/CountryList";
import City from "./components/01-composites/City/City.jsx";
import CreateCityForm from "./components/01-composites/CreateCityForm/CreateCityForm.jsx";

const Product = lazy(() => import("./pages/Product/Product.jsx"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing.jsx"));
const Homepage = lazy(() => import("./pages/Homepage/Homepage.jsx"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound.jsx"));
const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout.jsx"));
const Login = lazy(() => import("./pages/Login/Login.jsx"));

export default function App() {
  return (
      <CitiesProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<Spinner full={true}/>}>
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
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </CitiesProvider>
  )
}
