import {useEffect} from "react";
import {useLanguage} from "../../context/LanguageContext";
import useRestaurantInfo from "../../hooks/useRestaurantInfo";
import LoadingWheel from "../../components/LoadingWheel";

const About = () => {
  const {lang, setCurrentPage, currentLanguage} = useLanguage();

  const {info, loading} = useRestaurantInfo(currentLanguage);
  console.log("Info: ", info);

  useEffect(() => {
    setCurrentPage("editabout_page");
  }, []);

  if (loading) {
    return <LoadingWheel />;
  }

  return (
    <>
      <article>
        <title>{lang("editabout_page.title")}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <div className="flex-column">
        <h1>Edit Restaurant Information</h1>
        <p className="admin-description">
          {lang("editabout_page.description")}
        </p>

        <table className="delete-menu-item-table">
          <thead>
            <tr>
              <th>{lang("editabout_page.phone")}</th>
              <th>{lang("editabout_page.email")}</th>
              <th>{lang("editabout_page.opentimes")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{info[0].phone}</td>
              <td>{info[0].email}</td>
              <td>{info[0].open_times}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default About;
