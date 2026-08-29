import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Products from "./pages/Products.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import SellProduct from "./pages/SellProduct";
import Invoice from "./pages/Invoice";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<ProtectedRoute> <AddProduct /> </ProtectedRoute>} />
        <Route path="/edit-product/:id" element={<ProtectedRoute> <EditProduct /> </ProtectedRoute> } />
        <Route path="/sell" element={<ProtectedRoute> <SellProduct /> </ProtectedRoute> }/>
        <Route path="/invoice/:id" element={<ProtectedRoute>  <Invoice /> </ProtectedRoute>}/>


      </Routes>
    </BrowserRouter>
  )
}

export default App