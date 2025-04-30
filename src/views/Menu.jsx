import useMenu from "../hooks/useMenu.js";
import MenuCategory from "../components/MenuCategory";
import LoadingWheel from "../components/LoadingWheel.jsx";
import {useLanguage} from "../context/LanguageContext.jsx";
import {useEffect} from "react";

const Menu = () => {
  const {setCurrentPage, lang, currentLanguage} = useLanguage();
  const {menu, loading} = useMenu(currentLanguage);

  useEffect(() => {
    setCurrentPage("menu_page");
  }, []);

  const ourMenuText = lang("menu_page.title");

  return (
    <div className="menu-page">
      <h1>{ourMenuText}</h1>

      {/* Conditional Rendering for Loading or Menu Content */}
      {loading ? (
        <LoadingWheel />
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
            />
          ));
        })()
      ) : (
        <p>No menu items available.</p>
      )}
    </div>
  );
};

export default Menu;
