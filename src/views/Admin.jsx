import {NavLink} from "react-router-dom";
import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";

const Admin = () => {
  const {lang, setCurrentPage} = useLanguage();
  useEffect(() => {
    setCurrentPage("admin_page");
  }, []);

  return (
    <>
      <article>
        <title>{lang("admin_page.title")}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <div className="admin-page">
        <h1>{lang("admin_page.title")}</h1>
        <p>{lang("admin_page.description")}</p>
      </div>
    </>
  );
};

export default Admin;
