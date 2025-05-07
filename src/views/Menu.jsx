/**
 * @file Menu.jsx
 * @description This file contains the Menu component, which is used to display the restaurant's menu.
 * It uses the useMenu hook to fetch the menu data and the useLanguage context to manage language settings.
 * @returns {JSX.Element} The Menu component.
 */
import useMenu from "../hooks/useMenu.js";
import MenuCategory from "../components/menu/MenuCategory";
import LoadingWheel from "../components/LoadingWheel.jsx";
import {useLanguage} from "../context/LanguageContext.jsx";
import {useEffect} from "react";
import {useUserContext} from "../hooks/useUserContext.js";

const Menu = () => {
  const {setCurrentPage, lang, currentLanguage} = useLanguage();
  const {menu, loading} = useMenu(currentLanguage);
  const {user} = useUserContext();

  useEffect(() => {
    setCurrentPage("menu_page");
  }, []);

  const ourMenuText = lang("menu_page.title");

  return (
    <div className="menu-page">
      <article>
        <title>{ourMenuText}</title>
        <meta name="description" content={lang("menu_page.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <h1>{ourMenuText}</h1>

      {/* Conditional Rendering for Loading or Menu Content */}
      {loading ? (
        <LoadingWheel />
      ) : menu && menu.length > 0 ? (
        <>
          {!user && <p>{lang("menu_page.order_instructions")}</p>}
          {(() => {
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
          })()}
        </>
      ) : (
        <p>{lang("menu_page.not_available")}</p>
      )}
    </div>
  );
};

export default Menu;
