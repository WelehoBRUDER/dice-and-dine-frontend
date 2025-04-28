import {useCart} from "../context/CartContext";
import Button from "./Button";
import {useLanguage} from "../context/LanguageContext";

const MenuItem = ({item}) => {
  const {lang} = useLanguage();
  const {cart, addToCart, removeFromCart} = useCart();
  // const buttonTextAdd = lang === "en" ? "Add" : "Lisää";
  // const buttonTextRemove = lang === "en" ? "Remove" : "Poista";

  const buttonTextAdd = lang("menu_page.add_button_text");
  const buttonTextRemove = lang("menu_page.remove_button_text");
  const allergensText = lang("menu_page.allergens_text");
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
            {allergensText}: {item.allergens.join(", ")}
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
