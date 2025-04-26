//DELETE IF NOT NEEDED

import {useState, useEffect} from "react";
import {fetchData} from "../utils/fetchData.js";

const API_URL = import.meta.env.VITE_API_URL;

export function useAllergens(language = "fi") {
  const [allergens, setAllergens] = useState([]);

  useEffect(() => {
    async function loadAllergens() {
      const data = await fetchData(`${API_URL}/info/allergens/${language}`);
      console.log("Fetched allergens:", data);
      setAllergens(data);
    }

    loadAllergens();
  }, [language]);

  return {allergens};
}
