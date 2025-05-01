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
      <article>
        <title>{lang("about_page_title")}</title>
        <meta name="description" content={lang("about_description")} />
        <meta name="keywords" content={lang("about_keywords")} />
        <meta name="author" content={lang("about_author")} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
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
