/**
 * @file useUserContext.js
 * @description Custom hook to access the UserContext in a React application.
 */

import {useContext} from "react";
import {UserContext} from "../context/UserContext";

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within an UserProvider");
  }

  return context;
};

export {useUserContext};
