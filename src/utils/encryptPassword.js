import CryptoJS from 'crypto-js'

// Java의 getSecretKeySpec 로직 동일 구현
function getSecretKeySpec(key) {
  const keyBytes = CryptoJS.enc.Utf8.parse(key)
  const keyWords = keyBytes.words.slice()
  const byteDiff = 32 - keyBytes.sigBytes

  if (byteDiff > 0) {
    // 부족한 바이트만큼 0 패딩 추가
    for (let i = 0; i < byteDiff; i++) {
      keyWords.push(0)
    }
  }

  return CryptoJS.lib.WordArray.create(keyWords, 32)
}

const SECRET_KEY = getSecretKeySpec('mySuperSecretKey32BytesLengthoo')

export function encrypt(plainText) {
  const encrypted = CryptoJS.AES.encrypt(plainText, SECRET_KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.toString()
}

export function decrypt(encryptedText) {
  const decrypted = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  return CryptoJS.enc.Utf8.stringify(decrypted)
}
