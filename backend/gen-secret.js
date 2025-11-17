import crypto from 'crypto';

function genBase64(lenBytes = 32) {
  return crypto.randomBytes(lenBytes).toString('base64');
}

function genHex(lenBytes = 32) {
  return crypto.randomBytes(lenBytes).toString('hex');
}

console.log('Base64:', genBase64());
console.log('Hex   :', genHex());
