import React from "react";
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav
      class="navbar navbar-expand-lg border-bottom fixed-top"
      style={{ backgroundColor: "#FFF" }}
    >
      <div class="container-fluid df p-2" >
        <div className="customeImageStyle">
          <Link class="navbar-brand" to={"/"}>
            <img
              src="media/images/logo.svg"
              style={{ width: "30%", marginLeft:"3rem"}}
              alt="Logo"
            />
          </Link>
        </div>
        
        <div class="collapse navbar-collapse customeRouteStyle" id="navbarSupportedContent">
          <form class="d-flex" role="search">
            <ul class="navbar-nav mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/signup" >
                  Register
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/login" >
                  Login
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/about" style={{marginLeft:"20px"}}>
                  About
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/product">
                  Product
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/pricing">
                  Pricing
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/support">
                  Support
                </Link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
