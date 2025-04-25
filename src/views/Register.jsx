import Form from "../components/Form";
import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";

const Register = () => {
  const {lang, setCurrentPage} = useLanguage();
  useEffect(() => {
    setCurrentPage("register_page");
  }, []);
  return <Form lang={lang} authorisation="register"></Form>;
};

export default Register;
