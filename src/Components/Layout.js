import { Outlet, Link } from "react-router-dom";
import "../Styles/Layout.scss";
import logo from "../Assets/logo.png";
import { useState, useEffect } from "react";
import Menu from "./MobileMenu";
import { useSelector } from "react-redux";

const Layout = () => {
  const [small, setSmall] = useState(false);

  const [isMenuOpen, toggleMenu] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setSmall(window.pageYOffset > 75)
      );
    }
  }, []);

  const cart = useSelector(state => state.cart)

  const [cartCount, setCount] = useState(0)

  useEffect(()=>{
    setCount(Object.keys(cart).length)
  }, [cart])

  return (
    <header className={small ? "scroll-header" : ""}>
      <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}></Menu>

      <img className="header-logo" src={logo} />

      <nav className="desktop-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contests">Concursuri</Link>
          </li>
          <li>
            <Link to="/winners">Câștigători</Link>
          </li>
        </ul>
      </nav>
      <div className="wrapper">
        <Link to="/cart">
          <div className="cart-icon-wrapper">
            <i
              className="fi fi-rr-shopping-cart"
              onClick={() => {
                if (isMenuOpen) {
                  toggleMenu(!isMenuOpen);
                }
              }}
            ></i>
            <p  className="cart-count" style={{display : cartCount > 0 ? "block" : "none"}}>{cartCount}</p>
          </div>
        </Link>
        <Link to="/profile">
          <i
            className="fi fi-rr-user"
            onClick={() => {
              if (isMenuOpen) {
                toggleMenu(!isMenuOpen);
              }
            }}
          ></i>
        </Link>
      </div>
      <Outlet />
    </header>
  );
};

export default Layout;
