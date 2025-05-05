import {useState} from "react";
import {fetchData} from "../utils/fetchData.js";
import {useUserContext} from "./useUserContext.js";
const API_URL = import.meta.env.VITE_API_URL;

const useReservation = () => {
  const [loading, setLoading] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [reservationId, setReservationId] = useState(null);
  const [error, setError] = useState(null);
  const {user} = useUserContext();

  const makeReservation = async (reservation, token) => {
    setLoading(true);
    setError(null);
    setReservationSuccess(false);

    try {
      const data = await fetchData(
        `${API_URL}/tables/reserve/${user.username}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reservation: reservation,
          }),
        }
      );

      if (data) {
        setReservationSuccess(true);
        setReservationId(data.reservation_id);
      } else {
        setError(data?.message || "Unknown error");
      }
    } catch (err) {
      setError("Failed to place order: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  const getReservationDetails = async (reservationId) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData(`${API_URL}/tables/${reservationId}`, {
        method: "GET",
      });

      if (data) {
        return data;
      } else {
        setError("Failed to fetch reservation details");
      }
    } catch (err) {
      setError("Failed to fetch reservation details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    makeReservation,
    loading,
    reservationSuccess,
    reservationId,
    error,
    getReservationDetails,
  };
};

export default useReservation;
