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
