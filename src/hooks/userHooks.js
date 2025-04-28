import {fetchData} from "../utils/fetchData";
const apiURL = import.meta.env.VITE_API_URL;

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(apiURL + "/auth/login", fetchOptions);
    console.log("loginresult", loginResult);

    return loginResult;
  };

  return {postLogin};
};

const useUser = () => {
  const postUser = async (inputs) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    };
    const registerResult = await fetchData(apiURL + "/users", fetchOptions);
    console.log("Post user results:  ", registerResult);
    return registerResult;
  };

  const getUserByToken = async (token) => {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer: " + token,
      },
    };
    const userResult = await fetchData(apiURL + "/auth/me", fetchOptions);
    console.log("userResult: ", userResult);
    return userResult;
  };

  const getUserDetails = async (userId) => {
    const userDetails = await fetchData(`${apiURL}/users/${userId}`);
    console.log("User details: ", userDetails);
    return userDetails;
  };

  return {getUserByToken, postUser, getUserDetails};
};

export {useAuthentication, useUser};
