import {useState} from "react";
import {fetchData} from "../utils/fetchData.js";
import {useUserContext} from "./useUserContext.js";
const API_URL = import.meta.env.VITE_API_URL;

const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const {user} = useUserContext();

  const placeOrder = async (orderCart, customerId, token) => {
    setLoading(true);
    setError(null);
    setOrderSuccess(false);
    console.log("cart user", user);

    try {
      const formattedOrder = orderCart.map((item) => ({
        item_id: item.menu_item_id,
        quantity: item.amount,
      }));
      const data = await fetchData(`${API_URL}/orders/${user.username}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: customerId,
          order: formattedOrder,
        }),
      });

      if (data && data.message === "Order created successfully") {
        setOrderSuccess(true);
        setOrderId(data.order_id);
      } else {
        setError(data?.message || "Unknown error");
      }
    } catch (err) {
      setError("Failed to place order: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    placeOrder,
    loading,
    orderSuccess,
    orderId,
    error,
  };
};

export default useOrder;
