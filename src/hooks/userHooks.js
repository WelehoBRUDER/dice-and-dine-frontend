/**
 * @file userHooks.js
 * @description Custom hooks for user authentication and management.
 * This file contains hooks for user login, registration, fetching user details,
 * updating user information, and uploading profile images.
 */

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

  const putUser = async (userId, inputs, token) => {
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(inputs),
    };

    const userResult = await fetchData(
      `${apiURL}/users/${userId}`,
      fetchOptions
    );

    return userResult;
  };

  const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const usersResult = await fetchData(apiURL + "/users", fetchOptions);
    return usersResult;
  };

  return {
    getUserByToken,
    postUser,
    getUserDetails,
    uploadProfileImage,
    putUser,
    getAllUsers,
  };
};

export {useAuthentication, useUser};
