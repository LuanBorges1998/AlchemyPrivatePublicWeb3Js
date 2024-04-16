const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { secp256k1 } = require("ethereum-cryptography/secp256k1")

class Criptografia {

    hashMessage(message) {
        return keccak256(utf8ToBytes(message));
    }
    
    signMessage(message, private_key) {
        var hashMsg = hashMessage(message);
        return secp256k1.sign(hashMessage, private_key, {recovered: true});
    }
    
    recoverKey(message, signature, recoveryBit){
        var msgHash = hashMessage(message);
        return secp256k1.recoverPublicKey(msgHash, signature, recoveryBit);
    }
    
    getAddress(publicKey) {
        var firstByte = publicKey.slice(0,1);
        var restBytes = publicKey.slice(1);
        var keccakHash = keccak256(restBytes);
        return keccakHash.slice(-20);
    }
}

module.exports = Criptografia;