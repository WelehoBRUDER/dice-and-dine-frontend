import useRestaurantInfo from "../hooks/useRestaurantInfo";
import {useLanguage} from "../context/LanguageContext";
import {useEffect, useState} from "react";
import LeafletMap from "../components/map/LeafletMap";
import LoadingWheel from "../components/LoadingWheel";

const About = () => {
  const {currentLanguage, lang, setCurrentPage} = useLanguage();
  const [transportationInfo, setTransportationInfo] = useState(null);

  const {info, loading, getTransportationInfo} =
    useRestaurantInfo(currentLanguage);

  useEffect(() => {
    setCurrentPage("about_page");
  }, []);

  useEffect(() => {
    const fetchTransportationInfo = async () => {
      const info = await getTransportationInfo();
      setTransportationInfo(info);
    };
    fetchTransportationInfo();
  }, []);

  return (
    <div>
      <article>
        <title>{lang("about_page_title")}</title>
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
      <LeafletMap transportationInfo={transportationInfo}>
        <h2>{lang("location")}</h2>
      </LeafletMap>
    </div>
  );
};

export default About;
