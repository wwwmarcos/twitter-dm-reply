const { botDefinition } = require('./bot')
const { config: { TWITTER_AUTH, APP_PORT, BOT_ID } } = require('./config')
const { crc } = require('./lib/crc')
const { sendDirectMessage } = require('./lib/twitter')
const akamaru = require('akamaru')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()

app.use(bodyParser.json())

const bot = akamaru.build(botDefinition)

bot.load()

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

    console.log(JSON.stringify(req.body.direct_message_events, null, 2))

    if (!events) {
      return res.send('no direct messages events found')
    }

    const messageEvents = events.filter(event => {
      const senderId = event.message_create.sender_id
      return event.type === 'message_create' && senderId !== BOT_ID
    })

    const messages = messageEvents.map(
      event => {
        const message = event.message_create.message_data
        return {
          text: message.text.toLowerCase(),
          senderId: event.message_create.sender_id
        }
      }
    )

    const results = messages.map(async ({ senderId, text }) => {
      const { response: responses } = await bot.message({
        userId: senderId,
        text: text
      })

      for (const response of responses) {
        if (!response.trim()) {
          return
        }

        await sendDirectMessage({
          recipientId: senderId,
          text: response
        })
      }

      return responses
    })

    const responses = await Promise.all(results)

    res.send(responses)
  } catch (error) {
    console.error(error)
  }
})

app.listen(APP_PORT, _ =>
  console.log(`running on ${APP_PORT}`)
)
