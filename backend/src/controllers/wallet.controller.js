const walletService = require("../services/wallet.service");

exports.createUser = (req, res) => {
  const id = walletService.createUser();
  res.json({ userId: id });
};

exports.credit = (req, res) => {
  try {
    const { userId, amount } = req.body;
    const txnId = req.headers["idempotency-key"];

    const balance = walletService.credit(userId, amount, txnId);
    res.json({ balance });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.debit = (req, res) => {
  try {
    const { userId, amount } = req.body;
    const txnId = req.headers["idempotency-key"];

    const balance = walletService.debit(userId, amount, txnId);
    res.json({ balance });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBalance = (req, res) => {
  const balance = walletService.getBalance(req.params.id);
  res.json({ balance });
};
