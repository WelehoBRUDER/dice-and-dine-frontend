import {useEffect} from "react";
import {useLanguage} from "../context/LanguageContext";
import Button from "../components/Button";
import logo from "/restaurant_logo.png?url";
import LoadingWheel from "../components/LoadingWheel";

const Home = () => {
  const {lang, setCurrentPage} = useLanguage();

  useEffect(() => {
    setCurrentPage("home_page");
  }, []);

  return (
    <>
      <LoadingWheel />
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
