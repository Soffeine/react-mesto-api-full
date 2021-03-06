import Main from '../Main/Main.js';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { useState, useEffect } from 'react';
import ImagePopup from '../ImagePopup/ImagePopup';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import api from '../../utils/api';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';
import * as auth from '../../utils/auth';
import errorImage from '../../images/onRegisterError.svg';
import successImage from '../../images/onRegisterSuccess.svg'


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddplacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [imagePopupData, setImagePopupData] = useState({ isImagePopupOpen: false, selectedCard: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [isSuccess, setIsSuccess] = useState(false);
  const [successStatus, setSuccessStatus] = useState({});
  const registerErrorMessage = {
    image: errorImage,
    text: 'Что-то пошло не так! Попробуйте ещё раз.'
  }
  const registerSuccessMessage = {
    image: successImage,
    text: 'Вы успешно зарегистрировались!'
  }

  //регистрация нового пользователя
  function onRegister(password, email) {
    auth.register(password, email)
      .then(() => {
          handleSubmitMessage(registerSuccessMessage);
          history.push('/signin');
      })
      .catch((err) => {
        handleSubmitMessage(registerErrorMessage);
        console.log(err);
      })
  }

  //показ попапа
  function handleSubmitMessage(data) {
    setIsSuccess(true);
    setSuccessStatus(data);
  }

  // авторизация пользователя
  function onLogin(password, email) {
    return auth.authorize(password, email)
      .then(() => {
          setLoggedIn(true);
          history.push('/');
      })
      .catch(() => {
        handleSubmitMessage(registerErrorMessage);
      })
  }

  //выход из аккаунта 
  function handleSignOut () {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  };

  //функция закрытия всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsAddplacePopupOpen(false);
    setImagePopupData((prev) => {
      return {
        ...prev,
        isImagePopupOpen: false
      }
    })
    setIsSuccess(false);
  }

  //функции открытия попапов
  const handleEditAvatarClick = () => { setIsAvatarPopupOpen(true) }
  const handleEditProfileClick = () => { setIsEditProfilePopupOpen(true) }
  const handleAddPlaceClick = () => { setIsAddplacePopupOpen(true) }

  const mestoAuth = (jwt) => {
    return auth.getContent(jwt)
    .then(({ data }) => { 
        setLoggedIn(true);
    })
    .catch((err) => {console.log(err)})
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if(jwt) {
      mestoAuth(jwt);
    }
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) history.push('/');
  }, [loggedIn, history]);

  //получения данных профиля и данных карточки с сервера
  useEffect(() => {
    if(loggedIn) {
      const token = localStorage.getItem('jwt');
      Promise.all([api.getUserInfo(token), api.getPlaceInfo(token)])
      .then(([userRes, cardRes]) => {
          setCurrentUser(userRes);
          setCards(cardRes);
      })
      .catch(err => console.log(`Упс, ошибочка ${err}`));
    }
  }, [loggedIn])


  //работа с карточками
  //лайк карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    const token = localStorage.getItem('jwt');
    api.changeLikeStatus(card._id, !isLiked, token)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //удаление карточки
  function handleCardDelete(card) {
    const token = localStorage.getItem('jwt');
    api.deleteCard(card._id, token)
      .then(() => {
        setCards(() => cards.filter((c) => c._id !== card._id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //открытие полного изображения
  function handleCardClick(card) {
    setImagePopupData((prev) => {
      return {
        ...prev,
        isImagePopupOpen: true,
        selectedCard: card
      }
    })
  }

  //добавление новой карточки
  function handleAddPlaceSubmit(newCard) {
    const token = localStorage.getItem('jwt');
    api.addNewCard(newCard, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //функция редактирования профиля
  function handleUpdateUser(data) {
    const token = localStorage.getItem('jwt');
    api.editProfileInfo(data, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //функция изменения аватара
  function handleUpdateAvatar(data) {
    const token = localStorage.getItem('jwt');
    api.editAvatar(data, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>

          <ProtectedRoute exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} 
            userEmail={currentUser.email}
            onSignOut={handleSignOut}/>

          <Route path='/signup'>
            <Register onRegister={onRegister} />
          </Route>

          <Route path='/signin'>
            <Login onLogin={onLogin} />
          </Route>

        </Switch>

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup card={imagePopupData.selectedCard}
          isOpened={imagePopupData.isImagePopupOpen}
          popupName={"image"}
          onClose={closeAllPopups} />

        <InfoTooltip data={successStatus}
          isOpen={isSuccess}
          onClose={closeAllPopups} />

      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
