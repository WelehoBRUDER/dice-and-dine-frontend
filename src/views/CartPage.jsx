import {useState, useEffect} from "react";
import {useCart} from "../context/CartContext";
import useItemDetails from "../hooks/useItemDetails";
import Button from "../components/Button";

const CartPage = () => {
  const {cart, clearCart} = useCart();
  const [cartItems, setCartItems] = useState([]);
  const itemIds = cart.map((item) => item.menu_item_id);
  const {itemsDetails, isLoading, error} = useItemDetails(itemIds);

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
      {isLoading ? (
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

      {error && <p style={{color: "red"}}>{error}</p>}

      <Button onClick={clearCart}>Clear Cart</Button>
    </div>
  );
};

export default CartPage;
