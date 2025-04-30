import useRestaurantInfo from "../hooks/useRestaurantInfo";
import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";
import LoadingWheel from "../components/LoadingWheel";

const About = () => {
  const {currentLanguage, lang, setCurrentPage} = useLanguage();

  const {info, loading} = useRestaurantInfo(currentLanguage);

  useEffect(() => {
    setCurrentPage("about_page");
  }, []);
  console.log("info", info[0]);
  return (
    <div>
      <h1>{lang("about_page_title")}</h1>
      {loading ? (
        <LoadingWheel />
      ) : (
        <div id="about-page">
          <div>☎{lang("about_page_phone")}:</div>
          <div>{info[0]?.phone}</div>

          <div>✉️{lang("about_page_email")}: </div>
          <div>{info[0]?.email}</div>

          <div>📌{lang("about_page_address")}:</div>
          <div>{info[0]?.address}</div>

          <div>🕓{lang("about_page_open_times")}:</div>
          <div>{info[0]?.open_times}</div>
        </div>
      )}
    </div>
  );
};

export default About;
