import React from 'react';

function ImagePopup({ card, onClose }) {
  const isCard = Object.entries(card).length !== 0;
  console.log(isCard)
  return (
    <section className={`popup popup_photo ${isCard ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <div className="popup__image-content">
          <img className="popup__image" src={isCard.link || ''} alt={isCard.name || ''}/>
          <p className="popup__image-text">{isCard.name || ''}</p>
        </div>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
      </div>
    </section>
  )
};

export default ImagePopup;