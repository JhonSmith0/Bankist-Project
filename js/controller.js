import renderOperacoes from "./view/renderOperacoes.js";
import renderSummary from "./view/renderSummary.js";
import * as model from "./model.js";
import "./view/date.js";

import sendMoneyView from "./view/sendMoney.js";
import requestLoanView from "./view/requestLoan.js";
import closeAccountView from "./view/closeAccountView.js";

import loginView from "./view/loginView.js";
import app from "./view/app.js";

function controlSendMoney() {
  const [dst, value] = [sendMoneyView.dst, sendMoneyView.value];
  const status = model.sendMoney(model.atual.user, dst, value);

  if (!status) return;

  renderOperacoes.render(model.atual.movements);
  renderSummary.render(model.atual);
}

function controlRequestLoan() {
  const value = +requestLoanView.value;
  if (!value) return;

  model.requestLoan(value);
  renderOperacoes.render(model.atual.movements);
  renderSummary.render(model.atual);
}

function controlSort() {
  renderOperacoes.render(model.atual.movements.reverse());
}

function controlCloseAcc(user, pin) {
  const status = model.closeAccount(user, pin);
  if (!status) return;
  app.hidden();
}

function controlLogin(user, pin) {
  if (!user || !pin) return;

  const status = model.login(user, pin);
  app.clearInputs();

  if (!status) return;

  renderOperacoes.render(model.atual.movements);
  renderSummary.render(model.atual);

  console.log(status, model.atual);
  app.visible();
  app.clearInputs();
}

function init() {
  sendMoneyView.addHandler(controlSendMoney);
  requestLoanView.addHandler(controlRequestLoan);
  renderSummary.addHandlerSort(controlSort);
  closeAccountView.addHandlerClick(controlCloseAcc);
  loginView.addHandlerClick(controlLogin);
}

init();
