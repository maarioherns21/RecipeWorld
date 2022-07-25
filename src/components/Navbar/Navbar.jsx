import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Search from "../Search/Search";

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            RECIPE WORLD
            <i class="fab fa-typo3" />
          </Link>
          <Search />
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                to="/recipe/share"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Share You Fav Recipe
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/searched"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Top 10 Recipes
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/cusine/Thai"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Weekly Recipe
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
