export default {
  addHandler(handler) {
    const form = document.querySelector(".form.form--transfer");
    form.addEventListener("submit", handler);
  },

  get dst() {
    return document.querySelector(".form__input.form__input--to").value;
  },

  get value() {
    return document.querySelector(".form__input.form__input--amount").value;
  },
};
