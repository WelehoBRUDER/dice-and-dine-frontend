import React from "react";

const GameItem = ({game}) => {
  const imageSrc = game.img_name
    ? game.img_name
    : "https://placehold.co/160x160?text=No+image+available";

  return (
    <div className="item">
      <div className="item-header">
        <h3>{game.name}</h3>
      </div>
      <img src={imageSrc} alt={game.name} className="game-image" />
      <h3 className="game-name">{game.name}</h3>
      <p className="game-category">{game.category}</p>
      <p className="description">{game.description}</p>
    </div>
  );
};

export default GameItem;
