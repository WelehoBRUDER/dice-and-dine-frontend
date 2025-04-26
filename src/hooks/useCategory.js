// src/hooks/useCategory.js
import {useState, useEffect} from "react";
import {fetchData} from "../utils/fetchData.js";

const API_URL = import.meta.env.VITE_API_URL;

export function useCategory(language) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchData(
          `${API_URL}/info/itemcategories/${language}`
        );
        console.log("Fetched categories:", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, [language]);

  return {categories, loading};
}

export default useCategory;
