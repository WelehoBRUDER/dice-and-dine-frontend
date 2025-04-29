import {useEffect, useState} from "react";
import {useLanguage} from "../context/LanguageContext";
import {useUserContext} from "../hooks/useUserContext";
import {useUser} from "../hooks/userHooks";
import Loading from "../components/Loading";
import useOrder from "../hooks/useOrder";

const Profile = () => {
  const {lang, setCurrentPage} = useLanguage();
  const {user} = useUserContext();
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  const {getOrderDetails} = useOrder();
  const {getUserDetails} = useUser();

  useEffect(() => {
    setCurrentPage("profile_page");

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
    fetchUserAndOrderDetails();
  }, [user]);

  if (loading) {
    return <Loading />;
  }
  console.log("User details setted:", userDetails);
  console.log("Order details setted:", orderDetails);

  return (
    <div className="main-content">
      <h1>{lang("profile_page.title")}</h1>

      <div className="flex-row">
        <div className="profile-image">
          <img
            src="https://placehold.co/160x200?text=No\nPicture"
            alt="Profile"
          />
        </div>
        <div className="flex-column">
          <div class="profile-detail-row">
            <span class="profile-label">Username:</span>
            <span class="profile-value">{userDetails.name}</span>
          </div>
          <div class="profile-detail-row">
            <span class="profile-label">E-mail:</span>
            <span class="profile-value">{userDetails.email}</span>
          </div>
          <div class="profile-detail-row">
            <span class="profile-label">User type:</span>
            <span class="profile-value">{userDetails.user_type}</span>
          </div>
        </div>
      </div>
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.orders.length > 0 ? (
            userDetails.orders.map((order, index) => (
              <tr key={index}>
                <td>{order}</td>
                <td>{new Date(orderDetails[index].time).toLocaleString()}</td>
                <td>{orderDetails[index].status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No orders available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
