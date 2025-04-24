import GameCategory from "../components/GameCategory";

const Games = () => {
  const games = [
    {
      categoryId: 1,
      name: "Monopoly",
      lang: "en",
      img: "/images/monopoly.jpg",
      description: "A classic property trading game.",
    },
    {
      categoryId: 1,
      name: "Monopoli",
      lang: "fi",
      img: "/images/monopoly.jpg",
      description: "Klassinen kiinteistökauppapeli.",
    },

    {
      categoryId: 2,
      name: "Catan",
      lang: "en",
      img: "/images/catan.jpg",
      description: "A game of resource management and trading.",
    },
    {
      categoryId: 2,
      name: "Catan",
      lang: "fi",
      img: "/images/catan.jpg",
      description: "Resurssien hallintaan ja kaupankäyntiin perustuva peli.",
    },

    {
      categoryId: 2,
      name: "Carcassone",
      lang: "en",
      img: "/images/carcassone.jpg",
      description:
        "A tile-placement game where players build cities, roads, and fields.",
    },
    {
      categoryId: 2,
      name: "Carcassone",
      lang: "fi",
      img: "/images/carcassone.jpg",
      description:
        "Pelinappuloiden asettelupeli, jossa pelaajat rakentavat kaupunkeja, teitä ja peltoja.",
    },

    {
      categoryId: 3,
      name: "Chess",
      lang: "en",
      img: "/images/chess.jpg",
      description: "A strategy game played on a square board with 64 squares.",
    },
    {
      categoryId: 3,
      name: "Shakki",
      lang: "fi",
      img: "/images/chess.jpg",
      description: "Strategiapeli, jota pelataan 64 ruudun ruutuvuoressa.",
    },

    {
      categoryId: 1,
      name: "Backgammon",
      lang: "en",
      img: "/images/backgammon.jpg",
      description:
        "A two-player game where players move pieces according to dice rolls.",
    },
    {
      categoryId: 1,
      name: "Backgammon",
      lang: "fi",
      img: "/images/backgammon.jpg",
      description:
        "Kahden pelaajan peli, jossa siirretään nappuloita noppatulosten mukaan.",
    },

    {
      categoryId: 3,
      name: "Dominoes",
      lang: "en",
      img: "/images/dominoes.jpg",
      description:
        "A tile-based game where players match pieces with the same number of dots.",
    },
    {
      categoryId: 3,
      name: "Domino",
      lang: "fi",
      img: "/images/dominoes.jpg",
      description:
        "Peli, jossa pelaajat yhdistävät saman määrän pisteitä olevia paloja.",
    },

    {
      categoryId: 1,
      name: "Snakes and Ladders",
      lang: "en",
      img: "/images/snakes_and_ladders.jpg",
      description:
        "A race game where players navigate a board with ladders and snakes.",
    },
    {
      categoryId: 1,
      name: "Käärmeet ja tikapuut",
      lang: "fi",
      img: "/images/snakes_and_ladders.jpg",
      description:
        "Kilpailupeli, jossa pelaajat kulkevat laudalla tikapuiden ja käärmeiden avulla.",
    },

    {
      categoryId: 1,
      name: "Pictionary",
      lang: "en",
      img: "/images/pictionary.jpg",
      description:
        "A party game where players draw clues for their team to guess.",
    },
    {
      categoryId: 1,
      name: "Piirrä ja arvaa",
      lang: "fi",
      img: "/images/pictionary.jpg",
      description:
        "Peli, jossa pelaajat piirtävät vihjeitä tiimilleen arvatakseen vastaukset.",
    },

    {
      categoryId: 3,
      name: "Clue",
      lang: "en",
      img: "/images/clue.jpg",
      description:
        "A murder mystery game where players try to deduce the culprit.",
    },
    {
      categoryId: 3,
      name: "Cluedo",
      lang: "fi",
      img: "/images/clue.jpg",
      description:
        "Mysteeri-peli, jossa pelaajat yrittävät selvittää murhaajan.",
    },

    {
      categoryId: 3,
      name: "Alias",
      lang: "en",
      img: "/images/alias.jpg",
      description:
        "A word-guessing game where players describe words to their team.",
    },
    {
      categoryId: 3,
      name: "Alias",
      lang: "fi",
      img: "/images/alias.jpg",
      description: "Sanapelissä pelaajat selittävät sanoja tiimilleen.",
    },

    {
      categoryId: 1,
      name: "Battleship",
      lang: "en",
      img: "/images/battleship.jpg",
      description:
        "A two-player strategy game where players try to sink each other’s ships.",
    },
    {
      categoryId: 1,
      name: "Laivanupotus",
      lang: "fi",
      img: "/images/battleship.jpg",
      description:
        "Kahden pelaajan strategiapeli, jossa yritetään upottaa toisen laivat.",
    },

    {
      categoryId: 3,
      name: "Guess Who",
      lang: "en",
      img: "/images/guess_who.jpg",
      description:
        "A guessing game where players ask yes/no questions to figure out the opponent's character.",
    },
    {
      categoryId: 3,
      name: "Arvaa kuka",
      lang: "fi",
      img: "/images/guess_who.jpg",
      description:
        "Arvuuttelupeli, jossa pelaajat kysyvät kyllä/ei-kysymyksiä selvittääkseen toisen hahmon.",
    },

    {
      categoryId: 3,
      name: "Scrabble",
      lang: "en",
      img: "/images/scrabble.jpg",
      description:
        "A word game where players use letter tiles to create words on a board.",
    },
    {
      categoryId: 3,
      name: "Alfapet",
      lang: "fi",
      img: "/images/scrabble.jpg",
      description:
        "Sanapeli, jossa pelaajat käyttävät kirjaintunnuksia muodostaakseen sanoja laudalla.",
    },

    {
      categoryId: 1,
      name: "Yahtzee",
      lang: "en",
      img: "/images/yahtzee.jpg",
      description:
        "A dice game where players try to get specific combinations of dice.",
    },
    {
      categoryId: 1,
      name: "Yatzy",
      lang: "fi",
      img: "/images/yahtzee.jpg",
      description:
        "Noppapeli, jossa pelaajat yrittävät saada tiettyjä noppayhdistelmiä.",
    },

    {
      categoryId: 3,
      name: "7 Wonders",
      lang: "en",
      img: "/images/7_wonders.jpg",
      description:
        "A card drafting game where players build structures and wonders in ancient civilizations.",
    },
    {
      categoryId: 3,
      name: "7 Wonders",
      lang: "fi",
      img: "/images/7_wonders.jpg",
      description:
        "Korttipelin valmistelupeli, jossa pelaajat rakentavat rakennuksia ja ihmeitä muinaisessa sivilisaatiossa.",
    },

    {
      categoryId: 2,
      name: "Afrikan tähti",
      lang: "en",
      img: "/images/afrikantahti.jpg",
      description:
        "A Finnish board game where players navigate Africa looking for treasures.",
    },
    {
      categoryId: 2,
      name: "Afrikan tähti",
      lang: "fi",
      img: "/images/afrikantahti.jpg",
      description:
        "Suomalainen lautapeli, jossa pelaajat etsivät aarteita Afrikassa.",
    },

    {
      categoryId: 2,
      name: "Azul",
      lang: "en",
      img: "/images/azul.jpg",
      description:
        "A tile-laying game where players aim to decorate a wall with colorful tiles.",
    },
    {
      categoryId: 2,
      name: "Azul",
      lang: "fi",
      img: "/images/azul.jpg",
      description:
        "Pelinappuloiden asettelupeli, jossa pelaajat koristelevat seinää värikkäillä laatoilla.",
    },

    {
      categoryId: 3,
      name: "Blokus",
      lang: "en",
      img: "/images/blokus.jpg",
      description:
        "A strategy game where players take turns placing pieces on a board.",
    },
    {
      categoryId: 3,
      name: "Blokus",
      lang: "fi",
      img: "/images/blokus.jpg",
      description:
        "Strategiapeli, jossa pelaajat asettavat vuorotellen nappuloita laudalle.",
    },

    {
      categoryId: 3,
      name: "Cranium",
      lang: "en",
      img: "/images/cranium.jpg",
      description:
        "A party game that involves activities like word puzzles, charades, and trivia.",
    },
    {
      categoryId: 3,
      name: "Cranium",
      lang: "fi",
      img: "/images/cranium.jpg",
      description:
        "Juhla-peli, jossa on sanatehtäviä, ilmeilyä ja tietovisoja.",
    },

    {
      categoryId: 2,
      name: "Labyrinth",
      lang: "en",
      img: "/images/labyrinth.jpg",
      description:
        "A maze game where players try to collect treasures by shifting the maze.",
    },
    {
      categoryId: 2,
      name: "Labyrintti",
      lang: "fi",
      img: "/images/labyrinth.jpg",
      description:
        "Labyrinttipeli, jossa pelaajat yrittävät kerätä aarteita siirtämällä labyrinttiä.",
    },

    {
      categoryId: 2,
      name: "Operation",
      lang: "en",
      img: "/images/operation.jpg",
      description:
        "A game where players try to remove parts from a patient’s body without touching the sides.",
    },
    {
      categoryId: 2,
      name: "Operaatio",
      lang: "fi",
      img: "/images/operation.jpg",
      description:
        "Peli, jossa pelaajat yrittävät poistaa osia potilaan kehosta koskematta reunoihin.",
    },

    {
      categoryId: 1,
      name: "Skip-Bo",
      lang: "en",
      img: "/images/skipbo.jpg",
      description:
        "A card game where players try to be the first to play all their cards.",
    },
    {
      categoryId: 1,
      name: "Skip-Bo",
      lang: "fi",
      img: "/images/skipbo.jpg",
      description:
        "Korttipeli, jossa pelaajat yrittävät olla ensimmäiset, jotka pelaavat kaikki korttinsa.",
    },
  ];

  const lang = "en";
  // const { lang } = useLanguage();

  const categoryIds = [...new Set(games.map((game) => game.categoryId))];

  return (
    <div>
      <h1>Games</h1>
      <div className="game-list">
        {categoryIds.map((categoryId) => (
          <GameCategory
            key={categoryId}
            categoryId={categoryId}
            games={games.filter((game) => game.categoryId === categoryId)}
            lang={lang}
          />
        ))}
      </div>
    </div>
  );
};

export default Games;
