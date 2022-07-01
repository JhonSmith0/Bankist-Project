import View from "./view.js";

class renderOperacoes extends View {
  _element = document.querySelector(".movements");
  _data;

  constructor() {
    super();
  }

  generateHTML() {
    const movements = [...this._data].reverse();
    return movements
      .map(({ value, data }, index) => {
        const type = value > 0 ? "deposit" : "withdrawal";
        return `
            <div class="movements__row">
              <div class="movements__type movements__type--${type}">${
          index + 1
        } ${type}</div>
              <div class="movements__date">${this.calcTimeChange(
                Date.now(),
                data
              )}</div>
              <div class="movements__value">${value}€</div>
            </div>
          `;
      })
      .join("");
  }
}

export default new renderOperacoes();
