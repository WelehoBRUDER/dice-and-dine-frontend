import {useEffect, useState} from "react";
import {useLanguage} from "../context/LanguageContext";
import {useUserContext} from "../hooks/useUserContext";
import {useUser} from "../hooks/userHooks";
import Loading from "../components/Loading";
import useOrder from "../hooks/useOrder";
import OrderTable from "../components/OrderTable";
import ProfileImage from "../components/ProfileImage";
import ProfileDetails from "../components/ProfileDetails";

const Profile = () => {
  const {lang, setCurrentPage} = useLanguage();
  const {user} = useUserContext();
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  const {getOrderDetails} = useOrder();
  const {getUserDetails} = useUser();
  const [imageUpdated, setImageUpdated] = useState(null);

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
        setOrderDetails(orders.flat());
      } catch (error) {
        console.error("Failed to fetch user details", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setCurrentPage("profile_page");
    fetchUserAndOrderDetails();
  }, [user, imageUpdated]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="main-content">
      <h1>{lang("profile_page.title")}</h1>

      <div className="flex-row">
        <div className="profile-image-container">
          <h2>Profile picture</h2>
          <ProfileImage userDetails={userDetails} />
        </div>
        <div className="profile-details-container">
          <h2>User details</h2>
          <ProfileDetails userDetails={userDetails} lang={lang} />
        </div>
      </div>
      <h2>Orders</h2>
      <OrderTable userDetails={userDetails} orderDetails={orderDetails} />
    </div>
  );
};

export default Profile;
