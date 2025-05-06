import {useState, useEffect} from "react";
import {fetchData} from "../utils/fetchData.js";

const API_URL = import.meta.env.VITE_API_URL;

export function useRestaurantInfo(language) {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMenu() {
      try {
        const data = await fetchData(`${API_URL}/info/restaurant/${language}`);
        setInfo(data);
      } catch (error) {
        console.error("Error fetching restaurant info:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, [language]);

  const getTransportationInfo = async () => {
    setLoading(true);
    try {
      const data = await fetchData(`${API_URL}/info/getPublicTransport`);
      console.log("Transportation data: ", data);
      return data;
    } catch (error) {
      console.error("Error fetching transportation info:", error);
    } finally {
      setLoading(false);
    }
  };

  const updatePhone = async (phone) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const data = await fetchData(
        `${API_URL}/info/restaurant/phone/${phone}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error updating phone:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateEmail = async (email) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const data = await fetchData(
        `${API_URL}/info/restaurant/email/${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error updating email:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOpenTimes = async (openTimes) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const data = await fetchData(
        `${API_URL}/info/restaurant/open/${openTimes}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error updating open times:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    info,
    loading,
    getTransportationInfo,
    updatePhone,
    updateEmail,
    updateOpenTimes,
  };
}

export default useRestaurantInfo;
