import {useEffect} from "react";
import {useLanguage} from "../context/LanguageContext";
import logo from "/restaurant_logo.png?url";

const Home = () => {
  const {lang, setCurrentPage} = useLanguage();
  useEffect(() => {
    setCurrentPage("home_page");
  }, []);
  return (
    <>
      <div className="logo">
        <img src={logo} alt={lang("restaurant_icon_alt")}></img>
      </div>
      <div className="description">{lang("description")}</div>
    </>
  );
};

export default Home;
