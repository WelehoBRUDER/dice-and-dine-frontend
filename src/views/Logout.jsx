import {useEffect} from "react";
import {useUserContext} from "../hooks/useUserContext";
import {useLanguage} from "../context/LanguageContext";
import Button from "../components/Button";

const Logout = () => {
  const {handleLogout} = useUserContext();
  const {lang} = useLanguage();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      handleLogout();
    }
  }, []);

  return (
    <>
      <article>
        <title>{lang("logout_title")}</title>
        <meta name="description" content={lang("logout_description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <h1>{lang("logged_out")}</h1>
      <p>{lang("logged_out_subtitle")}</p>
      <Button to="/">{lang("go_home")}</Button>
    </>
  );
};

export default Logout;
