import GameItem from "./GameItem";

const GameCategory = ({categoryId, games, lang}) => {
  // const { lang } = useLanguage();

  const categoryLabels = {
    1: {en: "Chance", fi: "Arpa"},
    2: {en: "Adventure", fi: "Seikkailu"},
    3: {en: "Puzzle", fi: "Pulma"},
  };

  const categoryLabel = categoryLabels[categoryId][lang];

  return (
    <div className="category">
      <h2 className="category-title">{categoryLabel}</h2>
      <div className="list-grid">
        {games
          .filter((game) => game.lang === lang)
          .map((game, i) => (
            <GameItem key={i} game={game} />
          ))}
      </div>
    </div>
  );
};

export default GameCategory;
