const axios = require('axios')

const sendNotification = ({
  botToken,
  message,
  chatId
}) => axios(
  `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`
)

module.exports = {
  sendNotification
}
