import React from "react";
import { Link } from "react-router-dom";

import "./styles/Nav.css";
const Nav = () => {
  return (
    <div className="nav">
      <Link to="/" className="nav-item">
        Home
      </Link>
      <Link to="/orders" className="nav-item">
        Orders
      </Link>
    </div>
  );
};

export default Nav;
