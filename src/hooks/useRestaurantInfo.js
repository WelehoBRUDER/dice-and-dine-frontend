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
        console.log("Restaurant data: ", data);
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

  return {info, loading, getTransportationInfo};
}

export default useRestaurantInfo;
