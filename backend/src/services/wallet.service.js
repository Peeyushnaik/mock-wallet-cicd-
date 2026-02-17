const { users, transactions, processedTransactions } = require("../data/store");
const { v4: uuidv4 } = require("uuid");

exports.createUser = () => {
  const id = uuidv4();
  users[id] = 0;
  transactions[id] = [];
  return id;
};

exports.credit = (userId, amount, txnId) => {
  if (processedTransactions.has(txnId)) {
    return users[userId];
  }

  users[userId] += amount;
  transactions[userId].push({ type: "credit", amount });
  processedTransactions.add(txnId);

  return users[userId];
};

exports.debit = (userId, amount, txnId) => {
  if (processedTransactions.has(txnId)) {
    return users[userId];
  }

  if (users[userId] < amount) {
    throw new Error("Insufficient funds");
  }

  // Simulate 20% random failure (FinTech simulation)
  if (Math.random() < 0.2) {
    throw new Error("Mock payment gateway failure");
  }

  users[userId] -= amount;
  transactions[userId].push({ type: "debit", amount });
  processedTransactions.add(txnId);

  return users[userId];
};

exports.getBalance = (userId) => users[userId];
