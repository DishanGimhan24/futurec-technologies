import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import ProductList from "./Product/ProductList";
import Cart from "./Cart/Cart";
import Header from "./Header/Header";
import Register from "./Register/Register";
import Login from "./Login/Login";
import ProtectedRoute from "./Authantications/ProtectedRoute";
import { SearchProvider } from "./Context/SearchContext";
import { WishlistProvider } from "./Context/WishlistContext";
import { CategoriesProvider } from "./Context/CategoriesContext";

function App() {
  return (
    <CategoriesProvider>
    <WishlistProvider>
    <SearchProvider>
    <BrowserRouter> 
      <Routes> 
      
        <Route path="/home" element={<ProtectedRoute><ProductList /> </ProtectedRoute>} /> 
        <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>} /> 
        <Route path="/header" element={<Header/>} />
       

        <Route path="/" element={<Login/>}/>
        <Route path= "/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
    </SearchProvider>
    </WishlistProvider>
    </CategoriesProvider>
  );
}

export default App;
