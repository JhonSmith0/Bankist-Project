export default {
  form: document.querySelector(".form.form--loan"),
  addHandler(handler) {
    this.form.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  },

  get value() {
    return this.form.querySelector("input").value;
  },
};
