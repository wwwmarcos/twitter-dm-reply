const allIntents = [
  {
    name: 'GERENTE',
    training: [
      'falar com o gerente',
      'falar com humano',
      'chama uma pessoa',
      'preciso de ajuda',
      'quero falar com o gerente'
    ]
  },
  {
    name: 'DOAR-DINHEIRO',
    training: [
      'me passa o picpay',
      'vocês tem pic pay?',
      'me manda o qrcode',
      'link da benfeitoria',
      'como faço para doar dinheiro',
      'quero doar dinheiro',
      'picpay',
      'dinheiros',
      'dinheiro'
    ]
  },
  {
    name: 'DOAR-LIVRO',
    training: [
      'quero doar livros',
      'tenho livros para doar',
      'onde envio os livros?',
      'pode buscar meus livros',
      'livros',
      'livretos',
      'libros',
      'ajuda financeira',
      'financeiramente',
      'financeiro',
      'verdinhas',
      'cash',
      'crédito'
    ]
  },
  {
    name: 'DOAR-GENERICO',
    training: [
      'donation',
      'quero fazer uma doação',
      'quero ajudar',
      'ajudar o movimento',
      'quero ser voluntario',
      'como faz para fazer doação',
      'doação',
      'quero doar'
    ]
  },
  {
    name: 'NAO',
    training: [
      'não obrigado',
      'nops',
      'não valeu',
      'não preciso não',
      'só isso',
      'por enquanto é isso',
      'até mais',
      'não vlw',
      'não'
    ]
  },
  {
    name: 'SIM',
    training: [
      'sim',
      'pode',
      'quero',
      'preciso',
      'yes'
    ]
  }
]

module.exports = {
  allIntents
}
