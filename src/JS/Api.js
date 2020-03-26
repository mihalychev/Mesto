export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.authKey = options.headers.authorization;
  }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.authKey,
      }
    })
    .then(res => this.check(res))
  }

  check(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.authKey
      }
    })
    .then(res => this.check(res))
  } 

  addCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.authKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => this.check(res))
  }

  removeCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authKey,
      },
    })
    .then(res => this.check(res))
  }

  setUserInfo(newName, newAbout) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.authKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
    .then(res => this.check(res))
  }

  updateUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.authKey,
      }
    })
    .then(res => this.check(res))
  }

  like(cardId) {
    return fetch(`${this.baseUrl}/cards/like/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this.authKey
      }
    })
    .then(res => this.check(res))
  }

  dislike(cardId) {
    return fetch(`${this.baseUrl}/cards/like/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authKey
      }
    })
    .then(res => this.check(res))
  }

  setAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.authKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => this.check(res))
    
  }
}
