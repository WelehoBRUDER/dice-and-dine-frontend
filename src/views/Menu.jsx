import useMenu from "../hooks/useMenu.js";
import {useNavigate} from "react-router-dom";
import MenuCategory from "../components/MenuCategory";
import Loading from "../components/Loading.jsx";

const Menu = () => {
  const lang = localStorage.getItem("language") || "en";

  const navigate = useNavigate();
  const {menu, loading} = useMenu(lang);
  const handleGoToCart = () => {
    navigate("/cart");
  };

  const ourMenuText = lang === "en" ? "Our Menu" : "Meidän ruokalista";
  const buttonText =
    lang === "en" ? "Go to shopping cart" : "Siirry ostoskoriin";

  return (
    <div className="menu-page">
      <h1>{ourMenuText}</h1>

      {/* Conditional Rendering for Loading or Menu Content */}
      {loading ? (
        <Loading />
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
