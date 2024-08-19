import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductForm from './components/ProductForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<ProductList />} />
            {/* <Route path="/products" element={<ProductList />} /> */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-product" element={<ProductForm />} />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
