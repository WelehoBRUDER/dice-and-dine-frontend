import {useEffect, useState} from "react";
import {useLanguage} from "../context/LanguageContext";
import {useUserContext} from "../hooks/useUserContext";
import {useUser} from "../hooks/userHooks";
import Loading from "../components/Loading";

const Profile = () => {
  const {user} = useUserContext();
  const {getUserDetails} = useUser();
  const {lang, setCurrentPage} = useLanguage();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    setCurrentPage("profile_page");
  }, []);
  console.log("user in profile: ", user);

  useEffect(() => {
    if (!user?.id) return;
    const fetchUserDetails = async () => {
      const data = await getUserDetails(user.id);
      setUserDetails(data);
    };

    fetchUserDetails();
  }, []);

  if (!userDetails) {
    return <Loading />;
  }

  return (
    <div>
      <h1>{lang("profile_page.title")}</h1>
      <p>Username: {userDetails.name}</p>
      <p>E-mail: {userDetails.email}</p>
      <p>User type: {userDetails.user_type}</p>
      <p>Orders:{userDetails.orders.join(", ")}</p>
    </div>
  );
};

export default Profile;
