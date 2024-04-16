import {Web3} from "web3"

class CriptografiaCliente {

    constructor(){
        this.web3 = new Web3()
    }

    hashMessage(message) {
        return this.web3.eth.accounts.hashMessage(message);
    }
    
    signMessage(message, private_key) {
        return this.web3.eth.accounts.sign(message, private_key);
    }
}

export default CriptografiaCliente;