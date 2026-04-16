const { v4: uuidv4 } = require("uuid");

const users = {};

const createUser = (req, res) => {
  const id = uuidv4();

  users[id] = {
    id,
    balance: 0,
    transactions: []
  };

  res.json({ userId: id });
};

const credit = (req, res) => {
  const { userId, amount } = req.body;

  const user = users[userId];

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.balance += amount;
  user.transactions.push({ type: "credit", amount });

  res.json({ balance: user.balance });
};

const debit = (req, res) => {
  const { userId, amount } = req.body;

  const user = users[userId];

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (user.balance < amount) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  user.balance -= amount;
  user.transactions.push({ type: "debit", amount });

  res.json({ balance: user.balance });
};

const getBalance = (req, res) => {
  const user = users[req.params.id];

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ balance: user.balance });
};

module.exports = {
  createUser,
  credit,
  debit,
  getBalance
};