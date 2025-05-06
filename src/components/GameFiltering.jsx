import {useState, useEffect} from "react";
import {useLanguage} from "../context/LanguageContext";
import Button from "./Button";

const GameFiltering = ({games, setFilteredGames}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const {lang} = useLanguage();

  useEffect(() => {
    const uniqueCategories = new Set();
    games.forEach((game) => {
      game.categories.forEach((category) => {
        uniqueCategories.add(category.toLowerCase());
      });
    });
    setCategories(Array.from(uniqueCategories));
  }, [games]);

  const handleCategoryClick = (category) => {
    console.log("Category clicked:", category);
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newSelectedCategories);
  };

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredGames(games);
    } else {
      const filteredGames = games.filter((game) =>
        selectedCategories.some((cat) =>
          game.categories
            .map((c) => c.toLowerCase())
            .includes(cat.toLowerCase())
        )
      );
      setFilteredGames(filteredGames);
    }
  }, [selectedCategories]);

  return (
    <div className="game-filtering">
      <h2>{lang("games_page.filter_by_category")}</h2>
      <div className="filter-options">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`filter-button ${
              selectedCategories.includes(category) ? "active" : ""
            }`}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GameFiltering;
