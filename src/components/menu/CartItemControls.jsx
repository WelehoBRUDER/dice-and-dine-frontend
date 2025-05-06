/**
 * CartItemControls component
 * This component is responsible for displaying the controls for each item in the cart.
 * It allows the user to increase or decrease the quantity of the item in the cart.
 * Buttons are provided to add or remove the item from the cart.
 * The current quantity of the item is displayed between the buttons.
 * @param {Object} props - The component props
 * @param {string} props.itemId - The ID of the item in the cart
 * @param {number} props.currentAmount - The current quantity of the item in the cart
 * @returns {JSX.Element} The rendered component
 * @example
 * <CartItemControls itemId="123" currentAmount={2} />
 * // Renders the controls for an item with ID "123" and current quantity of 2
 *
 */

import {useCart} from "../../context/CartContext";
import Button from "../Button";

const CartItemControls = ({itemId, currentAmount}) => {
  const {addToCart, removeFromCart} = useCart();

  return (
    <div className="button-container">
      <span className="cart-amount-display">{currentAmount}</span>
      <Button className="btn-smaller" onClick={() => addToCart(itemId)}>
        +
      </Button>

      <Button className="btn-smaller" onClick={() => removeFromCart(itemId)}>
        -
      </Button>
    </div>
  );
};

export default CartItemControls;
