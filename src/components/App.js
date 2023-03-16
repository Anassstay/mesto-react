import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getInitialData(), api.getUserInfo()])
    .then(([initialData, userData]) => {
      setCurrentUser(userData);
      setCards(initialData);
    })
    .catch(err => console.log(err))
  }, []);
  
  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard : c));
      })
     .catch(err => console.log(err));
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => 
          state.filter((item) => item._id !== card._id));
          closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  function handleUpdateUser(userData) {
    api.setUserInfo(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function handleUpdateAvatar(userData) {
    api.setUserAvatar(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function handleAddPlaceSubmit(name, link) {
    api.addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        cards={cards}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
      />
      <Footer />

      {/* {Popup для редактирования информации} */}
      <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

      {/* {Popup для добавления карточек} */}
      <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

      {/* {Popup для удаления карточки} */}
      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        buttonText="Да"
        onClose={closeAllPopups}
        onDeleteCard={handleCardDelete}
      />

      {/* {Popup для обновления аватара} */}
      <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

      {/* {Popup для открытия фото} */}
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
    </div>
  )
};

export default App;