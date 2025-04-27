import {useState, useEffect} from "react";
import {fetchData} from "../utils/fetchData.js";
import {useLanguage} from "../context/LanguageContext.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export function useMenu(language) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const {currentLanguage} = useLanguage();

  useEffect(() => {
    setLoading(true);
    async function loadMenu() {
      try {
        const data = await fetchData(`${API_URL}/info/menu/${language}`);
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
