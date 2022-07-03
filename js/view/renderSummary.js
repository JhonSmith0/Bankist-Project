import View from "./view.js";

class renderSummary extends View {
  _element = document.querySelector(".summary");
  _balanceValue = document.querySelector(".balance__value");

  constructor() {
    super();
  }

  generateHTML() {
    const { movements, interestRate } = this._data;

    const { IN, OUT, INTEREST, TOTAL } = movements.reduce(
      (acc, { value }) => {
        acc.TOTAL += value;

        value >= 0 ? (acc.IN += value) : (acc.OUT += value);
        acc.INTEREST = (acc.TOTAL * interestRate) / 100;

        return acc;
      },
      {
        IN: 0,
        OUT: 0,
        INTEREST: 0,
        TOTAL: 0,
      }
    );

    this._balanceValue.innerHTML = TOTAL + "€";

    return `<p class="summary__label">In</p>
    <p class="summary__value summary__value--in">${Math.abs(IN).toFixed(2)}€</p>
    <p class="summary__label">Out</p>
    <p class="summary__value summary__value--out">${Math.abs(OUT).toFixed(
      2
    )}€</p>
    <p class="summary__label">Interest</p>
    <p class="summary__value summary__value--interest">${Math.abs(
      INTEREST
    ).toFixed(2)}€</p>
    <button class="btn--sort">↓ SORT</button>`;
  }

  addHandlerSort(handler) {
    this._element.addEventListener("click", function (e) {
      const sort = this.querySelector(".btn--sort");
      if (e.target !== sort) return;
      const up = "↑";
      const down = "↓";

      const status = sort.textContent.split(" ")?.[0].trim() === up ? down : up;

      sort.textContent = status + " Sort";

      handler();
    });
  }
}

export default new renderSummary();
