import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      {/* {Popup для редактирования информации} */}
      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        >
        <input
          className="popup__input popup__input_type_name"
          type="text"
          id="name-input"
          name="name"
          minLength="2"
          maxLength="40" 
          required
          placeholder="Имя"
        />
        <span className="popup__input-error" id="name-input-error"/>
        <input
          className="popup__input popup__input_type_info"
          type="text"
          id="info-input"
          name="info"
          minLength="2"
          maxLength="200"
          required
          placeholder="О себе"
        />
        <span className="popup__input-error" id="info-input-error"/>
      </PopupWithForm>

      {/* {Popup для добавления карточек} */}
      <PopupWithForm
        name="add"
        title="Новое место"
        buttonText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        >
        <input
          className="popup__input popup__input_add_name"
          type="text"
          id="place-input"
          name="name"
          minLength="2"
          maxLength="30"
          required
          placeholder="Название"
        />
        <span className="popup__input-error" id="place-input-error"/>
        <input
          className="popup__input popup__input_add_link" 
          type="url"
          id="url-input"
          name="link"
          required
          placeholder="Ссылка на картинку"
        />
        <span className="popup__input-error" id="url-input-error"/>
      </PopupWithForm>

      {/* {Popup для удаления карточки} */}
      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        buttonText="Да"
        onClose={closeAllPopups}
      />

      {/* {Popup для обновления аватара} */}
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        >
        <input
          className="popup__input popup__input_change-avatar"
          type="url"
          id="avatar-input"
          name="avatar"
          required
          placeholder="Ссылка на новый аватар"
        />
        <span className="popup__input-error" id='avatar-input-error'/>
      </PopupWithForm>

      {/* {Popup для открытия фото} */}
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </div>
  )
};

export default App;