import View from "./view.js";

class _ {
  _element = document.querySelector(".login");
  constructor() {}

  addHandlerClick(handler) {
    this._element.addEventListener("click", function (e) {
      e.preventDefault();

      const user = this.querySelector(
        ".login__input.login__input--user"
      )?.value;
      const pin = this.querySelector(".login__input.login__input--pin")?.value;

      handler(user, pin);
    });
  }
}

export default new _();
