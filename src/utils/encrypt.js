import JSEncrypt from 'jsencrypt'

export default (publicKey, str) => {
  let encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey)
  const encryptedInfo = encrypt.encrypt(str)
  return encryptedInfo
}
