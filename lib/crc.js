const crypto = require('crypto')

const getChallengeResponse = ({
  crcToken,
  consumerSecret
}) => {
  const hmac = crypto
    .createHmac('sha256', consumerSecret)
    .update(crcToken)
    .digest('base64')

  return hmac
}

module.exports = {
  crc: {
    getChallengeResponse
  }
}
