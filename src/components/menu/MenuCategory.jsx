/**
 * @file MenuCategory.jsx
 * @description This component renders a menu category with its items.
 * It is used in the Menu component to display different categories of menu items.
 * Each category has a title and a list of items.
 * @param {string} categoryName - The name of the menu category.
 * @param {Array} items - The list of menu items in the category.
 * @returns {JSX.Element} A JSX element representing the menu category.
 */

import MenuItem from "./MenuItem.jsx";

const MenuCategory = ({categoryName, items}) => {
  return (
    <div className="category">
      <h2 className="category-title">{categoryName}</h2>

      <div className="list-grid">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
