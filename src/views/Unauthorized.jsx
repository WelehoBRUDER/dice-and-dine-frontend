import {useEffect} from "react";
import {useLanguage} from "../context/LanguageContext";

const Unauthorized = () => {
  const {lang, setCurrentPage} = useLanguage();

  useEffect(() => {
    setCurrentPage("unauthorized_page");
  }, []);

  return (
    <div>
      <h1>{lang("unauthorized_page.title")}</h1>
      <p>{lang("unauthorized_page.description")}</p>
    </div>
  );
};

export default Unauthorized;
