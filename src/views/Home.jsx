import {useEffect} from "react";
import {useLanguage} from "../context/LanguageContext";
import Button from "../components/Button";
import logo from "/restaurant_logo.png?url";

const Home = () => {
  const {lang, setCurrentPage} = useLanguage();

  useEffect(() => {
    setCurrentPage("home_page");
  }, []);

  return (
    <>
      <article>
        <title>{lang("home_title")}</title>
        <meta name="description" content={lang("home_description")} />
        <meta name="keywords" content={lang("home_keywords")} />
        <meta name="author" content={lang("home_author")} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <div className="logo">
        <img src={logo} alt={lang("restaurant_icon_alt")}></img>
      </div>
      <div className="text-width">{lang("description")}</div>
      <nav className="flex-column center">
        <Button to="/menu">{lang("menu_link")}</Button>
        <Button to="/games">{lang("games_link")}</Button>
        <Button to="/about">{lang("about_link")}</Button>
      </nav>
    </>
  );
};

export default Home;
