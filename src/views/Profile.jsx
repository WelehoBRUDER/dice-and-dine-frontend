import {useEffect, useState} from "react";
import {useLanguage} from "../context/LanguageContext";
import {useUserContext} from "../hooks/useUserContext";
import {useUser} from "../hooks/userHooks";
import useOrder from "../hooks/useOrder";
import OrderTable from "../components/OrderTable";
import ProfileImage from "../components/ProfileImage";
import ProfileDetails from "../components/ProfileDetails";
import LoadingWheel from "../components/LoadingWheel";

const Profile = () => {
  const {lang, setCurrentPage} = useLanguage();
  const {user} = useUserContext();
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  const {getOrderDetails} = useOrder();
  const {getUserDetails} = useUser();

  const fetchUserAndOrderDetails = async () => {
    if (user && user.id) {
      try {
        const details = await getUserDetails(user.id);
        setUserDetails(details);
        const orders = await Promise.all(
          details.orders.map(async (orderId) => {
            const order = await getOrderDetails(orderId);
            return order;
          })
        );

        setOrderDetails(orders);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageUpload = (newImagePath) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      profile_image: newImagePath,
    }));
  };

  useEffect(() => {
    setCurrentPage("profile_page");
    fetchUserAndOrderDetails();
  }, [user, loading]);

  if (loading) {
    return <LoadingWheel />;
  }
  console.log("Order details", orderDetails);
  return (
    <div>
      <article>
        <title>{lang("profile_page.title")}</title>
        <meta name="description" content={lang("profile_description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <h1>
        {lang("profile_page.title")} : {userDetails.name}
      </h1>

      <div className="flex-row top-align">
        <div className="profile-image-container">
          <h2>{lang("profile_page.profile_picture")}</h2>
          <ProfileImage
            userDetails={userDetails}
            handleImageUpload={handleImageUpload}
          />
        </div>
        <div className="profile-details-container">
          <h2>{lang("profile_page.details")}</h2>
          <ProfileDetails userDetails={userDetails} lang={lang} />

          <h2>{lang("profile_page.orders")}</h2>
          <OrderTable userDetails={userDetails} orderDetails={orderDetails} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
