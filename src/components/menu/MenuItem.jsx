/**
 * MenuItem component
 * This component is responsible for displaying a single menu item.
 * It includes the item's name, price, description, allergens, and controls for adding/removing the item from the cart.
 * It uses the CartItemControls component to manage the cart actions.
 * @param {Object} props - The component props
 * @param {Object} props.item - The menu item object containing item details
 * * @param {string} props.item.id - The ID of the menu item
 * * @param {string} props.item.name - The name of the menu item
 * * * @param {string} props.item.price - The price of the menu item
 * * * @param {string} props.item.description - The description of the menu item
 * * * @param {Array} props.item.allergens - The list of allergens associated with the menu item
 * * @returns {JSX.Element} The rendered component
 */

import {useCart} from "../../context/CartContext";
import {useLanguage} from "../../context/LanguageContext";
import {useUserContext} from "../../hooks/useUserContext";
import CartItemControls from "./CartItemControls";

const MenuItem = ({item}) => {
  const {lang} = useLanguage();
  const {cart} = useCart();
  const {user} = useUserContext();
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
        {user && user.id && (
          <CartItemControls
            itemId={item.id}
            currentAmount={cartItem?.amount || 0}
          />
        )}
      </div>
    </>
  );
};

export default MenuItem;
