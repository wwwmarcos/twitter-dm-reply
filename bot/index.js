const { allIntents } = require('./intents')
const { saveSession, getSession } = require('./session')
const { sendNotification } = require('../lib/telegram')
const { config: { TELEGRAM } } = require('../config')

const callAHumanAction = {
  onIntent: 'GERENTE',
  handler: async session => {
    sendNotification({
      botToken: TELEGRAM.BOT_TOKEN,
      chatId: TELEGRAM.CHAT_ID,
      message: `Tem gente esperando na page.\n\nextra-info: ${JSON.stringify(session)}`
    })

    return {
      responses: ['Eita, vou chamar o brabo. Pera só um pouco'],
      nextState: {
        name: 'SILENCIO'
      }
    }
  }
}

const startActions = [
  callAHumanAction,
  { onIntent: 'DOAR-GENERICO', goToState: { name: 'DOACAO' } },
  { onIntent: 'DOAR-DINHEIRO', goToState: { name: 'DOACAO', intent: 'DOAR-DINHEIRO' } },
  { onIntent: 'DOAR-LIVRO', goToState: { name: 'DOACAO', intent: 'DOAR-LIVRO' } }
]

const botDefinition = {
  allIntents,
  language: 'pt',
  states: [
    {
      name: 'START',
      startTexts: [
        'Oi, como posso te ajudar?',
        'Vamos lá, como posso te ajudar?'
      ],
      actions: startActions,
      unknownIntentAction: {
        responses: [
          'Não te entendi. Você quer fazer uma doação ou falar com o gerente?'
        ]
      }
    },
    {
      name: 'DOACAO',
      startTexts: [
        'Ok, você quer doar livros ou ajudar financeiramente?'
      ],
      actions: [
        callAHumanAction,
        {
          onIntent: 'DOAR-LIVRO',
          responses: [
            'Então faz um favor pra nós? Responde esse formulário com algumas informações. Se tiver um voluntário nosso aí, logo logo ele entra em contato com você pra combinar um lugar tranquilo pra entrega dos livros.\n\nhttps://docs.google.com/forms/d/1LxTHS7DiKKOPSWNiBsvqOCOtE7_QCg6sKiV9GhdRUa8'
          ],
          goToState: { name: 'FINALIZA' }
        },
        {
          onIntent: 'DOAR-DINHEIRO',
          responses: [
            'Que massa, agradecemos! Temos o PicPay: @bienaldaquebrada.\nVocê também consegue ajudar a gente pelo benfeitoria, é só acessar esse link https://benfeitoria.com/bienaldaquebrada'
          ],
          goToState: { name: 'FINALIZA' }
        }
      ],
      unknownIntentAction: {
        responses: [
          'Não entendi muito bem, você quer doar livros, ajudar financeiramente, ou quer que eu chame o gerente?'
        ]
      }
    },
    {
      name: 'FINALIZA',
      startTexts: [
        'Posso te ajudar com mais alguma coisa?'
      ],
      actions: [
        ...startActions,
        {
          onIntent: 'NAO',
          responses: [
            'Tudo bem então. Muito obrigado e até mais!'
          ]
        },
        {
          onIntent: 'SIM',
          goToState: { name: 'START' }
        }
      ],
      unknownIntentAction: {
        responses: [
          'Não te entendi. Você ainda precisa de ajuda?'
        ]
      }
    },
    {
      name: 'SILENCIO',
      startTexts: [
        ''
      ],
      actions: [],
      unknownIntentAction: {
        responses: [
          ''
        ]
      }
    }
  ],
  resolvers: {
    getSession,
    saveSession
  }
}

module.exports = {
  botDefinition
}
