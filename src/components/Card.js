import React from 'react';

function Card( {card, onCardClick} ) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className="cards">
      <button className="cards__delete-button" type="button" aria-label="Удалить"></button>
      <img className="cards__image" alt={card.name} src={card.link} onClick={handleClick}/>
      <div className="cards__container">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__likes">
          <button className="cards__like" type="button" aria-label="Поставить лайк"></button>
          <p className="cards__like-number">{card.likes.length}</p>
        </div>     
      </div>
    </div>
   )
};

export default Card;