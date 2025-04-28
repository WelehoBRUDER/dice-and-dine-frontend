import {useState, useEffect} from "react";
import {fetchData} from "../utils/fetchData.js";
import {useLanguage} from "../context/LanguageContext";

const API_URL = import.meta.env.VITE_API_URL;

export function useMenu() {
  const {currentLanguage} = useLanguage();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMenu() {
      setLoading(true);
      try {
        const data = await fetchData(`${API_URL}/info/menu/${currentLanguage}`);
        setMenu(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, [currentLanguage]);

  return {menu, loading};
}

export default useMenu;
