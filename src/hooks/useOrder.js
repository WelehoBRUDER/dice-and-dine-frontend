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

  const getAllOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData(`${API_URL}/orders`, {
        method: "GET",
      });
      if (data) {
        return data;
      } else {
        setError("Failed to fetch orders");
      }
    } catch (err) {
      setError("Failed to fetch orders: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async (orderCart, customerId, token) => {
    setLoading(true);
    setError(null);
    setOrderSuccess(false);

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

  const getOrderDetails = async (orderId) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData(`${API_URL}/orders/${orderId}`, {
        method: "GET",
      });

      if (data) {
        return data;
      } else {
        setError("Failed to fetch order details");
      }
    } catch (err) {
      setError("Failed to fetch order details: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const postOrderStatus = async (orderId, status) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    try {
      const data = await fetchData(`${API_URL}/orders/status`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: orderId,
          status: status,
        }),
      });
      if (data && data.message === "Order status updated successfully") {
        return true;
      } else {
        setError(data?.message || "Unknown error");
        return false;
      }
    } catch (err) {
      setError("Failed to update order status: " + err.message);
      return false;
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
    getOrderDetails,
    getAllOrders,
    postOrderStatus,
  };
};

export default useOrder;
