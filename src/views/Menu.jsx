import MenuCategory from "../components/MenuCategory";
import useMenu from "../hooks/useMenu.js";
import {useNavigate} from "react-router-dom";
const Menu = () => {
  const lang = "en";

  const navigate = useNavigate();
  const {menu, loading} = useMenu(lang);
  const handleGoToCart = () => {
    navigate("/cart");
  };

  const buttonText =
    lang === "en" ? "Go to shopping cart" : "Siirry ostoskoriin";

  return (
    <div className="menu-page">
      <h1>Our Menu</h1>

      {/* Conditional Rendering for Loading or Menu Content */}
      {loading ? (
        <p>Loading menu...</p>
      ) : menu && menu.length > 0 ? (
        (() => {
          const groupedItems = menu.reduce((acc, item) => {
            item.categories.forEach((category) => {
              if (!acc[category]) acc[category] = [];
              acc[category].push(item);
            });
            return acc;
          }, {});

          return Object.entries(groupedItems).map(([categoryName, items]) => (
            <MenuCategory
              key={categoryName}
              categoryName={categoryName}
              items={items}
              lang={lang}
            />
          ));
        })()
      ) : (
        <p>No menu items available.</p>
      )}

      <button onClick={handleGoToCart} className="order-button">
        {buttonText}
      </button>
    </div>
  );
};

export default Menu;
