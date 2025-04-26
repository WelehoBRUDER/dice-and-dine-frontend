import {useState, useEffect} from "react";
import {useCart} from "../context/CartContext";
import useItemDetails from "../hooks/useItemDetails";
import Button from "../components/Button";
import useOrder from "../hooks/useOrder";
import {useNavigate} from "react-router-dom";

const CartPage = () => {
  const lang = "en"; // Replace with actual language context or prop
  const navigate = useNavigate();
  const {cart, clearCart} = useCart();
  const [cartItems, setCartItems] = useState([]);
  const itemIds = cart.map((item) => item.menu_item_id);
  const {
    itemsDetails,
    isLoading: itemsLoading,
    error: itemsError,
  } = useItemDetails(itemIds);

  const {
    placeOrder,
    isLoading: orderLoading,
    orderSuccess,
    orderId,
    error: orderError,
  } = useOrder();

  const handlePlaceOrder = () => {
    const orderCart = cart.map((item) => ({
      menu_item_id: item.menu_item_id,
      amount: item.amount,
    }));

    const customerId = 1; // Replace with actual customer ID
    const token = localStorage.getItem("token");

    placeOrder(orderCart, customerId, token);
  };
  useEffect(() => {
    if (itemsDetails.length > 0) {
      const itemsWithDetails = cart.map((item) => {
        const itemDetails = itemsDetails.find(
          (details) => details.id === item.menu_item_id
        );
        return {
          ...item,
          ...itemDetails,
        };
      });
      setCartItems(itemsWithDetails);
    }
  }, [itemsDetails, cart]);

  useEffect(() => {
    if (orderSuccess) {
      const successMessage =
        lang === "en"
          ? `Order placed successfully! Order ID: ${orderId}`
          : `Tilauksesi on vastaanotettu! Tilauksen ID: ${orderId}`;
      alert(successMessage);

      clearCart();
      navigate("/menu"); // Or your desired path
    }
  }, [orderSuccess]);

  return (
    <div>
      <h1>Your Cart</h1>
      {itemsLoading ? (
        <p>Loading cart items...</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - {item.amount} x {item.price} €
              </li>
            ))}
          </ul>
          <div>
            <h3>
              Total:{" "}
              {cartItems
                .reduce((total, item) => total + item.price * item.amount, 0)
                .toFixed(2)}{" "}
              €
            </h3>
          </div>
        </>
      )}

      {itemsError && <p style={{color: "red"}}>{itemsError}</p>}
      {orderError && <p style={{color: "red"}}>{orderError}</p>}

      <Button onClick={clearCart}>Clear Cart</Button>
      <Button
        onClick={handlePlaceOrder}
        disabled={orderLoading || cart.length === 0}
      >
        {orderLoading ? "Placing Order..." : "Place Order"}
      </Button>
    </div>
  );
};

export default CartPage;
