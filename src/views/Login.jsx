import Form from "../components/Form";
import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";

const Login = () => {
  const {lang, setCurrentPage} = useLanguage();
  useEffect(() => {
    setCurrentPage("authentication_page");
  }, []);
  return (
    <>
      <article>
        <title>{lang("login_title")}</title>
        <meta name="description" content={lang("login_description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <Form lang={lang} authentication="login"></Form>;
    </>
  );
};

export default Login;
