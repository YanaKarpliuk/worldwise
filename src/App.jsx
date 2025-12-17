import { BrowserRouter, Route, Routes } from "react-router-dom";
import './scss/_general.scss';
import Product from "./pages/Product/Product.jsx";
import Pricing from "./pages/Pricing/Pricing.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import AppLayout from "./pages/AppLayout/AppLayout.jsx";
import Login from "./pages/Login/Login.jsx";
import CityList from "./components/01-composites/CityList/CityList";
import { useEffect, useState } from "react";

export default function App() {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch("http://localhost:8000/cities")
        const data = await res.json()
        setCities(data)
      } catch(err) {
        throw new Error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])

  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />}/>
          <Route path='product' element={<Product />}/>
          <Route path='pricing' element={<Pricing />}/>
          <Route path='app' element={<AppLayout />}>
            <Route index element={<CityList cities={cities} isLoading={isLoading} />}/>
            <Route path='cities' element={<CityList cities={cities} isLoading={isLoading} />}/>
            <Route path='countries' element={<p>Countries</p>}/>
            <Route path='form' element={<p>Form</p>}/>
          </Route>
          <Route path='login' element={<Login />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
  )
}
