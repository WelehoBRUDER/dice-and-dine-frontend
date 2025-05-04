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
