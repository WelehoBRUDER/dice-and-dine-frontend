import useGames from "../hooks/useGames";
import GameItem from "../components/GameItem";
import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";
import LoadingWheel from "../components/LoadingWheel";

const Games = () => {
  const {currentLanguage, lang, setCurrentPage} = useLanguage();

  const {games, loading} = useGames(currentLanguage);

  const gamesText = lang("games_page.title");

  useEffect(() => {
    setCurrentPage("games_page");
  }, []);

  return (
    <div>
      <article>
        <title>{gamesText}</title>
        <meta name="description" content={lang("games_page.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <h1>{gamesText}</h1>
      {loading ? (
        <LoadingWheel />
      ) : games && games.length > 0 ? (
        <div className="games-container">
          <div className="games-list">
            {games.map((game) => (
              <GameItem key={game.id || game.name} game={game} />
            ))}
          </div>
        </div>
      ) : (
        <p>{lang("games_page.no_games")}</p>
      )}
    </div>
  );
};

export default Games;
