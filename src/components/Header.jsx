import {Link} from "react-router-dom";
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
              <Link to="/about">about_page</Link>
            </li>
            <li>
              <Link to="/forum">forum_page</Link>
            </li>
            <li>
              <Link to="/login">login_page</Link>
            </li>
            <li>
              <Link to="/register">register_page</Link>
            </li>
            <li>
              <Link to="/reservation">reservation_page</Link>
            </li>
            <li>
              <Link to="/review">review_page</Link>
            </li>
            <li>
              <Link to="/games">games_page</Link>
            </li>
            <li>
              <Link to="/menu">menu_page</Link>
            </li>
          </ul>
        </nav>
        <LanguageSelect />
      </div>
    </header>
  );
};

export default Header;
