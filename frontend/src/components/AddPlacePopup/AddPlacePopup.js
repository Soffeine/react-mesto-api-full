import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function AddPlacePopup ({ isOpen, onClose, onAddPlace }) {

  const [placeName, setPlaceName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();  
    onAddPlace({
      name: placeName,
      link,
    });
    setPlaceName('');
    setLink('');
  }

  function handleAddName(e) {
    setPlaceName(e.target.value)
  }

  function handleAddLink(e) {
    setLink(e.target.value)
  }
    return (
        <PopupWithForm name="add" title={"Новое место"} buttonText={"Создать"} isOpened={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        <input type="text" onChange={handleAddName} className="popup-form__information popup-form__information_input_place-name"
          placeholder="Название" value={placeName || ''} name="name" minLength="2" maxLength="30" required />
        <span className="popup__error-message"></span>
        <input onChange={handleAddLink} value={link || ''} className="popup-form__information popup-form__information_input_link-image"
          placeholder="Ссылка на картинку" name="link" type="url" required />
        <span className="popup__error-message"></span>
        </PopupWithForm>
    )
};

export default AddPlacePopup;