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
          const orders = await getOrderDetails(user.id);
          setOrderDetails(orders);
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
    <div>
      <h1>{lang("profile_page.title")}</h1>
      <p>Username: {userDetails.name}</p>
      <p>E-mail: {userDetails.email}</p>
      <p>User type: {userDetails.user_type}</p>
      <p>Orders:{userDetails.orders.join(", ")}</p>
      <table>
        <thead>
          <th>Order ID</th>
          <th>Status</th>
        </thead>
        <tbody>
          {userDetails.orders.length > 0 ? (
            userDetails.orders.map((order, index) => (
              <tr key={index}>
                <td>{order}</td>
                <td>{orderDetails.status}</td>
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
