import {useCart} from "../context/CartContext";
import Button from "./Button";
import {useLanguage} from "../context/LanguageContext";
import CartItemControls from "./CartItemControls";

const MenuItem = ({item}) => {
  const {lang} = useLanguage();
  const {cart} = useCart();
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

        <CartItemControls
          itemId={item.id}
          currentAmount={cartItem?.amount || 0}
        />
      </div>
    </>
  );
};

export default MenuItem;
