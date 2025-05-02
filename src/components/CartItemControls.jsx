import {useCart} from "../context/CartContext";
import Button from "./Button";

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
