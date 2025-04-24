import MenuItem from "./MenuItem.jsx";

const MenuCategory = ({categoryId, items}) => {
  // const { lang } = useLanguage();

  //mock data
  const {lang} = {lang: "fi"};
  const categoryLabels = {
    en: {
      1: "Starters",
      2: "Mains",
      3: "Desserts",
      4: "Drinks",
      5: "Snacks",
    },
    fi: {
      1: "Alkuruoat",
      2: "Pääruoat",
      3: "Jälkiruoat",
      4: "Juomat",
      5: "Välipalat",
    },
  };

  const categoryImages = {
    1: "/images/starter.jpg",
    2: "/images/main.jpg",
    3: "/images/dessert.jpg",
    4: "/images/beverages.jpg",
    5: "/images/snacks.jpg",
  };

  return (
    <div className="menu-category">
      <h2 className="category-title">{categoryLabels[lang][categoryId]}</h2>
      <div className="category-image">
        <img
          src={categoryImages[categoryId]}
          alt={categoryLabels[lang][categoryId]}
        />
      </div>

      <div className="menu-grid">
        {items
          .filter((item) => item.lang === lang)
          .map((item, i) => (
            <MenuItem key={i} item={item} />
          ))}
      </div>
    </div>
  );
};

export default MenuCategory;
