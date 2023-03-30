import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Feed from "./Pages/Feed";
import Profile from "./Pages/Profile";
import ProductType from "./Pages/ProductType";
import Product from "./Pages/Product";
import Sale from "./Pages/Sale";


import { logout } from "./actions/auth";



const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const logOut = useCallback(() => {
    dispatch(
      logout()
    ).then(() => {
      navigate('/login')
    });
  }, [dispatch]);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Sales Management App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button variant="light" onClick={() => navigate("/product_type")}>Product Type</Button>
            {' '}
            <Button variant="light" onClick={() => navigate("/product")}>Product</Button>            
            {' '}
            <Button variant="light" onClick={() => navigate("/sale")}>Sale</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Sale />} />
          <Route path="/product_type" element={<ProductType />} />
          <Route path="/product" element={<Product />} />
          <Route path="/sale" element={<Sale />} />
        </Routes>
      </div>

    </div>
  );
};

export default App;
