const { action: donate } = require('./donate')
const { action: callAhuman } = require('./callAhuman')

const actions = [
  donate,
  callAhuman
]

const handleAction = async ({ name, senderId, event }) => {
  const currentAction = actions.find(action => action.name === name)
  return currentAction.handler({ senderId, event })
}

module.exports = {
  handleAction
}
