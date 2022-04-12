import React from "react";
import {NavLink} from "react-router-dom";

import {navItems} from "./NavbarItems";

function Navbar() {
  return (
    <div className="Navbar">
      <nav className="container navbar navbar-expand-lg navbar-light">
        <NavLink className="navbar-brand fs-3" to="/home">HomeLibrary</NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navItems.map((item) => {
              return (
                <li key={item.id} className="nav-item ms-lg-1 me-lg-1">
                  <NavLink className="nav-link" to={item.path}>{item.name}</NavLink>
                </li>
              );
            })}
          </ul>

          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search books" aria-label="Search books"></input>
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>

          <div className="Profile mt-3 ms-lg-5 mt-lg-0">
            <div className="ProfileMenu">
              <ul className="navbar-nav">
                <li className="dropdown">
                  <a className="dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <i class="fa-solid fa-user fa-2x"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                    <a className="dropdown-item" href="#">Profile</a>
                    <a className="dropdown-item" href="#">Manage Account</a>
                    <div class="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Sign Out</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
