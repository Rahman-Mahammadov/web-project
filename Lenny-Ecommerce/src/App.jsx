import React from "react";
import { Navbar, Footer } from "./components";
import { HomePage, ProductDetail, ProductsList } from "./pages";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { Basket } from "./pages/Basket";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import { Orders } from "./pages/UserOrder";
import { WishList } from "./pages/WishList";
import { ProductReview } from "./components/ProductReview";



export const App = () => {
  
  


  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/productslist/:categoryUrl"
              element={<ProductsList />}
            />
            <Route
              path="/productslist/search/:inputUrl"
              element={<ProductsList />}
            />
            <Route path="/productdetail" element={<ProductDetail />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/basket/" element={<Basket />} />
            <Route path="/success/" element={<PaymentSuccess />} />
            <Route path="/orders/" element={<Orders />} />
            <Route path="/wishlist/" element={<WishList />} />
            <Route path="/review/" element={<ProductReview />} />

          </Routes>

          <Footer />
          <ToastContainer autoClose={1500} />
        </BrowserRouter>
      </Provider>
    </>
  );
};
