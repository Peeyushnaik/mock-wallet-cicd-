const express = require("express");
const router = express.Router();
const controller = require("../controllers/wallet.controller");

router.post("/create-user", controller.createUser);
router.post("/credit", controller.credit);
router.post("/debit", controller.debit);
router.get("/balance/:id", controller.getBalance);

module.exports = router;
