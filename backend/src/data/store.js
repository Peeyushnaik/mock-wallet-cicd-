let users = {};
let transactions = {};
let processedTransactions = new Set(); // for idempotency

module.exports = { users, transactions, processedTransactions };
