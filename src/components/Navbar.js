import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import '../styles/Navbar.css';


const Navbar = () => {
  const cartItemsCount = useSelector(state => state.cart.items.length);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container" style={{ maxWidth: '1200px' }}>  {/* Adjust maxWidth as needed */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="E-commerce Logo" height="50" className="align-top me-2 rounded-circle" /> {/* Adjust height */}
          <h1 className="m-0" style={{ fontSize: '1.5rem' }}>E-Commerce</h1> {/* Adjust fontSize */}
        </Link>
        <div className="navbar-nav ms-auto">  {/* Add ms-auto to right-align the links */}
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/add-product">Add Product</Link>
          <Link className="nav-link" to="/cart">
            Cart <span className="badge" style={{ backgroundColor: 'transparent' }}>{cartItemsCount}</span>
          </Link>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
