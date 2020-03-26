export class Popup {
  constructor(popup) {
    this.popup = popup;
  }

  open() {
    this.popup.classList.add('popup_is-opened');
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
  }

  openImage(target) {
    if (target.classList.contains('place-card__image') && !target.classList.contains('place-card__delete-icon')) {
      const popupImageContent = document.querySelector('.popup__image');
      const popupImage = document.createElement('img');
      popupImage.classList.add('image');
      popupImageContent.appendChild(popupImage);

      popupImage.src = `<%=require('${target.style.backgroundImage.substr(5, target.style.backgroundImage.length - 7)}')%>`;

      document.querySelector('.popup_image').classList.add('popup_is-opened');
    }
  }

  closeImage() {
    this.popup.classList.remove('popup_is-opened');
    document.querySelector('.image').remove();
  }
}