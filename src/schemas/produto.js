const joi = require('joi')

const schemaProduto = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'O campo descrição é obrigatório!',
        'string.empty': 'Descrição inválida, por favor digite um descrição válida!'
    }),

    quantidade_estoque: joi.number().integer().positive().required().messages({
        'any.required': 'O campo quantidade_estoque é obrigatório!',
        'number.base': 'Quantidade inválida, por favor digite uma quantidade válida!',
        'number.integer': 'Quantidade inválida, por favor digite uma quantidade válida!',
        'number.positive': 'Quantidade inválida, por favor digite uma quantidade válida!'
    }),

    valor: joi.number().integer().positive().required().messages({
        'any.required': 'O campo valor é obrigatório!',
        'number.base': 'Valor inválido, por favor digite um valor válido!',
        'number.integer': 'Valor inválido, por favor digite um valor válido!',
        'number.positive': 'Valor inválido, por favor digite um valor válido!'
    }),

    categoria_id: joi.number().integer().positive().required().messages({
        'any.required': 'O campo categoria_id é obrigatário',
        'number.base': 'Categoria inválida, por favor digite uma categoria válida!',
        'number.integer': 'Categoria inválida, por favor digite uma categoria válida!',
        'number.positive': 'Categoria inválida, por favor digite uma categoria válida!'
    }),

    produto_imagem: joi.string().messages({
        'string.empty': 'Imagem do produto inválida, por favor digite uma url válida.'
    })
})

module.exports = schemaProduto