import {useState} from "react";
import {fetchData} from "../utils/fetchData.js";
const API_URL = import.meta.env.VITE_API_URL;

const useOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const placeOrder = async (cart, customerId, token) => {
    setIsLoading(true);
    setError(null);
    setOrderSuccess(false);

    if (!token) {
      setError("User not authenticated");
      setIsLoading(false);
      return;
    }
    const orderData = {
      customer_id: customerId,
      order: cart.map((item) => ({
        item_id: item.menu_item_id,
        quantity: item.amount,
      })),
    };

    console.log("Order data:", orderData);

    try {
      const url = `${API_URL}/orders/janedoe`;
      const response = await fetchData(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      // If the response was successful, update the order status
      console.log("Order placed successfully:", response);
      setOrderSuccess(true); // Order placed successfully
    } catch (err) {
      console.error("Error placing order:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {placeOrder, isLoading, error, orderSuccess};
};

export default useOrder;
