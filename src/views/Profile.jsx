import {useEffect, useState} from "react";
import {useLanguage} from "../context/LanguageContext";
import {useUserContext} from "../hooks/useUserContext";
import {useUser} from "../hooks/userHooks";
import useOrder from "../hooks/useOrder";
import OrderTable from "../components/profile/OrderTable";
import ProfileImage from "../components/profile/ProfileImage";
import ProfileDetails from "../components/profile/ProfileDetails";
import LoadingWheel from "../components/LoadingWheel";
import useReservation from "../hooks/useReservation";
import ReservationTable from "../components/profile/ReservationTable";

const Profile = () => {
  const {lang, setCurrentPage} = useLanguage();
  const {user} = useUserContext();
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState([]);
  const [reservationDetails, setReservationDetails] = useState([]);
  const {getOrderDetails} = useOrder();
  const {getUserDetails} = useUser();
  const {getReservationDetails} = useReservation();
  const [activeTab, setActiveTab] = useState("orders");

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
        const reservations = await Promise.all(
          details.reservations.map(async (reservationId) => {
            const reservation = await getReservationDetails(reservationId);
            return reservation;
          })
        );
        const sortedOrders = [...orders].sort(
          (a, b) => (b.id || 0) - (a.id || 0)
        );
        const sortedReservations = [...reservations].sort(
          (a, b) => (b.id || 0) - (a.id || 0)
        );

        setReservationDetails(sortedReservations);
        setOrderDetails(sortedOrders);
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

  return (
    <div>
      <article>
        <title>{lang("profile_page.title")}</title>
        <meta name="description" content={lang("profile_page.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <h1>
        {lang("profile_page.title")} : {userDetails.name}
      </h1>

      <div className="profile-wrapper">
        <div className="profile-container">
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
          </div>
        </div>

        <div className="tab-section">
          <div className="tab-buttons">
            <button
              className={activeTab === "orders" ? "active" : ""}
              onClick={() => setActiveTab("orders")}
            >
              {lang("profile_page.orders")}
            </button>
            <button
              className={activeTab === "reservations" ? "active" : ""}
              onClick={() => setActiveTab("reservations")}
            >
              {lang("profile_page.reservations")}
            </button>
          </div>
          {activeTab === "orders" && <OrderTable orderDetails={orderDetails} />}

          {activeTab === "reservations" && (
            <ReservationTable reservationDetails={reservationDetails} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
