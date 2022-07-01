export const accounts = [
  {
    owner: "Jonas Schmedtmann",
    movements: [
      {
        data: 1658851200000,
        value: 200,
      },
      {
        data: 1658764800000,
        value: 500,
      },
      {
        data: 1658678400000,
        value: -450,
      },
    ],
    interestRate: 1.2, // %
    pin: 1111,
    user: "js",
  },
  {
    owner: "Jessica Davis",
    movements: [
      {
        data: 1658851200000,
        value: 200,
      },
      {
        data: 1658764800000,
        value: 500,
      },
      {
        data: 1658678400000,
        value: -450,
      },
    ],
    interestRate: 1.5,
    pin: 2222,
    user: "jd",
  },
  {
    owner: "Steven Thomas Williams",
    movements: [
      {
        data: 1658851200000,
        value: 200,
      },
      {
        data: 1658764800000,
        value: 500,
      },
      {
        data: 1658678400000,
        value: -450,
      },
    ],
    interestRate: 0.7,
    pin: 3333,
    user: "stw",
  },
  {
    owner: "Sarah Smith",
    movements: [
      {
        data: 1658851200000,
        value: 200,
      },
      {
        data: 1658764800000,
        value: 500,
      },
      {
        data: 1658678400000,
        value: -450,
      },
    ],
    interestRate: 1,
    pin: 4444,
    user: "ss",
  },
];

export let atual = accounts[0];

function findUser(user) {
  return accounts.find((obj) => obj.user === user);
}

function getBalance(user) {
  return user.movements
    .map(({ value }) => value)
    .reduce((acc, val) => acc + val, 0);
}

export function sendMoney(user, userDst, value) {
  const userAcc = findUser(user);
  const dstAcc = findUser(userDst);

  if (!userAcc || !dstAcc) return;
  if (!value || value < 0) return;
  if (value > getBalance(userAcc)) return;

  const data = Date.now();

  userAcc.movements.push({ data, value: -value });
  dstAcc.movements.push({ data, value });

  return true;
}

export function requestLoan(value) {
  const balance = getBalance(atual);

  const data = Date.now();
  const obj = { data, value };

  atual.movements.push(obj);
}

export const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);
