const CryptoJS = require("crypto-js");
const secretKey = process.env.ENCRYPTION_KEY;
console.log(secretKey);
const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString(); // AES + Base64
};

const decrypt = (encryptedText) => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { encrypt, decrypt };
