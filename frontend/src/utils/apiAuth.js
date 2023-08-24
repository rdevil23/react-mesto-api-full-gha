import { baseUrl } from './constants';

class ApiAuth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(this._checkResponse);
  }

  register(email, password) {
    return this._request(`signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  }

  authorize(email, password) {
    return this._request(`signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  }

  checkToken(token) {
    return this._request(`users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const apiAuth = new ApiAuth({ baseUrl });
export default apiAuth;
