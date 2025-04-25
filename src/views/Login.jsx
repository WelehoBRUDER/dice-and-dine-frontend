import Form from "../components/Form";
import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";

const Login = () => {
  const {lang, setCurrentPage} = useLanguage();
  useEffect(() => {
    setCurrentPage("login_page");
  }, []);
  return <Form lang={lang} authorisation="login"></Form>;
};

export default Login;
