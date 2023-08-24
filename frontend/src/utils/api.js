import { baseUrl } from './constants';

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status} - не удалось установить подключение к api`);
    }
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(this._checkResponse);
  }

  getUserInfo(token) {
    return this._request(`users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateUserInfo(data, token) {
    return this._request(`users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: data.name, about: data.about }),
    });
  }

  updateUserAvatar(data, token) {
    return this._request(`users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  getCards(token) {
    return this._request(`cards`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  addNewCard({ name, link }, token) {
    return this._request(`cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, link }),
    });
  }

  removeCard(cardId, token) {
    return this._request(`cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  likeCard(cardId, token) {
    return this._request(`cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteCardLike(cardId, token) {
    return this._request(`cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const api = new Api({ baseUrl });
export default api;
