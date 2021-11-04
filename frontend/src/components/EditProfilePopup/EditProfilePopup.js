import React, { useContext, useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);


  //без этого эффекта вылезает ошибка
  useEffect(() => {
    setName('');
    setDescription('');
  }, [])

  function handleSubmit(e) {
    e.preventDefault();  
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  return (
    <PopupWithForm name="edit" title={"Редактировать профиль"} buttonText={"Сохранить"} isOpened={isOpen} onClose={onClose} onSubmit={ handleSubmit }>
      <input type="text" value={name} onChange={ handleNameChange } className="popup-form__information popup-form__information_input_name"
        placeholder="Имя" name="name" minLength="2" maxLength="20" required />
      <span className="popup__error-message"></span>
      <input type="text" value={description} onChange={ handleDescriptionChange } className="popup-form__information popup-form__information_input_description"
        placeholder="Чем вы занимаетесь?" name="about" minLength="2" maxLength="200" required />
      <span className="popup__error-message"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;