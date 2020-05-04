const { config } = require('../config')
const Twitter = require('twitter-lite')

const client = new Twitter(
  config.TWITTER_AUTH
)

const sendDirectMessage = async ({ recipientId, text = Date.now() }) => {
  return client.post('direct_messages/events/new', {
    event: {
      type: 'message_create',
      message_create: {
        target: {
          recipient_id: recipientId
        },
        message_data: {
          text
        }
      }
    }
  })
}

module.exports = {
  sendDirectMessage
}
