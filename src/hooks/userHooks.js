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
    return registerResult;
  };

  const getUserByToken = async (token) => {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer: " + token,
      },
    };
    const userResult = await fetchData(apiURL + "/auth/me", fetchOptions);
    return userResult;
  };

  const getUserDetails = async (userId) => {
    const userDetails = await fetchData(`${apiURL}/users/${userId}`);
    return userDetails;
  };

  const uploadProfileImage = async (file, username, token) => {
    const formData = new FormData();
    formData.append("file", file);

    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    };

    const result = await fetchData(
      `${apiURL}/users/img/${username}`,
      fetchOptions
    );
    return result;
  };

  return {getUserByToken, postUser, getUserDetails, uploadProfileImage};
};

export {useAuthentication, useUser};
