import {useState, useEffect} from "react";
import {useCart} from "../context/CartContext";
import useItemDetails from "../hooks/useItemDetails";
import Button from "../components/Button";
import useOrder from "../hooks/useOrder";
import {useNavigate} from "react-router-dom";
import {useLanguage} from "../context/LanguageContext";
import {useUser} from "../hooks/userHooks";
import {useUserContext} from "../hooks/useUserContext";

const CartPage = () => {
  // const lang = localStorage.getItem("language") || "en";
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
      // const successMessage =
      //   lang === "en"
      //     ? `Order placed successfully! Order ID: ${orderId}`
      //     : `Tilauksesi on vastaanotettu! Tilauksen ID: ${orderId}`;
      const successMessage = lang("cart_page.order_success_message") + orderId;
      alert(successMessage);

      clearCart();
      navigate("/");
    }
  }, [orderSuccess]);

  // const yourCartText = lang === "en" ? "Your Cart" : "Ostoskori";
  // const itemsLoadingText =
  //   lang === "en"
  //     ? "Loading cart items..."
  //     : "Ladataan ostoskorin tuotteita...";
  // const tableHeadings =
  //   lang === "en"
  //     ? ["Item Name", "Item Amount", "Item Price €", "Total €"]
  //     : ["Tuotteen nimi", "Määrä", "Hinta €", "Yhteensä €"];
  // const totalText = lang === "en" ? "Total" : "Yhteensä";
  // const emptyCartText =
  //   lang === "en" ? "Your cart is empty." : "Ostoskori on tyhjä.";
  // const clearCartText = lang === "en" ? "Clear Cart" : "Tyhjennä ostoskori";
  // const orderButtonText = lang === "en" ? "Place Order" : "Tee tilaus";
  // const orderLoadingText =
  //   lang === "en" ? "Placing Order..." : "Tilausta käsitellään...";
  const yourCartText = lang("cart_page.your_cart");
  const itemsLoadingText = lang("cart_page.items_loading");
  const tableHeadings = lang("cart_page.table_headings");
  const totalText = lang("cart_page.total");
  const emptyCartText = lang("cart_page.empty_cart");
  const clearCartText = lang("cart_page.clear_cart");
  const orderButtonText = lang("cart_page.order_button");
  const orderLoadingText = lang("cart_page.order_loading");

  return (
    <div>
      <h1>{yourCartText}</h1>
      <div className="cart-items">
        {itemsLoading ? (
          <p>{itemsLoadingText}</p>
        ) : cartItems.length === 0 ? (
          <p>{emptyCartText}</p>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  {tableHeadings.map((heading, index) => (
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
                {totalText}:{" "}
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
          <Button onClick={clearCart}>{clearCartText}</Button>
          <Button
            onClick={handlePlaceOrder}
            disabled={orderLoading || cart.length === 0}
          >
            {orderLoading ? orderLoadingText : orderButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
