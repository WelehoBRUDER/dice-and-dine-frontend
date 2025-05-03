import {Link, NavLink} from "react-router-dom";
import LanguageSelect from "./LanguageSelect";
import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";
import {useUserContext} from "../hooks/useUserContext";
import {useCart} from "../context/CartContext";

const Header = () => {
  const {lang} = useLanguage();
  const {user, handleAutoLogin} = useUserContext();
  const {cart} = useCart();

  useEffect(() => {
    handleAutoLogin();
  }, []);
  console.log("User in Header", user);
  return (
    <header id="header">
      <div>
        <h1>
          <Link to="/">{lang("home_page_link")}</Link>
        </h1>
      </div>
      <div>
        <nav>
          <ul>
            {/*
          <li>
            <Link to="/">Main</Link>
          </li>
          */}
            {user && user.user_type === "admin" && (
              <li>
                <NavLink
                  to="/admin"
                  className={({isActive}) => (isActive ? "active-link" : "")}
                >
                  {lang("admin_page_link")}
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to="/about"
                className={({isActive}) => (isActive ? "active-link" : "")}
              >
                {lang("about_page_link")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/menu"
                className={({isActive}) => (isActive ? "active-link" : "")}
              >
                {lang("menu_page_link")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/games"
                className={({isActive}) => (isActive ? "active-link" : "")}
              >
                {lang("games_page_link")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/review"
                className={({isActive}) => (isActive ? "active-link" : "")}
              >
                {lang("review_page_link")}
              </NavLink>
            </li>
            {user ? (
              <>
                {" "}
                <li>
                  <NavLink
                    to="/profile"
                    className={({isActive}) => (isActive ? "active-link" : "")}
                  >
                    {lang("profile_page_link")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/forum"
                    className={({isActive}) => (isActive ? "active-link" : "")}
                  >
                    {lang("forum_page_link")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/reservation"
                    className={({isActive}) => (isActive ? "active-link" : "")}
                  >
                    {lang("reservation_page_link")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/logout"
                    className={({isActive}) => (isActive ? "active-link" : "")}
                  >
                    {lang("logout_page_link")}
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/register"
                    className={({isActive}) => (isActive ? "active-link" : "")}
                  >
                    {lang("register_page_link")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({isActive}) => (isActive ? "active-link" : "")}
                  >
                    {lang("login_page_link")}
                  </NavLink>
                </li>
              </>
            )}
            {cart.length > 0 && (
              <li>
                <NavLink
                  to="/cart"
                  className={({isActive}) => (isActive ? "active-link" : "")}
                >
                  {lang("cart_page_link")}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <LanguageSelect />
      </div>
    </header>
  );
};

export default Header;
