import useGames from "../hooks/useGames";
import GameItem from "../components/GameItem";
import GameFiltering from "../components/GameFiltering";
import {useLanguage} from "../context/LanguageContext";
import {useEffect, useState} from "react";
import LoadingWheel from "../components/LoadingWheel";

const Games = () => {
  const {currentLanguage, lang, setCurrentPage} = useLanguage();

  const {games, loading} = useGames(currentLanguage);
  const [gamesList, setGamesList] = useState(null);

  const gamesText = lang("games_page.title");

  useEffect(() => {
    setCurrentPage("games_page");
  }, []);

  useEffect(() => {
    setGamesList(games);
  }, [games]);

  return (
    <>
      <article>
        <title>{gamesText}</title>
        <meta name="description" content={lang("games_page.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </article>
      <h1>{gamesText}</h1>
      {games && games.length > 0 && (
        <GameFiltering games={games} setFilteredGames={setGamesList} />
      )}
      {loading ? (
        <LoadingWheel />
      ) : gamesList && gamesList.length > 0 ? (
        <div className="games-container">
          <div className="games-list">
            {gamesList.map((game) => (
              <GameItem key={game.id || game.name} game={game} />
            ))}
          </div>
        </div>
      ) : (
        <p>{lang("games_page.no_games")}</p>
      )}
    </>
  );
};

export default Games;
