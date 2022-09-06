const crypto = require("crypto");
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    // The standard secure default length for RSA keys is 2048 bits
    modulusLength: 2048,
  });



// This is the data we want to encrypt
const data = "Secrete data";
const encryptedData = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  // convert data into buffer using Buffer.from
 Buffer.from(JSON.stringify(data))
);
// The encrypted data is in the form of bytes so converting it to base64 to  readable
console.log("encypted data: ", encryptedData.toString("base64"));


const decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
      // In order to decrypt the data, we need to specify the same
      // hashing function &  padding scheme that we used to encrypt the data in the previous step
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    encryptedData
  );
  
  // The decrypted data is Buffer type, which we can convert to a string to reveal the original data
  console.log("decrypted data: ", decryptedData.toString());
