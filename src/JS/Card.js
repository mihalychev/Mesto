export class Card {
  constructor(container, api) {
    this.cardContainer = container;
    this.api = api;
  }

  sanitizeHTML(str) {
    let temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }

  create(data, id, userId) {
    if (id) {
      for (let item of data.likes){
        if (item._id == userId) {
          return `
          <div class="place-card" id="${this.sanitizeHTML(data._id)}"> 
            <div class="place-card__image" style="background-image: url(${this.sanitizeHTML(data.link)})"> 
              <button class="place-card__delete-icon place-card__delete-icon_active"></button>
            </div>
            <div class="place-card__description">
              <h3 class="place-card__name">${this.sanitizeHTML(data.name)}</h3>
              <div class="place-card__like-container">
                <button class="place-card__like-icon place-card__like-icon_liked"></button>
                <p class="place-card__like-count">${this.sanitizeHTML(data.likes.length)}</p>
              </div>
            </div>
          </div>`
        }
      }
      return `
        <div class="place-card" id="${this.sanitizeHTML(data._id)}"> 
          <div class="place-card__image" style="background-image: url(${this.sanitizeHTML(data.link)})"> 
            <button class="place-card__delete-icon place-card__delete-icon_active"></button>
          </div>
          <div class="place-card__description">
            <h3 class="place-card__name">${this.sanitizeHTML(data.name)}</h3>
            <div class="place-card__like-container">
              <button class="place-card__like-icon"></button>
              <p class="place-card__like-count">${this.sanitizeHTML(data.likes.length)}</p>
            </div>
          </div>
        </div>`
    } else {
      for (let item of data.likes){
        if (item._id == userId) {
          return `
          <div class="place-card" id="${this.sanitizeHTML(data._id)}"> 
            <div class="place-card__image" style="background-image: url(${this.sanitizeHTML(data.link)})"> 
            </div>
            <div class="place-card__description">
              <h3 class="place-card__name">${this.sanitizeHTML(data.name)}</h3>
              <div class="place-card__like-container">
                <button class="place-card__like-icon place-card__like-icon_liked"></button>
                <p class="place-card__like-count">${this.sanitizeHTML(data.likes.length)}</p>
              </div>
            </div>
          </div>`
        }
      }
      return `
      <div class="place-card" id="${this.sanitizeHTML(data._id)}"> 
        <div class="place-card__image" style="background-image: url(${this.sanitizeHTML(data.link)})"> 
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name">${this.sanitizeHTML(data.name)}</h3>
          <div class="place-card__like-container">
            <button class="place-card__like-icon"></button>
            <p class="place-card__like-count">${this.sanitizeHTML(data.likes.length)}</p>
          </div>
        </div>
      </div>`
    }
  }

  remove(event) {
    if (event.target.classList.contains('place-card__delete-icon_active') && window.confirm("Вы действительно хотите удалить карточку?")){
      this.api.removeCard(event.target.closest('.place-card').id)
      .then(() => event.target.closest('.place-card').remove())
      .catch((err) => {
        console.log(err);
      });
    }
  }

  like(event) {
    if (event.target.classList.contains('place-card__like-icon') && event.target.classList.contains('place-card__like-icon_liked')) {
      this.api.dislike(event.target.closest('.place-card').id)
      .then(res => {
        event.target.closest('.place-card').querySelector('.place-card__like-count').textContent = res.likes.length;
        event.target.classList.remove('place-card__like-icon_liked');
      })
      .catch((err) => {
        console.log(err);
      });
      
    } else if (event.target.classList.contains('place-card__like-icon') && !(event.target.classList.contains('place-card__like-icon_liked'))) {
      this.api.like(event.target.closest('.place-card').id)
      .then(res => {
        event.target.closest('.place-card').querySelector('.place-card__like-count').textContent = res.likes.length;
        event.target.classList.add('place-card__like-icon_liked');
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
}