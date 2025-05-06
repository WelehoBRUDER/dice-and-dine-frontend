/**
 * Logout component
 * This component is responsible for handling the logout process of the user.
 * It uses the useUserContext hook to access the handleLogout function.
 * The component is designed to be used in a route that triggers the logout process when accessed.
 * It does not render any UI elements.
 */

import {useEffect} from "react";
import {useUserContext} from "../hooks/useUserContext";

const Logout = () => {
  const {handleLogout} = useUserContext();

  useEffect(() => {
    console.log("Logout function called");
    handleLogout();
  }, []);

  return null;
};

export default Logout;
