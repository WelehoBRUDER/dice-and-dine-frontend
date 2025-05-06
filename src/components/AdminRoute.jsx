/**
 * AdminRoute.jsx
 * @description This component is used to protect admin routes in the application.
 * It checks if the user is logged in and has admin privileges before allowing access to the route.
 */

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
