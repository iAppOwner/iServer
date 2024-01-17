const CryptoJS = require('crypto-js');
const config = require('config'); 

const secretKey = config.get("app.crypto.secret")

// Set your secret key and initialization vector (IV)
const iv = CryptoJS.enc.Hex.parse('abcdef9876543210abcdef9876543210');

// Function to encrypt a message
exports.encryptMessage = (message) => {
  const encrypted = CryptoJS.AES.encrypt(message, secretKey, { iv: iv });
  return encrypted.toString();
}

// Function to decrypt a message
exports.decryptMessage = (encryptedMessage) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedMessage, secretKey, { iv: iv });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

// Example usage

