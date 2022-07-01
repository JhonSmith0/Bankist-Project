import { VISIBLE_CLASS, HIDDEN_CLASS } from "../config.js";

class view {
  _element;
  _data;

  constructor() {}

  render(data) {
    this._data = data;
    this._element.innerHTML = this.generateHTML();
  }

  calcTimeChange(time1, time2) {
    const change = Math.abs(time1 - time2);
    const day = Math.trunc(change / 86400000);

    return day ? day + " days ago" : "today";
  }
}

export default view;
