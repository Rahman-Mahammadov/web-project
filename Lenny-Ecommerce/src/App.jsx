import React from "react";
import { Navbar, Footer } from "./components";
import { HomePage, ProductDetail, ProductsList } from "./pages";
import { Basket } from "./pages/Basket";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from "./store";
import { ToastContainer } from "react-toastify";


export const App = ()=>{
    return(
        <>
        <Provider store={store}>
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/productslist/:categoryUrl" element={<ProductsList/>}/>
                <Route path="/productslist/search/:inputUrl" element={<ProductsList/>}/>
                <Route path="/productdetail" element={<ProductDetail/>}/>
                <Route path="/products/:id" element={<ProductDetail/>}/>
                <Route path="/basket/" element={<Basket/>}/>
            </Routes>

            <Footer/>
            <ToastContainer/>
        </BrowserRouter>
        </Provider>
        </>
    )
}