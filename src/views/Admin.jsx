import {NavLink} from "react-router-dom";
import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";

const Admin = () => {
  const {lang, setCurrentPage} = useLanguage();
  useEffect(() => {
    setCurrentPage("admin_page");
  }, []);

  return (
    <div className="admin-page">
      <h1>{lang("admin_page.title")}</h1>
      <p>Admin page default view?</p>
    </div>
  );
};

export default Admin;
