export class Api {
    constructor(config) {
        this._url = config.url;
    }

    // обработка ответа от сервера
    _getResponseData(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Произошла ошибка ${res.status}`)
        }
    }


    // Загрузить информацию о пользователе с сервера
    getUserInfo(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: 'include',
        })
            .then(this._getResponseData)
    }


    // Загрузить карточки с сервера
    getPlaceInfo(token) {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: 'include',
        })
            .then(this._getResponseData)
    }


    // Редактирование профиля 
    editProfileInfo(data, token) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._getResponseData)
    }


    // Редактирование аватара
    editAvatar(data, token) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._getResponseData)
    }

    // Добавление новой карточки
    addNewCard(item, token) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
                name: item.name,
                link: item.link
            })
        })
            .then(this._getResponseData)
    }

    // Удалние карточки
    deleteCard(_id, token) {
        return fetch(`${this._url}/cards/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: 'include',
        })
            .then(this._getResponseData)
    }

    // постановка лайка
    changeLikeStatus(_id, isLiked, token) {
        return fetch(`${this._url}/cards/${_id}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            credentials: 'include',
        })
            .then(this._getResponseData);
    }

}

const api = new Api({
    url: 'https://api.mesto.soffeine.nomoredomains.rocks',
});

export default api;