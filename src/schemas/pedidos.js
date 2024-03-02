const joi = require('joi')

const schemaPedido = joi.object({
    cliente_id: joi.number().required().positive().integer().messages({
        'any.required': 'O campo id é obrigatório!',
        'number.base': 'Id do cliente inválido, por favor insira um id válido!',
        'number.positive': 'Id do cliente inválido, por favor insira um id válido!',
        'number.integer': 'Id do cliente inválido, por favor insira um id válido!'
    }),

    observacao: joi.string().messages({
        'string.empty': 'Observação inválida, por favor insira uma observação válida!'
    }),

    pedido_produtos: joi.array().required().items({
        produto_id: joi.number().required().positive().integer().messages({
            'any.required': 'O campo produto_id é obrigatório!',
            'number.base': 'Id do produto inválido, por favor insira um id válido!',
            'number.positive': 'Id do produto inválido, por favor insira um id válido!',
            'number.integer': 'Id do produto inválido, por favor insira um id válido!'
        }),

        quantidade_produto: joi.number().required().positive().integer().messages({
            'any.required': 'O campo quantidade_produto é obrigatório!',
            'number.base': 'Quantidade do produto inválida, por favor insira uma quantidade válida!',
            'number.positive': 'Quantidade do produto inválida, por favor insira uma quantidade válida!',
            'number.integer': 'Quantidade do produto inválida, por favor insira uma quantidade válida!'
        })
    }).messages({
        'any.required': 'O campo pedido_produtos é obrigatório!'
    })
})

module.exports = schemaPedido