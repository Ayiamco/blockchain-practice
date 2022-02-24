import Web3 from "web3";
import EthereumTransaction from "ethereumjs-tx";
import dotenv from "dotenv";

dotenv.config();

const createEthereumTransaction = async () => {
  // -- Step 1: Set up the appropriate configuration
  let localGanacheUrl = "http://127.0.0.1:8545";
  let web3 = new Web3(localGanacheUrl);
  web3.eth.getAccounts().then((accounts) => console.log(accounts));

  // -- Step 2: Set the sending and receiving addresses for the transaction
  let sendingAddress = "0x14898b8a6De59e959d057E9d294eA66d57eBd1F3";
  let receivingAddress = "0xe40c6f8171e6B137391c69e04dc6b98bF1dc02dB";

  // -- Step 3: Check the balances of each address
  web3.eth
    .getBalance(sendingAddress)
    .then((bal) => console.log("SendingAddress Bal:", bal));
  web3.eth
    .getBalance(receivingAddress)
    .then((bal) => console.log("ReceivingAddress Bal:", bal));

  // -- Step 4: Set up the transaction using the transaction variables
  let rawTxn = {
    nonce: 0,
    gasPrice: 20000000,
    gasLimit: 40000,
    value: 1,
    data: "",
  };

  // -- Step 5: View the raw transaction rawTransaction
  console.log("Raw Transaction:", rawTxn);

  // -- Step 6: Check the new account balances (they should be the same)
  web3.eth.getBalance(sendingAddress).then(console.log);
  web3.eth.getBalance(receivingAddress).then(console.log);

  // Note: They haven't changed because they need to be signed...

  // -- Step 7: Sign the transaction with the Hex value of the private key of the sender
  let senderPrivateKey = process.env.SENDER_PRIVATE_KEY;
  console.log("senderPrivateKey:", senderPrivateKey);
  let senderPrivateKeyHex = new Buffer.from(senderPrivateKey, "hex");
  console.log("senderPrivateKeyHex:", senderPrivateKeyHex);
  let txn = new EthereumTransaction.Transaction(rawTxn);
  txn.sign(senderPrivateKeyHex);
};

createEthereumTransaction();
