const { sendDirectMessage } = require('../lib/twitter')

const message = 'Então faz um favor pra nós? Responde esse formulário com algumas informações. Se tiver um voluntário nosso aí, logo logo ele entra em contato com você pra combinar um lugar tranquilo pra entrega dos livros.\n\nhttps://docs.google.com/forms/d/1LxTHS7DiKKOPSWNiBsvqOCOtE7_QCg6sKiV9GhdRUa8'

const handler = async ({ senderId }) => {
  return sendDirectMessage({
    recipientId: senderId,
    text: message
  })
}

const action = {
  name: 'donation',
  handler
}

module.exports = {
  action
}
