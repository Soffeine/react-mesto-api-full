import React, { useRef } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm name="avatar" title={"Обновить аватар"} buttonText={"Сохранить"} isOpened={isOpen} onClose={onClose} onSubmit={ handleSubmit }>
      <input ref={avatarRef} className="popup-form__information popup-form__information_input_avatar-link"
        placeholder="Ссылка на фото" name="avatar" type="url" required />
      <span className="popup__error-message"></span>
    </PopupWithForm>
  )
};

export default EditAvatarPopup;