import AddButton from '../../images/add__button.svg';
import Header from '../Header/Header';
import Card from '../Card/Card.js';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Main({onEditProfileClick, onAddPlaceClick, onAvatarClick, onCardClick, cards, onCardLike, onCardDelete, userEmail, onSignOut}) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main>
            <Header link='/sign-in'
            linkName='Выйти'
            email={userEmail}
            onSignOut={onSignOut} />
            <section className="profile">
                <div className="profile__image">
                    <img src={currentUser.avatar} className="profile__photo" id="userAvatar"
                        alt="Фото профиля" />
                    <button type="button" className="profile__edit-sign" onClick={onAvatarClick}>
                    </button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name" id="name">{currentUser.name}</h1>
                    <button type="button" className="profile__edit-button" onClick={onEditProfileClick}></button>
                    <p className="profile__description" id="description">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlaceClick} >
                    <img src={AddButton} alt="Добавить фото" />
                </button>
            </section>

            <section className="places">
                {cards.map(card => {
                    return (<Card key={card._id} 
                    card={ card } 
                    onCardClick={ onCardClick }
                    cards={cards} 
                    onCardLike={ onCardLike } 
                    onCardDelete={ onCardDelete }/>)
                })
                }
            </section>

        </main>

    )
}

export default Main