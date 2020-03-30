export class CardList {
  constructor(container, card, validation, api) {
    this.cardContainer = container;
    this.card = card;
    this.validation = validation;
    this.api = api;
  }

  add(event, renderLoading, close) {
    event.preventDefault();

    const form = document.forms.new;

    let userId;
    this.api.getUserData()
    .then(res => {
      userId = res._id
      this.api.addCard(form.elements.title.value, form.elements.link.value)
      .then(result => {
        if (result.owner._id == userId) this.cardContainer.insertAdjacentHTML('afterbegin', this.card.create(result, result.owner._id, userId));
        else this.cardContainer.insertAdjacentHTML('afterbegin', this.card.create(result, null, userId))
        close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, event);
        form.reset();
        this.validation.setEventListeners.call(this.validation);
        document.querySelector('.popup__button_add').classList.remove('active');
        document.querySelector('.popup__button_add').disabled = true;
      })
      .catch((err) => {
        console.log(err);
      })
    })
    .catch((err) => {
      console.log(err);
    }); 
  }

  render() {
    let userId;
    this.api.getUserData()
    .then(res => {
      userId = res._id
      this.api.getInitialCards()
      .then(result => {
        for (const data of result) {
          if (data.owner._id == userId) this.cardContainer.insertAdjacentHTML('afterbegin', this.card.create(data, data.owner._id, userId));
          else this.cardContainer.insertAdjacentHTML('beforeend', this.card.create(data, null, userId))
        }
      })
      .catch((err) => {
        console.log(err);
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
