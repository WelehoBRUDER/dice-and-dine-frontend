import {Link, NavLink} from "react-router-dom";
import LanguageSelect from "./LanguageSelect";

const Header = () => {
  return (
    <header id="header">
      <div>
        <h1>
          <Link to="/">home_page</Link>
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
                about_page
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/forum"
                className={({isActive}) => (isActive ? "active-link" : "")}
              >
                forum_page
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({isActive}) => (isActive ? "active-link" : "")}
              >
                login_page
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({isActive}) => (isActive ? "active-link" : "")}
              >
                register_page
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reservation"
                className={({isActive}) => (isActive ? "active-link" : "")}
              >
                reservation_page
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/review"
                className={({isActive}) => (isActive ? "active-link" : "")}
              >
                review_page
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/games"
                className={({isActive}) => (isActive ? "active-link" : "")}
              >
                games_page
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/menu"
                className={({isActive}) => (isActive ? "active-link" : "")}
              >
                menu_page
              </NavLink>
            </li>
          </ul>
        </nav>
        <LanguageSelect />
      </div>
    </header>
  );
};

export default Header;
