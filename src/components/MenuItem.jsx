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
  const cartItem = cart.find(
    (cartItem) => Number(cartItem.menu_item_id) === Number(item.id)
  );
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
          {!cartItem ? (
            <Button
              className="add-to-cart-btn"
              onClick={() => addToCart(item.id)}
            >
              ➕ {buttonTextAdd}
            </Button>
          ) : (
            <>
              <Button
                className="add-to-cart-btn"
                onClick={() => addToCart(item.id)}
              >
                ➕ {buttonTextAdd}
              </Button>
              <Button
                className="remove-from-cart-btn"
                onClick={() => removeFromCart(item.id)}
              >
                ➖ {buttonTextRemove}
              </Button>
              <span>{cartItem.amount}</span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MenuItem;
