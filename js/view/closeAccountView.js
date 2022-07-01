import View from "./view.js";

class closeAcc extends View {
  _element = document.querySelector(".form.form--close");
  _data;

  addHandlerClick(handler) {
    console.log(this._element);
    this._element.addEventListener("submit", function (e) {
      e.preventDefault();
      const user = this.querySelector(".form__input.form__input--user")?.value;
      const pin = this.querySelector(".form__input.form__input--pin")?.value;
      handler(user, pin);
    });
  }
}

export default new closeAcc();
