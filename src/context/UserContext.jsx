import {createContext, useState} from "react";
import {useAuthentication, useUser} from "../hooks/userHooks";
import {useLocation, useNavigate} from "react-router";

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (credentials) => {
    try {
      console.log("Login funktiota kutsuttu");
      console.log(credentials);
      const loginResult = await postLogin(credentials);
      localStorage.setItem("token", loginResult.token);
      navigate("/");
      console.log("User: " + loginResult.userWithNoPassword);
      setUser(loginResult.userWithNoPassword);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const handleLogout = () => {
    try {
      console.log("Logout funktiota kutsuttu");
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const userResult = await getUserByToken(token);
        setUser(userResult.user);
        const origin = location.pathname || "/";
        navigate(origin);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};
export {UserProvider, UserContext};
