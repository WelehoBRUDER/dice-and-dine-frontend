import {useEffect, useState} from "react";
import {fetchData} from "../utils/fetchData.js";
const API_URL = import.meta.env.VITE_API_URL;

const useReview = () => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetchData(`${API_URL}/review`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setReviews(response);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchReviews();
  }, []);

  return {loading, reviews, submitReview, submitAnonymousReview};
};

export default useReview;
