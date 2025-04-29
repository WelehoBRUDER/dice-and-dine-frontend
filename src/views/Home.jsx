import {useEffect} from "react";
import {useLanguage} from "../context/LanguageContext";
import Button from "../components/Button";
import logo from "/restaurant_logo.png?url";
import LoadingWheel from "../components/LoadingWheel";
import ResultWindow from "../components/ResultWindow";

const Home = () => {
  const {lang, setCurrentPage} = useLanguage();

  useEffect(() => {
    setCurrentPage("home_page");
  }, []);

  return (
    <>
      <ResultWindow
        title="Review submitted!"
        desc="Your review was successfully submitted. It is safe to leave this page."
      />
      <ResultWindow
        success={false}
        title="Failed to submit review"
        desc="Your review could not submitted due to an error. You can try to submit again or leave the page."
        tryAgainCallback={() => alert("Try again")}
      />
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
