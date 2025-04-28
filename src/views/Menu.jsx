import useMenu from "../hooks/useMenu.js";
import {useNavigate} from "react-router-dom";
import MenuCategory from "../components/MenuCategory";
import Loading from "../components/Loading.jsx";
import {useLanguage} from "../context/LanguageContext.jsx";
import {useEffect} from "react";

const Menu = () => {
  const currentLanguage = localStorage.getItem("language") || "en";
  const {setCurrentPage, lang} = useLanguage();
  const navigate = useNavigate();
  const {menu, loading} = useMenu(currentLanguage);
  useEffect(() => {
    setCurrentPage("menu_page");
    console.log("Set assigned to menu_page");
  }, []);

  const handleGoToCart = () => {
    navigate("/cart");
  };

  // const ourMenuText =
  //   currentLanguage === "en" ? "Our Menu" : "Meidän ruokalista";
  const ourMenuText = lang("menu_page.title");
  // const buttonText =
  //   currentLanguage === "en" ? "Go to shopping cart" : "Siirry ostoskoriin";
  const buttonText = lang("menu_page.button_text");

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
              lang={currentLanguage}
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
