const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const AccountsManager = require("./accounts_manager")
const fs = require("fs")

app.use(cors());
app.use(express.json());

const accounts_manager = new AccountsManager(3)

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;

  const private_key = address;

  var balance = accounts_manager.getBalanceWeb3(private_key); 

  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, msg } = req.body;

  const objMsg = JSON.parse(msg.message);

  const ad = accounts_manager.getSenderWeb3(msg);

  const bal = accounts_manager.sendBalanceWeb3(ad, objMsg.recipient, objMsg.amount);

  res.send({ balance: bal });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
