/**
 * @file useGames.js
 * @description Custom hook to fetch games data from the API.
 *
 */

import {useState, useEffect} from "react";
import {fetchData} from "../utils/fetchData.js";

const API_URL = import.meta.env.VITE_API_URL;

export function useGames(language) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMenu() {
      try {
        const data = await fetchData(`${API_URL}/info/boardgames/${language}`);
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, [language]);

  return {games, loading};
}

export default useGames;
