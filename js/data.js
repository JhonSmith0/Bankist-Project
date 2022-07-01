"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

let currentAccount;

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");
const conteinerSumary = document.querySelector(".summary");
const summaryIn = conteinerSumary.querySelector(".summary__value--in");
const summaryOut = conteinerSumary.querySelector(".summary__value--out");
const summaryInterest = conteinerSumary.querySelector(
  ".summary__value--interest"
);

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const movementsRow = document.querySelector(".movements__row");

const coin = "€";
const up = "↑";
const down = "↓";

// ---------------------------
// Outras
// ---------------------------

function resetInput() {
  document.querySelectorAll("input").forEach((e) => (e.value = ""));
}

function data() {
  const i = {};
  const data = new Date();

  let [day, month, year] = [data.getDay(), data.getMonth(), data.getFullYear()];

  day = day.length >= 2 ? day : "0" + day;
  month = month.length >= 2 ? month : "0" + month;

  return [day, month, year];
}

function getBalance() {
  return Number(labelBalance.textContent.split(coin)[0]);
}

function getUser(ini) {
  return accounts.filter(({ owner }) => initials(owner) == ini);
}

function biggestToLowest(arr) {
  const novo = [];
  arr.forEach((value) => {
    const primeiro = novo[0] ?? 0;
    if (value > primeiro) novo.unshift(value);
    else novo.push(value);
    console.log(value);
  });

  return novo;
}

function lowestToBiggest(arr) {
  arr.sort((a, b) => a - b);
}

function initials(string) {
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => word[0])
    .join("");
}

// --------------------------
// Listeners
// --------------------------

btnLogin.addEventListener("click", login);
btnTransfer.addEventListener("click", sendMoney);
btnLoan.addEventListener("click", getLoan);
btnClose.addEventListener("click", closeAccount);
btnSort.addEventListener("click", sortMovements);

// --------------------------
// Login
// --------------------------

function login(e) {
  // Nao deixa a pagina atualizar
  e.preventDefault();
  const obj = getObj(inputLoginUsername.value, inputLoginPin.value);
  containerApp.style.opacity = 0;
  currentAccount = undefined;
  if (!obj) return;

  containerApp.style.opacity = 1;
  currentAccount = obj;
  renderPage(obj);
}

function getObj(USER, PIN) {
  return accounts.find(({ username, pin }) => USER == username && PIN == pin);
}

// --------------------------
// Renderizar a pagina do usuario
// --------------------------

function criarMovements(movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (value, index, arr) {
    const type = value > 0 ? "deposit" : "withdrawal";
    const row = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">
          ${index + 1} ${type}       
          </div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${value}${coin}</div>
    </div>`.trim();

    // Adiciona no comeco
    containerMovements.insertAdjacentHTML("afterbegin", row);
  });
}

function renderPage() {
  if (!currentAccount) return;
  const [day, month, year] = data();
  const { movements, interestRate } = currentAccount;
  const infos = userInfos(movements, interestRate);

  labelBalance.textContent = infos.soma + coin;
  labelDate.textContent = `${day}/${month}/${year}`;

  calcSummary(infos.in, infos.out, infos.interest);

  criarMovements(movements);
}

function userInfos() {
  const { movements, interestRate } = currentAccount;
  const infos = {
    soma: movements.reduce((value, acc) => acc + value),
    in: movements.filter((v) => v > 0).reduce((v, acc) => v + acc, 0),
    out: movements.filter((v) => v < 0).reduce((v, acc) => v + acc, 0) * -1,
    interest: 0,
  };

  infos.interest = movements
    .filter((v) => v > 0)
    .map((v) => (v * interestRate) / 100)
    .filter((v) => v > 1)
    .reduce((v, acc) => acc + v, 0);

  infos.interest = Math.trunc();

  return infos;
}

function calcSummary(IN, OUT, RATE) {
  // How much got in ?
  // How much got out ?

  summaryIn.textContent = IN + coin;
  summaryOut.textContent = OUT + coin;
  summaryInterest.textContent = RATE + coin;
}

// --------------------------
// Money Operations
// --------------------------

function sendMoney(e) {
  e.preventDefault();

  const dst = inputTransferTo.value;
  const amount = Number(inputTransferAmount.value);
  const objDst = accounts.find((obj) => obj.username == dst);

  if (!dst || !amount || !objDst) return 0;
  if (amount > getBalance() || amount < 0) return 0;
  if (objDst === currentAccount) return 0;

  currentAccount?.movements.push(-amount);
  objDst.movements.push(amount);

  renderPage();
}

function getLoan(e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (!amount || amount < 0) return 0;

  // Tem q ter algum deposito 10% >= ou igual a valor do emprestimo
  if (currentAccount?.movements.some((mov) => mov >= amount * 0.1)) {
    currentAccount?.movements.push(amount);
    renderPage();
  }
}

// --------------------------
// Close account
// --------------------------

function closeAccount(e) {
  e.preventDefault();

  const obj = getObj(inputCloseUsername.value, inputClosePin.value);
  if (!obj || obj != currentAccount) return;

  accounts.splice(
    accounts.findIndex((v) => v == obj),
    1
  );

  currentAccount = undefined;
  containerApp.style.opacity = 0;

  resetInput();
}

function ascending(a, b) {
  return a - b;
}

function sortMovements(e) {
  const movements = currentAccount?.movements;
  let direction = this.textContent.split(" ")[0];

  this.textContent = direction == down ? up : down;
  this.textContent += " SORT";

  const movCopy = [...movements];
  direction === down
    ? movCopy.sort(ascending)
    : movCopy.sort(ascending).reverse();

  criarMovements(movCopy);
}

// ----------------------------------
// Desafios da aula 166
// ----------------------------------

// Quanto o banco tem em DEPOSITOS ?
const depositos = accounts
  .flatMap((obj) => obj.movements.filter((v) => v > 0))
  .reduce((a, v) => a + v);

// Quantos depositos >= 1000 foram feitos
const maior1000 = accounts.flatMap((obj) =>
  obj.movements.filter((v) => v >= 1000)
).length;
console.log(maior1000);

// Calucar depositos / saques usando .reduce() (RETORNAR UM OBJECT)

const { depositos: DEPOSITOS, saques: SAQUES } = accounts
  .flatMap((v) => v.movements)
  .reduce(
    (acc, mov) => {
      if (mov >= 0) {
        acc.depositos += mov;
      } else {
        acc.saques += -mov;
      }

      return acc;
    },
    { depositos: 0, saques: 0 }
  );

// Converter string em title
const title = function (string) {
  const exceptions = [
    "a",
    "or",
    "in",
    "but",
    "the",
    "or",
    "on",
    "in",
    "with",
    "and",
  ];
  return string
    .toLowerCase()
    .split(" ")
    .map((word, i) => {
      return !exceptions.includes(word) || i === 0
        ? word[0].toUpperCase() + word.slice(1)
        : word;
    })
    .join(" ");
};
