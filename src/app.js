const Web3 = require("web3");
const EthereumTransaction = require("ethereumjs-tx").Transaction;
const dotenv = require("dotenv");

dotenv.config();

const createEthereumTransaction = async () => {
  // -- Step 1: Set up the appropriate configuration
  let localGanacheUrl = "http://127.0.0.1:8545";
  let web3 = new Web3(localGanacheUrl);
  let accounts = await web3.eth.getAccounts();
  console.log("Account in local ganache chain:", accounts);

  // -- Step 2: Set the sending and receiving addresses for the transaction
  let sendingAddress = accounts[0];
  let receivingAddress = accounts[1];

  // -- Step 3: Check the balances of each address
  console.log("SendingAddress Bal Before:", await web3.eth.getBalance(sendingAddress));
  console.log("ReceivingAddress Bal Before:", await web3.eth.getBalance(receivingAddress));

  // -- Step 4: Set up the transaction using the transaction variables
  let rawTxn = {
    nonce: "0x00",
    gasPrice: "0x09184e72a000",
    gasLimit: "0xC350",
    to: receivingAddress,
    value: "0x14",
    data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057",
  };

  // -- Step 6: Sign the transaction with the Hex value of the private key of the sender
  let senderPrivateKey = process.env.PRI_KEY;
  let senderPrivateKeyHex = Buffer.from(senderPrivateKey, "hex");
  let txn = new EthereumTransaction(rawTxn);
  txn.sign(senderPrivateKeyHex);
  var serializedTransaction = txn.serialize();
  await web3.eth.sendSignedTransaction(serializedTransaction);

  //View Account balances after transactions
  console.log("SendingAddress Bal After:", await web3.eth.getBalance(sendingAddress));
  console.log("ReceivingAddress Bal After:", await web3.eth.getBalance(receivingAddress));
};

createEthereumTransaction();
