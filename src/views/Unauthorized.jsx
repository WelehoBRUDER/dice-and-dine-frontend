/**
 * Unauthorized.jsx
 * @description This file contains the Unauthorized component, which is displayed when a user tries to access a page they are not authorized to view.
 * @returns {JSX.Element} The Unauthorized component.
 */

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
