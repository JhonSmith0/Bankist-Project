export default {
  form: document.querySelector(".form.form--loan"),
  addHandler(handler) {
    this.form.addEventListener("submit", handler);
  },

  get value() {
    return this.form.querySelector("input").value;
  },
};
