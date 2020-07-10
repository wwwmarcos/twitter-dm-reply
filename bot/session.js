const { config } = require('../config')

const Redis = require('ioredis')

const redis = new Redis(config.REDIS)

const saveSession = async (userId, session) => {
  return redis.set(userId, session.currentStateName, 'ex', 1800000)
}

const getSession = async userId => {
  const currentStateName = await redis.get(userId)

  return {
    userId,
    currentStateName: currentStateName || 'START',
    stack: [],
    userData: {}
  }
}

module.exports = {
  saveSession,
  getSession
}
