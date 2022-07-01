import renderOperacoes from "./view/renderOperacoes.js";
import renderSummary from "./view/renderSummary.js";
import { accounts, atual, requestLoan, sendMoney } from "./model.js";

import sendMoneyView from "./view/sendMoney.js";
import requestLoanView from "./view/requestLoan.js";
import "./view/date.js";

renderOperacoes.render(atual.movements);
renderSummary.render(atual);

function controlSendMoney(e) {
  console.log(e);
  e.preventDefault();

  const [dst, value] = [sendMoneyView.dst, sendMoneyView.value];
  const status = sendMoney(atual.user, dst, value);
  console.log(status);
  if (status) {
    renderOperacoes.render(atual.movements);
    renderSummary.render(atual);
  }
}

function controlRequestLoan(e) {
  e.preventDefault();

  const value = +requestLoanView.value;

  console.log(value);
  if (!value) return;

  requestLoan(value);
  renderOperacoes.render(atual.movements);
  renderSummary.render(atual);
}

function controlSort() {
  renderOperacoes.render(atual.movements.reverse());
}

sendMoneyView.addHandler(controlSendMoney);
requestLoanView.addHandler(controlRequestLoan);
renderSummary.addHandlerSort(controlSort);
