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
        <div>
          <ul>
            <li>
              {lang("about_page_phone")}: {info[0].phone}
            </li>
            <li>
              {lang("about_page_email")}: {info[0].email}
            </li>
            <li>
              {lang("about_page_address")}: {info[0].address}
            </li>
            <li>
              {lang("about_page_open_times")}:{info[0].open_times}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default About;
