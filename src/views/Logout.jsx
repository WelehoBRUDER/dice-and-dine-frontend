import {useEffect} from "react";
import {useUserContext} from "../hooks/useUserContext";
import {useLanguage} from "../context/LanguageContext";
import Button from "../components/Button";

const Logout = () => {
  const {handleLogout} = useUserContext();
  const {lang, setCurrentPage} = useLanguage();

  useEffect(() => {
    setCurrentPage("logout_page");
    const token = localStorage.getItem("token");
    if (token) {
      handleLogout();
    }
  }, []);

  return (
    <>
      <article>
        <title>{lang("logout_page.title")}</title>
        <meta name="description" content={lang("logout_page.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <h1>{lang("logout_page.title")}</h1>
      <p>{lang("logout_page.description")}</p>
      <Button to="/">{lang("logout_page.go_home")}</Button>
    </>
  );
};

export default Logout;
