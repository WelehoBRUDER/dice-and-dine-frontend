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

  // const getOrderDetails = async (orderId) => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const data = await fetchData(`${API_URL}/orders/${orderId}`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (data) {
  //       const ordersWithTime = data.order.map((orderItem) => ({
  //         ...orderItem,
  //         time: data.time,
  //       }));

  //       return ordersWithTime;
  //     } else {
  //       setError("Failed to fetch order details");
  //     }
  //   } catch (err) {
  //     setError("Failed to fetch order details: " + err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return {
    makeReservation,
    loading,
    reservationSuccess,
    reservationId,
    error,
  };
};

export default useReservation;
