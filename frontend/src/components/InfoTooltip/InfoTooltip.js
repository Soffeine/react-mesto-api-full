function InfoTooltip ({data, isOpen, onClose}) {
    return (
    <div className={isOpen ? `popup popup_opened ` : `popup`}>
        <div className="popup__container">
            <button type="button" className="popup__close-button popup-edit__close-button" onClick={onClose}></button>
            <img className="popup__image" src={data.image} alt="результат регистрации" />
            <p className="popup__text">{data.text}</p>
        </div>
    </div>
    )
}

export default InfoTooltip;
    