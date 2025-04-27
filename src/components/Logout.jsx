import {useUserContext} from "../hooks/useUserContext";

const Logout = () => {
  const {handleLogout} = useUserContext();
  handleLogout();
  return null;
};

export default Logout;
