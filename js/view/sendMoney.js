export default {
  addHandler(handler) {
    const form = document.querySelector(".form.form--transfer");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  },

  get dst() {
    return document.querySelector(".form__input.form__input--to").value;
  },

  get value() {
    return document.querySelector(".form__input.form__input--amount").value;
  },
};
