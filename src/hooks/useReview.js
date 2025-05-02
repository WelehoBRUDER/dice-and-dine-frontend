import {useState} from "react";
import {fetchData} from "../utils/fetchData.js";
const API_URL = import.meta.env.VITE_API_URL;

const useReview = () => {
  const [loading, setLoading] = useState(false);

  const submitReview = async (reviewData, token, userId) => {
    setLoading(true);
    try {
      const response = await fetchData(`${API_URL}/review/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
      return response;
    } catch (error) {
      console.error("Error submitting review:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const submitAnonymousReview = async (reviewData) => {
    setLoading(true);
    try {
      const response = await fetchData(`${API_URL}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
      return response;
    } catch (error) {
      console.error("Error submitting anonymous review:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  //const [games, setGames] = useState([]);
  //const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   async function loadMenu() {
  //     try {
  //       const data = await fetchData(`${API_URL}/info/boardgames/${language}`);
  //       console.log("Game data: ", data);
  //       setGames(data);
  //     } catch (error) {
  //       console.error("Error fetching games:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   loadMenu();
  // }, [language]);
  //return {games, loading};
  return {loading, submitReview, submitAnonymousReview};
};

export default useReview;
