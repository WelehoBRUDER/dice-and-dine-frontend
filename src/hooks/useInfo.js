import {useState, useEffect} from "react";
import {fetchData} from "../utils/fetchData.js";

const API_URL = import.meta.env.VITE_API_URL;

export function useInfo() {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInfo() {
      try {
        const data = await fetchData(`${API_URL}/info/restaurant/en`);
        console.log("Info data: ", data);
        setInfo(data);
      } catch (error) {
        console.error("Error fetching info:", error);
      } finally {
        setLoading(false);
      }
    }

    loadInfo();
  }, []);

  return {info, loading};
}

export default useInfo;
