export class UserInfo {
  constructor(api) {
    this.profileForm = document.forms.edit;
    this.profileName = this.profileForm.elements.name;
    this.profileAbout = this.profileForm.elements.about;
    this.profilePhoto = document.querySelector('.user-info__photo');
    this.api = api;
  }

  setUserInfo(event, close, renderLoading) {
    event.preventDefault();

    this.api.setUserInfo(this.profileName.value, this.profileAbout.value)
    .then(() => {
      this.updateUserInfo();
      close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, event);
    });
  }

  updateUserInfo() {
    this.api.updateUserInfo()
    .then(result => {
      this.profileName.value = result.name;
      this.profileAbout.value = result.about;
      document.querySelector('.user-info__name').textContent = result.name;
      document.querySelector('.user-info__job').textContent = result.about;
      document.querySelector('.user-info__photo').style.backgroundImage = `url(${result.avatar})`
    })
    .catch((err) => {
      console.log(err);
    });

    document.querySelector('.error_name').textContent = '';
    document.querySelector('.error_about').textContent = '';

    document.querySelector('.popup__button_edit').removeAttribute('disabled');
    document.querySelector('.popup__button_edit').classList.add('active');
  }
}