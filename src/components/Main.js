import { useState, useEffect } from 'react';
import api from '../utils/api';
import Card from './Card';

function Main( {onEditAvatar, onEditProfile, onAddPlace, onCardClick} ) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getInitialData(), api.getUserInfo()])
    .then(([initialData, userData]) => {
      setUserName(userData.name);
      setUserDescription(userData.about);
      setUserAvatar(userData.avatar);
      setCards(initialData);
    })
    .catch(err => console.log(err))
  }, []);
  
  return (
  <main className="content">
    <section className="profile">
      <div className="profile__info">
          <button className="profile__avatar-button" onClick={onEditAvatar}>
            <img className="profile__avatar" alt="Аватар" src={userAvatar}/>
          </button>

        <div className="profile__text">
          <h1 className="profile__title">{userName}</h1>
          <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
          <h2 className="profile__subtitle">{userDescription}</h2>
        </div>

      </div>
      <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
    </section>

    <section className="elements">
      {cards.map((card) => {
        return (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
          />
        );
      })}
    </section>

  </main>
  )
};

export default Main;
