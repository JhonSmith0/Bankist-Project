import { formatter } from "../config.js";

const balanceDate = document.querySelector(".balance__date");

export default {
  update() {
    balanceDate.innerHTML = formatter.format(Date.now());
  },
};
