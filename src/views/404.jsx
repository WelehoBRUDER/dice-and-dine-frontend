import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";
import Button from "../components/Button";

const NotFound = () => {
  const {lang, setCurrentPage} = useLanguage();

  useEffect(() => {
    setCurrentPage("not_found_page");
  }, []);

  return (
    <>
      <h1>{lang("title")}</h1>
      <p>{lang("subtitle")}</p>
      <Button to="/">{lang("home")}</Button>
    </>
  );
};

export default NotFound;
