const { sendNotification } = require('../lib/telegram')
const { sendDirectMessage } = require('../lib/twitter')
const { config: { TELEGRAM } } = require('../config')

const message = 'Eita, vou chamar o brabo. Pera só um pouco'

const handler = async ({ senderId, event }) => {
  await sendNotification({
    botToken: TELEGRAM.BOT_TOKEN,
    chatId: TELEGRAM.CHAT_ID,
    message: `Tem gente esperando na page.\n\nextra-info: ${JSON.stringify(event)}`
  })

  return sendDirectMessage({
    recipientId: senderId,
    text: message
  })
}

const action = {
  name: 'call_a_human',
  handler
}

module.exports = {
  action
}
