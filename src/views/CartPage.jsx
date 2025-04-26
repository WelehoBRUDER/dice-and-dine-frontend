import {useState, useEffect} from "react";
import {useCart} from "../context/CartContext";
import useItemDetails from "../hooks/useItemDetails";
import Button from "../components/Button";
import useOrder from "../hooks/useOrder";

const CartPage = () => {
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
    error: orderError,
    orderSuccess,
  } = useOrder();

  const handlePlaceOrder = () => {
    const orderCart = cart.map((item) => ({
      menu_item_id: item.menu_item_id,
      amount: item.amount,
    }));

    console.log("Cartpage order", orderCart);
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
              {cartItems.reduce(
                (total, item) => total + item.price * item.amount,
                0
              )}{" "}
              €
            </h3>
          </div>
        </>
      )}

      {itemsError && <p style={{color: "red"}}>{itemsError}</p>}
      {orderError && <p style={{color: "red"}}>{orderError}</p>}
      {orderSuccess && (
        <p style={{color: "green"}}>Order placed successfully!</p>
      )}

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
