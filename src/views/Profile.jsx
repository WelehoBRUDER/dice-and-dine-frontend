import {useEffect, useState} from "react";
import {useLanguage} from "../context/LanguageContext";
import {useUserContext} from "../hooks/useUserContext";
import {useUser} from "../hooks/userHooks";
import Loading from "../components/Loading";
import useOrder from "../hooks/useOrder";
import useForm from "../hooks/formHooks";

const Profile = () => {
  const {lang, setCurrentPage} = useLanguage();
  const {user} = useUserContext();
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  const {getOrderDetails} = useOrder();
  const {getUserDetails, uploadProfileImage} = useUser();
  const {inputs, filePreview, handleFileChange, resetForm} = useForm();
  const [imgBlobUrl, setImgBlobUrl] = useState("");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const file = inputs.profileImage;
    console.log("Inputs: ", file, userDetails.name, token);
    if (file && userDetails?.name) {
      await uploadProfileImage(file, userDetails.name, token);
      try {
        await uploadProfileImage(file, userDetails.name, token);
        alert("Profile image uploaded!");
        await fetchUserAndOrderDetails();
        resetForm();
        setImageUpdated(Date.now());
      } catch (err) {
        console.error("Upload failed:", err);
        alert("Upload failed.");
      }
    } else {
      console.error("Missing file or username");
    }
  };

  useEffect(() => {
    setCurrentPage("profile_page");

    fetchUserAndOrderDetails();
  }, [user]);

  useEffect(() => {
    if (userDetails.profile_image) {
      fetch(`http://localhost:3000/uploads/${userDetails.profile_image}`, {
        cache: "no-store",
      })
        .then((res) => res.blob())
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob);
          setImgBlobUrl(blobUrl);
        });
    }
  }, [userDetails.profile_image, imageUpdated]);

  if (loading) {
    return <Loading />;
  }

  console.log("User details setted:", userDetails);
  // console.log("Order details setted:", orderDetails);

  // const imgURL = userDetails.profile_image
  //   ? `http://localhost:3000/uploads/${userDetails.profile_image}`
  //   : "https://placehold.co/200x250?text=No+Picture";

  return (
    <div className="main-content">
      <h1>{lang("profile_page.title")}</h1>

      <div className="flex-row">
        <div className="profile-image">
          <img
            src={imgBlobUrl || "https://placehold.co/200x250?text=No+Picture"}
            alt="Profile picture"
          />
        </div>
        <div className="flex-column">
          <div className="profile-detail-row">
            <span className="profile-label">
              {lang("profile_page.username")}
            </span>
            <span className="profile-value">{userDetails.name}</span>
          </div>
          <div className="profile-detail-row">
            <span className="profile-label">{lang("profile_page.email")}</span>
            <span className="profile-value">{userDetails.email}</span>
          </div>
          <div className="flex-column">
            <form
              className="flex-column"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleFileChange}
                required
              />

              <div className="image-preview">
                <img
                  src={filePreview}
                  alt="Profile Preview"
                  className="preview-image"
                />
              </div>
              <button className="btn-smaller" type="submit">
                {lang("profile_page.upload_button")}
              </button>
            </form>
            <button
              className="btn-smaller"
              onClick={() => alert("Edit profile")}
            >
              {lang("profile_page.edit_profile")}
            </button>
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
