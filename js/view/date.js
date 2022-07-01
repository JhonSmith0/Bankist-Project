import { formatter } from "../config.js";

const balanceDate = document.querySelector(".balance__date");
balanceDate.innerHTML = formatter.format(Date.now());
