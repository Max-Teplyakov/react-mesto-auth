export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  //получить список всех карточек в виде массива
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }
  //добавить карточку
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._getResponseData(res));
  }
  //удалить карточку
  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }
  //получить данные пользователя
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }
  //заменить данные пользователя
  replaceUserData({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._getResponseData(res));
  }
  //заменить аватар
  repllaceAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._getResponseData(res));
  }

  //“залайкать” карточку (PUT)
  likeCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }
  //удалить лайк карточки (DELETE)
  deleteLikeCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(_id, isLiked) {
    if (isLiked) {
      return this.deleteLikeCard(_id);
    }
    return this.likeCard(_id);
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "998e2e8b-88af-4a48-b83c-6d7bca9f9f59",
    "Content-Type": "application/json",
  },
});
