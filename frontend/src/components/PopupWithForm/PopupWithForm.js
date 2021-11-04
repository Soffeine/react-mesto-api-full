import React from 'react';

function PopupWithForm( {name, title, children, buttonText, isOpened, onClose, onSubmit}) {
    return (
        <div className={isOpened ? `popup popup_opened popup-${name}` : `popup popup-${name}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-button popup-edit__close-button" onClick={onClose}></button>
                <form className="popup-form" name={name} id={`popup-${name}-form`} onSubmit={onSubmit}>
                  <h2 className="popup-form__heading">{title}</h2>
                    {children}
                  <button type="submit" className="popup__button popup__button_valid" name="addSubmit">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;