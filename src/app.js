import Web3 from "web3";
import EthereumTransaction from "ethereumjs-tx";
import dotenv from "dotenv";

dotenv.config();

const web3Test = async () => {
  let localGanacheUrl = "http://127.0.0.1:8545";
  let web3 = new Web3(localGanacheUrl);
  web3.eth.getAccounts().then((accounts) => console.log(accounts));

  let sendingAddress = "0x14898b8a6De59e959d057E9d294eA66d57eBd1F3";
  let receivingAddress = "0xe40c6f8171e6B137391c69e04dc6b98bF1dc02dB";
  web3.eth
    .getBalance(sendingAddress)
    .then((bal) => console.log("SendingAddress Bal:", bal));
  web3.eth
    .getBalance(receivingAddress)
    .then((bal) => console.log("ReceivingAddress Bal:", bal));

  let rawTxn = {
    nonce: 0,
    gasPrice: 20000000,
    gasLimit: 40000,
    value: 1,
    data: "",
  };
  let senderPrivateKey = process.env.SENDER_PRIVATE_KEY;
  console.log("senderPrivateKey:", senderPrivateKey);
  let senderPrivateKeyHex = new Buffer.from(senderPrivateKey, "hex");
  console.log("senderPrivateKeyHex:", senderPrivateKeyHex);

  let txn = new EthereumTransaction.Transaction(rawTxn);
  txn.sign(senderPrivateKeyHex);
};

web3Test();
