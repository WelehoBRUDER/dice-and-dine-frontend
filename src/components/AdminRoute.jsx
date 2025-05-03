import {Navigate} from "react-router-dom";
import {useUserContext} from "../hooks/useUserContext";

const AdminRoute = ({children}) => {
  const {user} = useUserContext();

  if (!user || user.user_type !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default AdminRoute;
