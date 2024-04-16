const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils")
const Account = require("./account");
const Criptografia = require("./criptografia")
const TextEncoding = require("text-encoding")
const fs = require("fs")
const {Web3} = require("web3");
const AccountWeb3 = require("./account");

class AccountsManager {
    constructor(num_acc){
        this.web3 = new Web3()
        this.criptografia = new Criptografia()
        this.accounts = new Map()
        while(num_acc > 0){
            this.createAccountWeb3()
            num_acc--;
        }
    }

    createAccount(){
        var private_key = secp256k1.utils.randomPrivateKey();
        var acc = new Account(private_key);
        this.accounts.set(toHex(acc.address), acc);
        const u8arr = new Uint8Array([72, 101, 108, 108, 111])
        fs.writeFile("./add.txt", new TextEncoding.TextDecoder("windows-1251").decode(acc.address) + "\n", err => {
            if (err) {
                console.error(err)
                return
            }
        })
    }

    createAccountWeb3(){
        var acc = new AccountWeb3();
        this.accounts.set(acc.accountWeb3.address, acc);
    }

    sendBalance(sender, recipient, amount) {
        if(!this.accounts.get(sender)) {
            return "Sender Not Exist";
        }else if(!this.accounts.get(recipient)) {
            return "Recipient Not Exist";
        }else if(this.accounts.get(sender).balance < amount) {
            return "Not enough funds!";
        }else{
            this.accounts.get(sender).sendAmount(amount);
            this.accounts.get(recipient).receiveAmount(amount);
        }
    }

    getBalance(private_key){
        var pubk = secp256k1.getPublicKey(private_key);
        var add = this.criptografia.getAddress(pubk);
        if(this.accounts.get(toHex(add))) {
            var balance = this.accounts.get(toHex(add)).balance;
            console.log(balance);
            return balance;
        }else {
            console.log("ERRO");
            return "Not Exist";
        }
    }

    getBalanceWeb3(private_key){
        var add = this.web3.eth.accounts.privateKeyToAccount(private_key).address;
        if(this.accounts.get(add)) {
            var balance = this.accounts.get(add).balance;
            return balance;
        }else {
            console.log("ERRO");
            return "Not Exist";
        }
    }

    getPublicKey(msg){
        return this.web3.eth.accounts.recover(msg.message, msg.signature);
    }

    getAddress(publicKey){
        const hex = Uint8Array.from(Buffer.from(publicKey.slice(2), 'hex'));

        const add = this.criptografia.getAddress(hex);
        
        return toHex(add);
    }

    getSenderWeb3(msg){       
        return this.web3.eth.accounts.recover(msg.message, msg.signature);
    }

    sendBalanceWeb3(sender, recipient, amount) {
        if(!this.accounts.get(sender)) {
            return "Sender Not Exist";
        }else if(!this.accounts.get(recipient)) {
            return "Recipient Not Exist";
        }else if(this.accounts.get(sender).balance < amount) {
            return "Not enough funds!";
        }else{
            this.accounts.get(sender).sendAmount(amount);
            this.accounts.get(recipient).receiveAmount(amount);
            return this.accounts.get(sender).balance;
        }
    }
}

module.exports = AccountsManager;