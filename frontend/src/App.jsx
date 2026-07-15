import React from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Components/Home";
import Header from "./Components/layout/Header";
import Footer from "./Components/layout/Footer";
import Menu from "./Components/Menu";
import Cart from "./Components/cart/Cart";

import Login from "./Components/user/Login";
import Register from "./Components/user/Register";
import Profile from "./Components/user/Profile";
import UpdateProfile from "./Components/user/UpdateProfile";

function App() {
  return (
    <>
      <ToastContainer />

      <Router>
        <div className="App">
          <Header />

          <div className="container container-fluids">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/eats/stores/search/:keyword"
                element={<Home />}
              />

              <Route
                path="/eats/stores/:id/menus"
                element={<Menu />}
              />

              <Route
                path="/users/login"
                element={<Login />}
              />

              <Route
  path="/users/signup"
  element={<Register />}
/>

              <Route
                path="/users/me"
                element={<Profile />}
              />

              <Route
                path="/users/me/update"
                element={<UpdateProfile />}
              />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;