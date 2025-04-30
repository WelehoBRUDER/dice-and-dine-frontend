import {useState, useEffect} from "react";
import {useCart} from "../context/CartContext";
import useItemDetails from "../hooks/useItemDetails";
import Button from "../components/Button";
import useOrder from "../hooks/useOrder";
import {useNavigate} from "react-router-dom";
import {useLanguage} from "../context/LanguageContext";
import {useUserContext} from "../hooks/useUserContext";

const CartPage = () => {
  const {lang, setCurrentPage} = useLanguage();
  const navigate = useNavigate();
  const {cart, clearCart} = useCart();
  const [cartItems, setCartItems] = useState([]);
  const itemIds = cart.map((item) => item.menu_item_id);
  const {
    itemsDetails,
    isLoading: itemsLoading,
    error: itemsError,
  } = useItemDetails(itemIds);
  const {user} = useUserContext();

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

    const customerId = user.id;
    const token = localStorage.getItem("token");

    placeOrder(orderCart, customerId, token);
  };

  useEffect(() => {
    setCurrentPage("cart_page");
  }, []);

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
      const successMessage = lang("cart_page.order_success_message") + orderId;
      alert(successMessage);
      clearCart();
      navigate("/");
    }

    if (cart.length === 0) {
      alert(lang("cart_page.empty_cart"));
      navigate("/menu");
    }
  }, [orderSuccess, cart]);

  return (
    <div>
      <h1>{lang("cart_page.your_cart")}</h1>
      <div className="cart-items">
        {itemsLoading ? (
          <p>{lang("cart_page.items_loading")}</p>
        ) : cartItems.length === 0 ? (
          <p>{lang("cart_page.empty_cart")}</p>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  {lang("cart_page.table_headings").map((heading, index) => (
                    <th key={index}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.amount}</td>
                    <td>{Number(item.price).toFixed(2)}</td>
                    <td>{(Number(item.price) * item.amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <h3 className="cart-total">
                {lang("cart_page.total")}
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
        <div className="cart-buttons">
          <Button className="btn-smaller" onClick={clearCart}>
            {lang("cart_page.clear_cart")}
          </Button>
          <Button
            className="btn-smaller"
            onClick={handlePlaceOrder}
            disabled={orderLoading || cart.length === 0}
          >
            {orderLoading
              ? lang("cart_page.order_loading")
              : lang("cart_page.order_button")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
