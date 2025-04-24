// import { useLanguage } from "../context/LanguageContext";

const MenuItem = ({item}) => {
  // const { lang } = useLanguage();

  //mock data:
  const {lang} = {lang: "fi"};
  const allergenNames = {
    en: {
      1: "Gluten",
      2: "Egg",
      3: "Milk",
      4: "Nuts",
      5: "Seafood",
      6: "Fish",
    },
    fi: {
      1: "Gluteeni",
      2: "Kananmuna",
      3: "Maito",
      4: "Pähkinä",
      5: "Merenelävä",
      6: "Kala",
    },
  };

  const allergensLabel = {
    en: "Allergens",
    fi: "Allergeenit",
  };

  return (
    <div className="menu-item">
      <div className="menu-item-header">
        <h3>{item.name}</h3>
        <span>{item.price.toFixed(2)} €</span>
      </div>
      <p className="description">{item.description}</p>
      {item.allergens?.length > 0 && (
        <p className="allergens">
          {allergensLabel[lang]}: {/* Render allergens label dynamically */}
          {item.allergens
            .map((allergenCode) => allergenNames[lang][allergenCode]) // Map allergens to their names based on selected language
            .join(", ")}
        </p>
      )}
    </div>
  );
};

export default MenuItem;
