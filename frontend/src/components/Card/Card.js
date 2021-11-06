import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext } from 'react';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const { name, link, likes } = card;
  const currentUser = useContext(CurrentUserContext)

  const isOwn = card.owner === currentUser._id;
  const placeDeleteButtonClassName = (`place__delete-button ${isOwn ? '' : 'place__delete-button_hidden'}`);

  const isLiked = card.likes.some(i => i === currentUser._id);
  const placeLikeButtonClassName = (`place__like-button ${isLiked ? 'place__like-button_active' : ''}`);


  return (

    <div className="place">
      <img className="place__image" src={link} alt={name} onClick={() => onCardClick(card)} />
      <button type="button" className={placeDeleteButtonClassName} onClick={() => onCardDelete(card)}></button>
      <div className="place__caption">
        <h2 className="place__title">{name}</h2>
        <div className="place__like-status-container">
          <button type="button" className={placeLikeButtonClassName} onClick={() => onCardLike(card)}></button>
          <p className="place__like-counter">{likes.length}</p>
        </div>
      </div>
    </div>

  )
}

export default Card