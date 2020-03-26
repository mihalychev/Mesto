import {Api} from './Api.js';
import {Card} from './Card.js';
import {CardList} from './CardList.js';
import {FormValidation} from './FormValidation.js';
import {Popup} from './Popup.js';
import {UserInfo} from './UserInfo.js';

(function() {  
  // Variables
  const errMsg = {
    require: 'Это обязательное поле',
    link: 'Здесь должна быть ссылка',
    validLength: 'Должно быть от 2 до 30 символов',
  }

  const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort8',
    headers: {
      authorization: 'd83f15eb-acd4-491b-bd91-c6ee7381d2cc',
      'Content-Type': 'application/json'
    }
  });

  const addFormValidation = new FormValidation(document.querySelector('.popup_add-cards'), errMsg);
  const editFormValidation = new FormValidation(document.querySelector('.popup_edit-profile'), errMsg);
  const avatarFormValidation = new FormValidation(document.querySelector('.popup_avatar'), errMsg);
  const card = new Card(document.querySelector('.places-list'), api);
  const cards = new CardList(document.querySelector('.places-list'), card, addFormValidation, api);
  const user = new UserInfo(api);

  const popupAdd = new Popup(document.querySelector('.popup_add-cards'));
  const popupEdit = new Popup(document.querySelector('.popup_edit-profile'));
  const popupImage = new Popup(document.querySelector('.popup_image'));
  const popupAvatar = new Popup(document.querySelector('.popup_avatar'))

  const placeContainer = document.querySelector('.places-list');

  const popupAddOpenBtn = document.querySelector('.user-info__button');
  const popupAddCloseBtn = document.querySelector('.popup__close_add');

  const popupEditOpenBtn = document.querySelector('.button__edit');
  const popupEditCloseBtn = document.querySelector('.popup__close_edit');

  const popupImageCloseBtn = document.querySelector('.popup__close_image');

  const popupAvatarOpenBtn = document.querySelector('.user-info__photo');
  const popupAvatarCloseBtn = document.querySelector('.popup__close_avatar')

  // Methods and Functions
  function renderLoading(isLoading, event) {
    if (isLoading) {
      event.target.querySelector('.popup__button').textContent = '...Загрузка';
    } else {
      if (event.target == document.querySelector('.popup__button_add')) event.target.querySelector('.popup__button').textContent = '+';
      else event.target.querySelector('.popup__button').textContent = 'Сохранить';
    }
  }

  cards.render.call(cards);
  user.updateUserInfo();
  addFormValidation.setEventListeners.call(addFormValidation);
  editFormValidation.setEventListeners.call(editFormValidation);
  avatarFormValidation.setEventListeners.call(avatarFormValidation);

  // EventListeners
  popupAddOpenBtn.addEventListener('click', popupAdd.open.bind(popupAdd));
  popupAddCloseBtn.addEventListener('click', popupAdd.close.bind(popupAdd));
  document.addEventListener('keydown', (event) => {
    if (event.keyCode == 27) popupAdd.close.call(popupAdd);
  });

  document.forms.new.addEventListener('submit', (event) => {
    renderLoading(true, event);
    cards.add.call(cards, event, renderLoading, popupAdd.close.bind(popupAdd));
  });
  placeContainer.addEventListener('click', (event) => card.like.call(card, event));
  placeContainer.addEventListener('click', (event) => card.remove.call(card, event));

  popupEditOpenBtn.addEventListener('click', () => {
    user.updateUserInfo.call(user);
    editFormValidation.setEventListeners.call(editFormValidation);
    popupEdit.open.call(popupEdit);
  });

  popupEditCloseBtn.addEventListener('click', popupEdit.close.bind(popupEdit));
  document.addEventListener('keydown', (event) => {
    if (event.keyCode == 27) popupEdit.close.call(popupEdit);
  });

  document.forms.edit.addEventListener('submit', (event) => {
    renderLoading(true, event);
    user.setUserInfo.call(user, event, popupEdit.close.bind(popupEdit), renderLoading);
    user.updateUserInfo.call(user);
  });

  placeContainer.addEventListener('click', event => {
    popupImage.openImage(event.target);
  });
  popupImageCloseBtn.addEventListener('click', popupImage.closeImage.bind(popupImage));
  document.addEventListener('keydown', (event) => {
    if (event.keyCode == 27) popupImage.closeImage.call(popupImage);
  });

  popupAvatarOpenBtn.addEventListener('click', popupAvatar.open.bind(popupAvatar));
  popupAvatarCloseBtn.addEventListener('click', popupAvatar.close.bind(popupAvatar));
  document.addEventListener('keydown', (event) => {
    if (event.keyCode == 27) popupAvatar.close.call(popupAvatar);
  });

  document.forms.avatar.addEventListener('submit', (event) => {
    event.preventDefault();
    renderLoading(true, event);
    api.setAvatar.call(api, document.querySelector('.popup__input_type-avatar').value)
    .then(res => {
      document.querySelector('.user-info__photo').style.backgroundImage = `url(${res.avatar})`
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, event);
      popupAvatar.close.call(popupAvatar);
      document.forms.avatar.reset();
      avatarFormValidation.setEventListeners.call(avatarFormValidation);
      document.querySelector('.popup__button_avatar').classList.remove('active');
      document.querySelector('.popup__button_avatar').disabled = true;
    });
  });
})();