/**
 * @file useAllergens.js
 * @description Custom hook to fetch allergens data from the API.
 *
 */

import {useState, useEffect} from "react";
import {fetchData} from "../utils/fetchData.js";

const API_URL = import.meta.env.VITE_API_URL;

export function useAllergens(language = "fi") {
  const [allergens, setAllergens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAllergens() {
      try {
        const data = await fetchData(`${API_URL}/info/allergens/${language}`);
        setAllergens(data);
      } catch (error) {
        console.error("Error fetching allergens:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAllergens();
  }, [language]);

  return {allergens, loading};
}
