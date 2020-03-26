export class FormValidation {
  constructor(popup, errors) {
    this.popup = popup;
    this.errors = errors;
  }

  checkInputValidity(input, err) {
    if (input.validity.tooShort) {
      input.setCustomValidity(this.errors.validLength);
      err.textContent = input.validationMessage;
      return false;
    }
  
    if (input.validity.tooLong) {
      input.setCustomValidity(this.errors.validLength);
      err.textContent = input.validationMessage;
      return false;
    }
  
    if (input.value == 0) {
      err.textContent = this.errors.require;
      return false;
    }
  
    if (input.getAttribute('name') == 'link' && !this.checkURL(input.value)) {
      err.textContent = this.errors.link;
      return false;
    }
  
    err.textContent = '';
    return true;
  }

  setSubmitButtonState(btn, status) {
    for (let item of status) {
      if (!item) {
        btn.classList.remove('active');
        btn.disabled = true;
        return false;
      }
    }
  
    btn.classList.add('active');
    btn.disabled = false;
  }

  setEventListeners() {
    const form = this.popup.querySelector('.popup__form');
    const inputs = Array.from(form.elements);
    const errors = Array.from(this.popup.querySelectorAll('.error'));
    const status = [];

    for (let i = 0; i < inputs.length - 1; i++) { 
      status[i] = this.checkInputValidity(inputs[i], errors[i]);
      inputs[i].addEventListener('input', () => {
        status[i] = this.checkInputValidity(inputs[i], errors[i]);
        this.setSubmitButtonState(inputs[inputs.length - 1], status);
        return status;
      });
    }

    return status;
  }

  activeCheck(btn, ...elements) {
    for (let item of elements) {
      if (item.value == 0) {
        btn.classList.remove('active');
        btn.disabled = true;
        return 0;
      }
    }
  
    btn.classList.add('active');
    btn.disabled = false;
  }

  checkURL(url) {
    let regURL = /^(?:(?:https?|ftp|telnet):\/\/(?:[a-z0-9_-]{1,32}(?::[a-z0-9_-]{1,32})?@)?)?(?:(?:[a-z0-9-]{1,128}\.)+(?:com|net|org|mil|edu|arpa|ru|gov|biz|info|aero|inc|name|[a-z]{2})|(?!0)(?:(?!0[^.]|255)[0-9]{1,3}\.){3}(?!0|255)[0-9]{1,3})(?:\/[a-z0-9.,_@%&?+=\~\/-]*)?(?:#[^ \'\"&<>]*)?$/i;
    return regURL.test(url);
  }
}