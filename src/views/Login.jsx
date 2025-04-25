import Form from "../components/Form";
import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";

const Login = () => {
  const {lang, setCurrentPage} = useLanguage();
  useEffect(() => {
    setCurrentPage("authentication_page");
  }, []);
  return <Form lang={lang} authentication="login"></Form>;
};

export default Login;
