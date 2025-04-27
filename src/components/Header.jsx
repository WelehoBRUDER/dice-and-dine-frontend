import {Link, NavLink} from "react-router-dom";
import LanguageSelect from "./LanguageSelect";
import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";
import {useUserContext} from "../hooks/useUserContext";

const Header = () => {
  const {lang} = useLanguage();
  const {user, handleAutoLogin} = useUserContext();
  useEffect(() => {
    console.log("Autologin funktiota kutsuttu");
    handleAutoLogin();
  }, []);

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
          </ul>
        </nav>
        <LanguageSelect />
      </div>
    </header>
  );
};

export default Header;
