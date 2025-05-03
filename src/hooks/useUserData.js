import {useState} from "react";
import {fetchData} from "../utils/fetchData.js";

const API_URL = import.meta.env.VITE_API_URL;

export function useUserData() {
  const [loading, setLoading] = useState(false);

  async function getUserById(userId) {
    setLoading(true);
    try {
      const data = await fetchData(`${API_URL}/users/${userId}`);
      return data;
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setLoading(false);
    }
  }

  return {getUserById, loading};
}

export default useUserData;
