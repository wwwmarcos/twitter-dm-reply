require('dotenv').config()

const config = {
  TWITTER_AUTH: {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.TOKEN_SECRET
  },
  BOT_ID: process.env.BOT_ID,
  APP_PORT: process.env.APP_PORT || 3000,
  TELEGRAM: {
    BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    CHAT_ID: process.env.TELEGRAM_CHAT_ID
  },
  REDIS: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
  }
}

module.exports = {
  config
}
