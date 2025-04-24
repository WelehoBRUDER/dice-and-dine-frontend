import MenuItem from "./MenuItem.jsx";

const MenuCategory = ({categoryId, items}) => {
  const categoryLabels = {
    1: "Starters",
    2: "Burgers",
    3: "Desserts",
    4: "Drinks",
    5: "Snacks",
  };
  return (
    <div className="menu-category">
      <h2 className="category-title">{categoryLabels[categoryId]}</h2>
      <div className="menu-grid">
        {items.map((item, i) => (
          <MenuItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
