import React from 'react';

function ImagePopup({card, isOpened, popupName, onClose}) {

    const {link, name} = card;
 
    return (
        <div className={isOpened ? `popup popup_opened popup-${popupName}` : `popup popup-${popupName}`}>
            <div className="popup-image__container">
                <button type="button" className="popup__close-button popup-image__close-button" onClick={onClose}></button>
                <img className="popup-image__picture" src={link.toString()} alt="фото места" />
                <p className="popup-image__caption">{name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;