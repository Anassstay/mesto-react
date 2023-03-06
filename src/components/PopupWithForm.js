import React from "react";

function PopupWithForm(props) {
  return (
    <section className={`popup popup__${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
        <form className="popup__form popup__content popup__content_edit" name={`${props.name}`} noValidate>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className="popup__button popup__save-button" type="submit" aria-label="Добавить изменения">{props.buttonText}</button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm;