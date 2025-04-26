import {useCart} from "../context/CartContext";
import Button from "./Button";

const MenuItem = ({item, lang}) => {
  const {cart, addToCart, removeFromCart} = useCart();
  const buttonTextAdd = lang === "en" ? "Add" : "Lisää";
  const buttonTextRemove = lang === "en" ? "Remove" : "Poista";
  const isInCart = cart.some((cartItem) => cartItem.menu_item_id === item.id);
  return (
    <>
      <div className="item">
        <div className="item-header">
          <h3>{item.name}</h3>
          <span>{parseFloat(item.price).toFixed(2)} €</span>
        </div>
        <p className="description">{item.description}</p>
        {item.allergens?.length > 0 && (
          <p className="allergens">
            {lang === "en" ? "Allergens" : "Allergeenit"}:{" "}
            {item.allergens.join(", ")}
          </p>
        )}
        <div className="button-container">
          {/* Show both buttons side by side */}
          {!isInCart ? (
            <Button
              onClick={() => addToCart(item.id)}
              className="add-to-cart-btn"
            >
              ➕ {buttonTextAdd}
            </Button>
          ) : (
            <>
              <Button
                onClick={() => addToCart(item.id)}
                className="add-to-cart-btn"
              >
                ➕ {buttonTextAdd}
              </Button>
              <Button
                onClick={() => removeFromCart(item.id)}
                className="remove-from-cart-btn"
              >
                ➖ {buttonTextRemove}
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MenuItem;
