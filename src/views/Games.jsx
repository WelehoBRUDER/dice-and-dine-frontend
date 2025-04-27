import Loading from "../components/Loading";
import useGames from "../hooks/useGames";
import GameItem from "../components/GameItem";

const Games = () => {
  const lang = localStorage.getItem("language") || "en";
  const {games, loading} = useGames(lang);
  // const { lang } = useLanguage();

  const gamesText = lang === "en" ? "Games" : "Pelit";
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
