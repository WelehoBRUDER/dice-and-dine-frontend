import {useEffect} from "react";
import {useLanguage} from "../context/LanguageContext";
import {useUserContext} from "../hooks/useUserContext";

const Profile = () => {
  const {user} = useUserContext();
  const {lang, setCurrentPage} = useLanguage();
  useEffect(() => {
    setCurrentPage("profile_page");
  }, []);
  console.log("user in profile: ", user);
  return (
    <div>
      <h1>{lang("profile_page.title")}</h1>
      <p>This is the profile page.</p>
    </div>
  );
};

export default Profile;
