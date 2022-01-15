import React from "react";
import { Link } from "react-router-dom";
import "../public/styles/nav.css";
import logo from "../public/images/logo.png";
function Navbar() {
  return (
    <div>
      <nav class="navbar sticky-top navbar-expand-lg navbar-light">
        <Link to="/">
          <img src={logo} />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link class="nav-link" to="/about">
                About
              </Link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Find Rides
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Post Rides
              </a>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/login">
                Sign in
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
