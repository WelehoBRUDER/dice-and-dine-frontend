import useCart from "../hooks/useCart";
import Button from "./Button";

const MenuItem = ({item, lang}) => {
  const {addToCart} = useCart();
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
        <Button onClick={() => addToCart(item.id)} className="add-to-cart-btn">
          Add to Cart
        </Button>
      </div>
    </>
  );
};

export default MenuItem;
