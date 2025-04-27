import MenuItem from "./MenuItem.jsx";

const MenuCategory = ({categoryName, items, lang}) => {
  const categoryImages = {
    Alkupala: "/images/starter.jpg",
    Pääruoka: "/images/main.jpg",
    Jälkiruoka: "/images/dessert.jpg",
    Juomat: "/images/beverages.jpg",
    Naposteltavat: "/images/snacks.jpg",
    Starter: "/images/starter.jpg",
    Main: "/images/main.jpg",
    Dessert: "/images/dessert.jpg",
    Beverages: "/images/beverages.jpg",
    Snacks: "/images/snacks.jpg",
  };

  const imageSrc = categoryImages[categoryName];
  return (
    <div className="category">
      <h2 className="category-title">{categoryName}</h2>
      <div className="category-image">
        <img src={imageSrc} alt={categoryName} />
      </div>

      <div className="list-grid">
        {items.map((item, i) => (
          <MenuItem key={i} item={item} lang={lang} />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
