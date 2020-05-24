const { config: { TWITTER_AUTH, APP_PORT, BOT_ID } } = require('./config')
const { crc } = require('./lib/crc')
const bodyParser = require('body-parser')
const express = require('express')
const { handleAction } = require('./actions')
const app = express()

app.use(bodyParser.json())

app.get('/', (_req, res) => {
  res.send({
    status: 'ok'
  })
})

app.get('/webhooks/twitter', (req, res) => {
  const crcToken = req.query.crc_token

  const hmac = crc.getChallengeResponse({
    crcToken,
    consumerSecret: TWITTER_AUTH.consumer_secret
  })

  res.send({
    response_token: `sha256=${hmac}`
  })
})

app.post('/webhooks/twitter', async (req, res) => {
  try {
    const events = req.body && req.body.direct_message_events

    if (!events) {
      return res.send('no direct messages events found')
    }

    const results = events
      .filter(event => {
        const containsQuickResponse = event.message_create.message_data.quick_reply_response
        return containsQuickResponse
      })
      .map(async event => {
        const senderId = event.message_create.sender_id

        if (
          event.type === 'message_create' &&
          senderId !== BOT_ID
        ) {
          const quickResponse = event.message_create.message_data.quick_reply_response

          return handleAction({
            name: quickResponse.metadata,
            senderId,
            event
          })
        }
      })

    await Promise.all(results)
  } catch (error) {
    console.error(error)
  }

  res.send('ok bro')
})

app.listen(APP_PORT, _ =>
  console.log(`running on ${APP_PORT}`)
)
