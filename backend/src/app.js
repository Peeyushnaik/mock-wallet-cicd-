const express = require("express");
const walletRoutes = require("./routes/wallet.routes");

const app = express();

app.use(express.json());

// Routes
app.use("/wallet", walletRoutes);

// Health check (for Docker & Kubernetes)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Wallet service running on port ${PORT}`);
});
