const Criptografia = require("./criptografia")
const {Web3} = require("web3")
const { secp256k1 } = require("ethereum-cryptography/secp256k1")

class Account {
    constructor(privateKey){
        this.criptografia = new Criptografia()
        this.privateKey = privateKey;
        this.publicKey = secp256k1.getPublicKey(privateKey);
        this.address = this.criptografia.getAddress(this.publicKey);
        this.balance = 30;
    }

    receiveAmount(amount){
        this.balance += amount;
    }

    sendAmount(amount){
        this.balance -= amount;
    }

}

class AccountWeb3 {
    constructor(){
        this.web3 = new Web3()
        this.accountWeb3 = this.web3.eth.accounts.create();
        this.balance = 30;
    }

    receiveAmount(amount){
        this.balance += parseInt(amount);
    }

    sendAmount(amount){
        this.balance -= parseInt(amount);
    }

}

module.exports = Account;
module.exports = AccountWeb3;