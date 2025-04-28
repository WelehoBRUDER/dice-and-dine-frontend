import Loading from "../components/Loading";
import useGames from "../hooks/useGames";
import GameItem from "../components/GameItem";
import {useLanguage} from "../context/LanguageContext";
import {useEffect} from "react";

const Games = () => {
  const {currentLanguage, lang, setCurrentPage} = useLanguage();

  const {games, loading} = useGames(currentLanguage);

  const gamesText = lang("games_page.title");
  useEffect(() => {
    setCurrentPage("games_page");
  }, []);

  return (
    <div>
      <h1>{gamesText}</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="games-container">
          <div className="games-list">
            {games.map((game) => (
              <GameItem key={game.id || game.name} game={game} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;
