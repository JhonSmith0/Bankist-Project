export default {
  _element: document.querySelector(".app"),

  visible() {
    this._element.classList.remove("hidden");
  },
  hidden() {
    this._element.classList.add("hidden");
  },

  clearInputs() {
    [...document.querySelectorAll("input")].forEach(
      (input) => (input.value = "")
    );
  },
};
