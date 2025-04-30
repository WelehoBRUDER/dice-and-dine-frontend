import Loading from "../components/Loading";
import useRestaurantInfo from "../hooks/useRestaurantInfo";
import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";

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
        <Loading />
      ) : (
        <div id="about-page">
          <ul>
            <li>
              {String.fromCodePoint(0x260e)}
              {lang("about_page_phone")}: {info[0].phone}
            </li>
            <li>
              {/*String.fromCodePoint(0x2709)*/}
              ✉️
              {lang("about_page_email")}: {info[0].email}
            </li>
            <li>
              {String.fromCodePoint(0x1f4cc)}
              {lang("about_page_address")}: {info[0].address}
            </li>
            <li>
              {String.fromCodePoint(0x1f553)}
              {lang("about_page_open_times")}:{info[0].open_times}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default About;
